// src/pages/shopkeeper/Orders.jsx
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Search, Plus, X, Calendar, CreditCard, Edit, Trash2 } from "lucide-react";

import PageContainer from "../../components/common/PageContainer";
import orderService from "../../services/orderService";
import productService from "../../services/productService";
import paymentMethodService from "../../services/paymentMethodService";
import { successToast, errorToast } from "../../utils/toast";

function formatDateInput(date) {
  return date.toISOString().slice(0, 10);
}

const emptyItem = { productId: "", quantity: 1 };

export default function ShopkeeperOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const today = useMemo(() => new Date(), []);
  const tomorrow = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d;
  }, []);

  const [form, setForm] = useState({
    orderDate: formatDateInput(today),
    deliveryDate: formatDateInput(tomorrow),
    paymentType: "full",
    paymentMethodId: "",
    amountPaid: 0,
    items: [emptyItem],
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersRes, productsRes, pmRes] = await Promise.all([
        orderService.getMy(),
        productService.getAll(),
        paymentMethodService.getAll(),
      ]);

      const ordersList = ordersRes.data?.data || ordersRes.data || [];
      const productList = productsRes.data?.data || productsRes.data || [];
      const methodsList = pmRes.data?.data || pmRes.data || [];

      setOrders(ordersList);
      setProducts(productList);
      setPaymentMethods(methodsList.filter((m) => m.isActive));
    } catch (err) {
      console.error("❌ loadData error:", err);
      errorToast("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getProduct = (id) => products.find((p) => p._id === id);

  const itemsWithComputed = form.items.map((item) => {
    const product = getProduct(item.productId);
    const unitPrice = product?.price || 0;
    const currentStock = typeof product?.currentStock === "number" ? product.currentStock : null;
    const quantity = Number(item.quantity) || 0;
    const totalPrice = unitPrice * quantity;

    return {
      ...item,
      unitPrice,
      totalPrice,
      currentStock,
      productName: product?.name,
    };
  });

  const totalAmount = itemsWithComputed.reduce((sum, it) => sum + it.totalPrice, 0);
  const effectiveAmountPaid = form.paymentType === "full" ? totalAmount : Math.min(totalAmount, Number(form.amountPaid || 0));
  const amountDue = Math.max(0, totalAmount - effectiveAmountPaid);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const items = [...prev.items];
      let v = value;

      if (field === "quantity") {
        let qty = Number(value) || 0;
        const product = getProduct(items[index].productId);
        const stock = typeof product?.currentStock === "number" ? product.currentStock : null;

        if (stock != null) {
          qty = Math.max(1, Math.min(qty, stock));
        } else {
          qty = Math.max(1, qty);
        }
        v = qty;
      }

      items[index] = { ...items[index], [field]: v };
      return { ...prev, items };
    });
  };

  const addItemRow = () => {
    setForm((prev) => ({ ...prev, items: [...prev.items, emptyItem] }));
  };

  const removeItemRow = (index) => {
    setForm((prev) => {
      const items = [...prev.items];
      if (items.length === 1) return prev;
      items.splice(index, 1);
      return { ...prev, items };
    });
  };

  const resetForm = () => {
    setForm({
      orderDate: formatDateInput(today),
      deliveryDate: formatDateInput(tomorrow),
      paymentType: "full",
      paymentMethodId: "",
      amountPaid: 0,
      items: [emptyItem],
    });
  };

  const validateOrder = () => {
    if (!form.orderDate) {
      errorToast("Order date is required");
      return false;
    }
    if (!form.deliveryDate) {
      errorToast("Delivery date is required");
      return false;
    }

    const validItems = itemsWithComputed.filter((it) => it.productId && it.quantity > 0);
    if (validItems.length === 0) {
      errorToast("Add at least one product");
      return false;
    }

    for (const it of validItems) {
      if (typeof it.currentStock === "number" && it.currentStock >= 0 && it.quantity > it.currentStock) {
        errorToast(`"${it.productName}" quantity exceeds available stock`);
        return false;
      }
    }

    if (!form.paymentMethodId) {
      errorToast("Select payment method");
      return false;
    }

    if (form.paymentType === "partial" && effectiveAmountPaid <= 0) {
      errorToast("Amount paid must be greater than 0");
      return false;
    }

    return true;
  };

  const handleCreateOrder = async () => {
    if (!validateOrder()) return;

    try {
      setSubmitting(true);
      const payload = {
        items: itemsWithComputed.map((it) => ({
          productId: it.productId,
          productName: it.productName,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          totalPrice: it.totalPrice,
        })),
        paymentType: form.paymentType,
        paymentMethodId: form.paymentMethodId,
        amountPaid: effectiveAmountPaid,
        orderDate: form.orderDate,
        deliveryDate: form.deliveryDate,
      };

      await orderService.create(payload);
      successToast("Order placed successfully");
      setIsCreateOpen(false);
      resetForm();
      loadData();
    } catch (err) {
      console.error("❌ handleCreateOrder error:", err);
      errorToast(err?.response?.data?.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelOrder = async (order) => {
    if (!window.confirm("Cancel this order? It will remain in history.")) return;

    try {
      await orderService.cancelMy(order._id);
      successToast("Order cancelled");
      loadData();
    } catch (err) {
      console.error(err);
      errorToast("Failed to cancel order");
    }
  };

  const handleDeleteOrder = async (order) => {
    if (!window.confirm("Delete this order permanently?")) return;

    try {
      await orderService.deleteMy(order._id);
      successToast("Order deleted");
      loadData();
    } catch (err) {
      console.error(err);
      errorToast("Failed to delete order");
    }
  };

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

  const filteredOrders = orders.filter(
    (order) =>
      order._id.toLowerCase().includes(search.toLowerCase()) ||
      order.paymentMethodId?.name?.toLowerCase().includes(search.toLowerCase()) ||
      order.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageContainer title="My Orders">
      {/* Search and Actions */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-white border-gray-300"
              />
            </div>

            <Button
              onClick={() => {
                resetForm();
                setIsCreateOpen(true);
              }}
              className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Order
            </Button>
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
                <TableHead className="font-semibold">Order Date</TableHead>
                <TableHead className="font-semibold">Delivery Date</TableHead>
                <TableHead className="font-semibold">Payment</TableHead>
                <TableHead className="font-semibold text-right">Amount</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                    </div>
                    <p className="text-gray-500 mt-2">Loading orders...</p>
                  </TableCell>
                </TableRow>
              ) : filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No orders found</p>
                    {search ? (
                      <p className="text-sm text-gray-500 mt-1">
                        Try adjusting your search
                      </p>
                    ) : (
                      <Button
                        onClick={() => {
                          resetForm();
                          setIsCreateOpen(true);
                        }}
                        className="mt-4 bg-black hover:bg-gray-800 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Order
                      </Button>
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
                      {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "-"}
                    </TableCell>
                    <TableCell>
                      {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="capitalize">{order.paymentType}</span>
                        <div className="text-xs text-gray-500">
                          {order.paymentMethodId?.name || "N/A"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-semibold">₹{order.totalAmount?.toFixed(2) || "0.00"}</div>
                      <div className="text-xs text-gray-500">
                        Paid: ₹{order.amountPaid?.toFixed(2) || "0.00"}
                      </div>
                    </TableCell>
                    <TableCell>{statusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {order.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCancelOrder(order)}
                              className="border-gray-300 hover:bg-gray-100"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteOrder(order)}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Order Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-white text-black border border-gray-200 sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Create New Order</DialogTitle>
            <DialogDescription className="text-gray-600">
              Select products, quantities and payment details. Stock will be adjusted after admin approval.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-2">
            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="order-date" className="text-sm font-medium">Order Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="order-date"
                    type="date"
                    value={form.orderDate}
                    onChange={(e) => handleFormChange("orderDate", e.target.value)}
                    className="pl-10 bg-white border-gray-300"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery-date" className="text-sm font-medium">Delivery Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="delivery-date"
                    type="date"
                    value={form.deliveryDate}
                    onChange={(e) => handleFormChange("deliveryDate", e.target.value)}
                    className="pl-10 bg-white border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Products</Label>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={addItemRow}
                  className="border-gray-300"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-3">
                {itemsWithComputed.map((item, index) => (
                  <Card key={index} className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        {/* Product Selection */}
                        <div className="md:col-span-5 space-y-2">
                          <Label className="text-xs font-medium">Product</Label>
                          <Select
                            value={item.productId}
                            onValueChange={(val) => handleItemChange(index, "productId", val)}
                          >
                            <SelectTrigger className="bg-white border-gray-300">
                              <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent>
                              {products
                                .filter((p) => p.isActive !== false)
                                .map((product) => (
                                  <SelectItem key={product._id} value={product._id}>
                                    {product.name} {product.size ? `(${product.size} ${product.unit})` : `(${product.unit})`}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Quantity */}
                        <div className="md:col-span-3 space-y-2">
                          <Label className="text-xs font-medium">Quantity</Label>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                            className="bg-white border-gray-300"
                          />
                          <p className="text-xs text-gray-500">
                            Stock: {item.currentStock != null ? item.currentStock : "N/A"}
                          </p>
                        </div>

                        {/* Price & Total */}
                        <div className="md:col-span-2 space-y-2">
                          <Label className="text-xs font-medium">Unit Price</Label>
                          <div className="p-2 text-sm bg-gray-50 rounded border border-gray-200">
                            ₹{item.unitPrice.toFixed(2)}
                          </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          <Label className="text-xs font-medium">Total</Label>
                          <div className="p-2 text-sm font-semibold bg-gray-50 rounded border border-gray-200">
                            ₹{item.totalPrice.toFixed(2)}
                          </div>
                        </div>

                        {/* Remove Button */}
                        {form.items.length > 1 && (
                          <div className="md:col-span-12 flex justify-end pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeItemRow(index)}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Remove Item
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Payment Section */}
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-4">Payment Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Payment Type</Label>
                    <Select
                      value={form.paymentType}
                      onValueChange={(val) => handleFormChange("paymentType", val)}
                    >
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full Payment</SelectItem>
                        <SelectItem value="partial">Partial Payment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Payment Method</Label>
                    <Select
                      value={form.paymentMethodId}
                      onValueChange={(val) => handleFormChange("paymentMethodId", val)}
                    >
                      <SelectTrigger className="bg-white border-gray-300">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method._id} value={method._id}>
                            {method.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {form.paymentType === "partial" && (
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">Amount Paid (₹)</Label>
                      <Input
                        type="number"
                        min="0"
                        value={form.amountPaid}
                        onChange={(e) => handleFormChange("amountPaid", e.target.value)}
                        className="bg-white border-gray-300"
                      />
                    </div>
                  )}
                </div>

                {/* Amount Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">₹{totalAmount.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Total Amount</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black-600">₹{effectiveAmountPaid.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Amount Paid</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black-600">₹{amountDue.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">Amount Due</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateOpen(false)}
              className="border-gray-300 text-black hover:bg-gray-100"
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateOrder}
              disabled={submitting}
              className="bg-black hover:bg-gray-800 text-white"
            >
              {submitting ? "Placing Order..." : "Place Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}