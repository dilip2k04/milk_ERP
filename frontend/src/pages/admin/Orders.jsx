// src/pages/admin/Orders.jsx
import { useEffect, useMemo, useState } from "react";

import PageContainer from "../../components/common/PageContainer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import orderService from "../../services/orderService";
import { successToast, errorToast } from "../../utils/toast";

function formatDate(d) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString();
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await orderService.adminGetAll();
      const list = res.data?.data || res.data || [];
      setOrders(list);
    } catch (err) {
      console.error(err);
      errorToast("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter]);

  const statusBadge = (status) => {
    const base =
      "px-2 py-1 rounded-full text-xs font-medium inline-flex items-center";
    switch (status) {
      case "pending":
        return <span className={`${base} bg-amber-50 text-amber-700`}>Pending</span>;
      case "confirmed":
        return (
          <span className={`${base} bg-blue-50 text-blue-700`}>Confirmed</span>
        );
      case "delivered":
        return (
          <span className={`${base} bg-emerald-50 text-emerald-700`}>
            Delivered
          </span>
        );
      case "rejected":
        return (
          <span className={`${base} bg-rose-50 text-rose-700`}>Rejected</span>
        );
      case "cancelled":
        return (
          <span className={`${base} bg-slate-100 text-slate-700`}>
            Cancelled
          </span>
        );
      default:
        return <span className={base}>{status}</span>;
    }
  };

  const openDetail = (o) => {
    setSelectedOrder(o);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedOrder(null);
  };

  const handleApprove = async (order) => {
    if (
      !window.confirm(
        "Approve this order? Product stock will be deducted automatically."
      )
    )
      return;

    try {
      await orderService.adminApprove(order._id);
      successToast("Order approved & stock updated");
      closeDetail();
      loadOrders();
    } catch (err) {
      console.error(err);
      errorToast("Failed to approve order");
    }
  };

  const handleReject = async (order) => {
    if (!window.confirm("Reject this order?")) return;

    try {
      await orderService.adminReject(order._id);
      successToast("Order rejected");
      closeDetail();
      loadOrders();
    } catch (err) {
      console.error(err);
      errorToast("Failed to reject order");
    }
  };

  const handleDeliver = async (order) => {
    if (!window.confirm("Mark this order as delivered?")) return;

    try {
      await orderService.adminDeliver(order._id);
      successToast("Order marked as delivered");
      closeDetail();
      loadOrders();
    } catch (err) {
      console.error(err);
      errorToast("Failed to mark delivered");
    }
  };

  const handleDelete = async (order) => {
    if (
      !window.confirm(
        "Delete this order permanently? This is usually used only for cleanup."
      )
    )
      return;

    try {
      await orderService.adminDelete(order._id);
      successToast("Order deleted");
      if (selectedOrder && selectedOrder._id === order._id) {
        closeDetail();
      }
      loadOrders();
    } catch (err) {
      console.error(err);
      errorToast("Failed to delete order");
    }
  };

  const paymentSummary = (o) => (
    <div className="text-xs">
      <div>
        <span className="font-semibold">Type:</span> {o.paymentType}
      </div>
      <div>
        <span className="font-semibold">Method:</span>{" "}
        {o.paymentMethodId?.name || o.paymentMethodName || "N/A"}
      </div>
      <div>
        <span className="font-semibold">Total:</span> ₹
        {o.totalAmount?.toFixed(2) ?? "0.00"}
      </div>
      <div>
        <span className="font-semibold">Paid:</span> ₹
        {o.amountPaid?.toFixed(2) ?? "0.00"}
      </div>
      <div>
        <span className="font-semibold">Due:</span> ₹
        {o.amountDue?.toFixed(2) ?? "0.00"}
      </div>
    </div>
  );

  return (
    <PageContainer title="Orders Management">
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Review, approve or reject orders placed by shopkeepers. Stock is
            deducted only on approval.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={loadOrders}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-2 text-left">Order #</th>
              <th className="p-2 text-left">Shopkeeper</th>
              <th className="p-2 text-left">Order Date</th>
              <th className="p-2 text-left">Delivery</th>
              <th className="p-2 text-left">Payment</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && filteredOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center">
                  No orders found.
                </td>
              </tr>
            )}

            {!loading &&
              filteredOrders.map((o) => (
                <tr key={o._id} className="border-t">
                  <td className="p-2 font-mono text-xs">
                    {o._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="p-2 text-xs">
                    <div className="font-medium">
                      {o.shopKeeperId?.name || "Unknown"}
                    </div>
                    <div className="text-muted-foreground">
                      {o.shopKeeperId?.phone}
                    </div>
                  </td>
                  <td className="p-2">{formatDate(o.orderDate)}</td>
                  <td className="p-2">{formatDate(o.deliveryDate)}</td>
                  <td className="p-2">{paymentSummary(o)}</td>
                  <td className="p-2">{statusBadge(o.status)}</td>
                  <td className="p-2 text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openDetail(o)}
                    >
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(o)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Review line items and payment details, then approve or reject.
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div className="font-medium">Order Info</div>
                  <div>
                    <span className="font-semibold">Order #:</span>{" "}
                    <span className="font-mono">
                      {selectedOrder._id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    {statusBadge(selectedOrder.status)}
                  </div>
                  <div>
                    <span className="font-semibold">Order Date:</span>{" "}
                    {formatDate(selectedOrder.orderDate)}
                  </div>
                  <div>
                    <span className="font-semibold">Delivery:</span>{" "}
                    {formatDate(selectedOrder.deliveryDate)}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-medium">Shopkeeper</div>
                  <div>
                    {selectedOrder.shopKeeperId?.name || "Unknown"} (
                    {selectedOrder.shopKeeperId?.phone})
                  </div>
                  <div>{selectedOrder.shopKeeperId?.email}</div>
                  <div className="mt-2">{paymentSummary(selectedOrder)}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Items</h3>
                </div>

                <div className="border rounded-md overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-1 text-left">Product</th>
                        <th className="p-1 text-right">Qty</th>
                        <th className="p-1 text-right">Unit Price</th>
                        <th className="p-1 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items?.map((it, idx) => (
                        <tr key={idx} className="border-t">
                          <td className="p-1">
                            {it.productName}
                            <div className="text-[10px] text-muted-foreground">
                              ID: {it.productId}
                            </div>
                          </td>
                          <td className="p-1 text-right">{it.quantity}</td>
                          <td className="p-1 text-right">
                            ₹{it.unitPrice?.toFixed(2) ?? "0.00"}
                          </td>
                          <td className="p-1 text-right">
                            ₹{it.totalPrice?.toFixed(2) ?? "0.00"}
                          </td>
                        </tr>
                      ))}

                      {(!selectedOrder.items ||
                        selectedOrder.items.length === 0) && (
                        <tr>
                          <td
                            colSpan={4}
                            className="p-2 text-center text-muted-foreground"
                          >
                            No items
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDetailOpen(false);
                setSelectedOrder(null);
              }}
            >
              Close
            </Button>

            {selectedOrder && selectedOrder.status === "pending" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleReject(selectedOrder)}
                >
                  Reject
                </Button>
                <Button onClick={() => handleApprove(selectedOrder)}>
                  Approve
                </Button>
              </>
            )}

            {selectedOrder && selectedOrder.status === "confirmed" && (
              <Button onClick={() => handleDeliver(selectedOrder)}>
                Mark Delivered
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
