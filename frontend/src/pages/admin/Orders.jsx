// src/pages/admin/Orders.jsx
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { RefreshCw, Eye, Trash2 } from "lucide-react";

import PageContainer from "../../components/common/PageContainer";
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
    const base = "px-3 py-1 rounded-full text-xs font-medium border";
    switch (status) {
      case "pending":
        return <Badge variant="outline" className={`${base} border-amber-200 text-amber-700 bg-amber-50`}>Pending</Badge>;
      case "confirmed":
        return <Badge variant="outline" className={`${base} border-blue-200 text-blue-700 bg-blue-50`}>Confirmed</Badge>;
      case "delivered":
        return <Badge variant="outline" className={`${base} border-green-200 text-green-700 bg-green-50`}>Delivered</Badge>;
      case "rejected":
        return <Badge variant="outline" className={`${base} border-red-200 text-red-700 bg-red-50`}>Rejected</Badge>;
      case "cancelled":
        return <Badge variant="outline" className={`${base} border-gray-300 text-gray-600 bg-gray-100`}>Cancelled</Badge>;
      default:
        return <Badge variant="outline" className={base}>{status}</Badge>;
    }
  };

  const openDetail = (o) => {
    setSelectedOrder(o);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setSelectedOrder(null);
    setIsDetailOpen(false);
  };

  const handleApprove = async (order) => {
    if (!window.confirm("Approve this order? Stock will be deducted.")) return;

    try {
      await orderService.adminApprove(order._id);
      successToast("Order approved");
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
      successToast("Order delivered");
      closeDetail();
      loadOrders();
    } catch (err) {
      console.error(err);
      errorToast("Failed to deliver order");
    }
  };

  const handleDelete = async (order) => {
    if (!window.confirm("Delete this order permanently?")) return;

    try {
      await orderService.adminDelete(order._id);
      successToast("Order deleted");
      closeDetail();
      loadOrders();
    } catch (err) {
      console.error(err);
      errorToast("Failed to delete order");
    }
  };

  const paymentSummary = (o) => (
    <div className="text-sm space-y-1">
      <div className="flex justify-between">
        <span className="text-gray-600">Type:</span>
        <span className="font-medium capitalize">{o.paymentType}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Method:</span>
        <span className="font-medium">{o.paymentMethodId?.name || "N/A"}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Total:</span>
        <span className="font-semibold">₹{o.totalAmount?.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Paid:</span>
        <span className="font-medium text-green-600">₹{o.amountPaid?.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Due:</span>
        <span className="font-medium text-amber-600">₹{o.amountDue?.toFixed(2)}</span>
      </div>
    </div>
  );

  return (
    <PageContainer title="Orders Management">
      {/* Filters and Actions */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Approve or reject shopkeeper orders
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40 bg-white border-gray-300">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={loadOrders}
                className="border-gray-300 hover:bg-gray-100"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Order ID</TableHead>
                <TableHead className="font-semibold">Shopkeeper</TableHead>
                <TableHead className="font-semibold">Dates</TableHead>
                <TableHead className="font-semibold">Payment</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                    </div>
                    <p className="text-gray-500 mt-2">Loading orders...</p>
                  </TableCell>
                </TableRow>
              ) : filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="text-gray-500">No orders found</div>
                    {statusFilter !== "all" && (
                      <p className="text-sm text-gray-500 mt-1">
                        No {statusFilter} orders
                      </p>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <span className="font-mono text-sm">#{order._id.slice(-6).toUpperCase()}</span>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{order.shopKeeperId?.name}</div>
                      <div className="text-sm text-gray-500">{order.shopKeeperId?.phone}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Order: {formatDate(order.orderDate)}</div>
                        <div className="text-gray-500">Delivery: {formatDate(order.deliveryDate)}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium capitalize">{order.paymentType}</div>
                        <div className="text-gray-500">{order.paymentMethodId?.name || "N/A"}</div>
                        <div className="font-semibold">₹{order.totalAmount?.toFixed(2)}</div>
                      </div>
                    </TableCell>
                    <TableCell>{statusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openDetail(order)}
                          className="border-gray-300 hover:bg-gray-100"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(order)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="bg-white text-black border border-gray-200 sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Order Details</DialogTitle>
            <DialogDescription className="text-gray-600">
              Review order items and take action
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6 py-2">
              {/* Order Information */}
              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Order Information</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Order ID:</span>
                            <span className="font-mono">#{selectedOrder._id.slice(-6).toUpperCase()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span>{statusBadge(selectedOrder.status)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Order Date:</span>
                            <span>{formatDate(selectedOrder.orderDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Delivery Date:</span>
                            <span>{formatDate(selectedOrder.deliveryDate)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-2">Shopkeeper</h3>
                        <div className="space-y-2 text-sm">
                          <div className="font-medium">{selectedOrder.shopKeeperId?.name}</div>
                          <div className="text-gray-600">{selectedOrder.shopKeeperId?.phone}</div>
                          <div className="text-gray-600">{selectedOrder.shopKeeperId?.email}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Summary */}
              <Card className="border-gray-200">
                <CardContent className="p-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-3">Payment Summary</h3>
                  {paymentSummary(selectedOrder)}
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card className="border-gray-200">
                <CardContent className="p-0">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-600">Order Items</h3>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-medium">Product</TableHead>
                        <TableHead className="font-medium text-right">Quantity</TableHead>
                        <TableHead className="font-medium text-right">Unit Price</TableHead>
                        <TableHead className="font-medium text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items?.map((item, index) => (
                        <TableRow key={index} className="border-b border-gray-200">
                          <TableCell className="font-medium">{item.productName}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">₹{item.unitPrice?.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-semibold">
                            ₹{item.totalPrice?.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-gray-50">
                        <TableCell colSpan={3} className="text-right font-semibold">
                          Grand Total:
                        </TableCell>
                        <TableCell className="text-right font-bold text-lg">
                          ₹{selectedOrder.totalAmount?.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={closeDetail}
              className="border-gray-300 text-black hover:bg-gray-100 w-full sm:w-auto"
            >
              Close
            </Button>

            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {selectedOrder?.status === "pending" && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => handleReject(selectedOrder)}
                    className="border-red-300 text-red-600 hover:bg-red-50 w-full sm:w-auto"
                  >
                    Reject Order
                  </Button>
                  <Button
                    onClick={() => handleApprove(selectedOrder)}
                    className="bg-black hover:bg-gray-800 text-white w-full sm:w-auto"
                  >
                    Approve Order
                  </Button>
                </>
              )}

              {selectedOrder?.status === "confirmed" && (
                <Button
                  onClick={() => handleDeliver(selectedOrder)}
                  className="bg-black hover:bg-gray-800 text-white w-full sm:w-auto"
                >
                  Mark as Delivered
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}