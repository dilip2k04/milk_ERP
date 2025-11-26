// src/pages/admin/Products.jsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

import PageContainer from "../../components/common/PageContainer";
import productService from "../../services/productService";
import productTypeService from "../../services/productTypeService";
import { successToast, errorToast } from "../../utils/toast";

const UNIT_OPTIONS = [
  { value: "packet", label: "Packet" },
  { value: "liter", label: "Liter" },
  { value: "kg", label: "Kg" },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [form, setForm] = useState({
    productTypeId: "",
    name: "",
    unit: "packet",
    size: "",
    price: "",
    currentStock: "0", // Added currentStock to initial form state
    isActive: true,
  });

  const [editingProduct, setEditingProduct] = useState(null);

  const loadProductTypes = async () => {
    try {
      const res = await productTypeService.getAll();
      setProductTypes((res.data.data || []).filter((pt) => pt.isActive));
    } catch (err) {
      console.error(err);
      errorToast("Failed to load product types");
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getAll();
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
      errorToast("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProductTypes();
    loadProducts();
  }, []);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const openCreate = () => {
    setForm({
      productTypeId: "",
      name: "",
      unit: "packet",
      size: "",
      price: "",
      currentStock: "0",
      isActive: true,
    });
    setIsCreateOpen(true);
  };

  const openEdit = (p) => {
    setEditingProduct(p);
    setForm({
      productTypeId: p.productTypeId?._id || p.productTypeId || "",
      name: p.name || "",
      unit: p.unit || "packet",
      currentStock: p.currentStock?.toString() || "0",
      size: p.size || "",
      price: p.price?.toString() || "",
      isActive: p.isActive ?? true,
    });
    setIsEditOpen(true);
  };

  const handleCreate = async () => {
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        currentStock: Number(form.currentStock) || 0,
      };
      await productService.create(payload);
      successToast("Product created");
      setIsCreateOpen(false);
      loadProducts();
    } catch (err) {
      console.error(err);
      errorToast(err?.response?.data?.message || "Failed to create product");
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        currentStock: Number(form.currentStock) || 0,
      };
      await productService.update(editingProduct._id, payload);
      successToast("Product updated");
      setIsEditOpen(false);
      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      console.error(err);
      errorToast(err?.response?.data?.message || "Failed to update product");
    }
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Delete product "${p.name}"?`)) return;
    try {
      await productService.remove(p._id);
      successToast("Product deleted");
      loadProducts();
    } catch (err) {
      console.error(err);
      errorToast("Failed to delete product");
    }
  };

  const toggleActiveState = async (p) => {
    try {
      setUpdatingId(p._id);
      const updatedProduct = {
        productTypeId: p.productTypeId?._id || p.productTypeId,
        name: p.name,
        unit: p.unit,
        currentStock: p.currentStock,   
        size: p.size,
        price: p.price,
        isActive: !p.isActive
      };
      
      await productService.update(p._id, updatedProduct);
      successToast(`Product ${!p.isActive ? "activated" : "deactivated"}`);
      loadProducts();
    } catch (err) {
      console.error(err);
      errorToast("Failed to update product status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredProducts = products.filter((p) => {
    const typeId = p.productTypeId?._id || p.productTypeId;
    const typeName = p.productTypeId?.name || "";

    const matchesSearch =
      !search ||
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      typeName.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === "all" || typeId === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <PageContainer title="Products">
      {/* Search and Actions */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-white border-gray-300"
                />
              </div>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-40 bg-white border-gray-300">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  <SelectItem value="all">All Types</SelectItem>
                  {productTypes.map((pt) => (
                    <SelectItem key={pt._id} value={pt._id}>
                      {pt.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={openCreate} className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Unit</TableHead>
                <TableHead className="font-semibold">Size</TableHead>
                <TableHead className="font-semibold">Current Stock</TableHead>
                <TableHead className="font-semibold">Price</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                    </div>
                    <p className="text-gray-500 mt-2">Loading products...</p>
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    <p className="text-gray-500">No products found</p>
                    {search || typeFilter !== "all" ? (
                      <p className="text-sm text-gray-500 mt-1">
                        Try adjusting your search
                      </p>
                    ) : (
                      <Button onClick={openCreate} className="mt-4 bg-black hover:bg-gray-800 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((p) => (
                  <TableRow key={p._id} className="border-b border-gray-200">
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>{p.productTypeId?.name || "-"}</TableCell>
                    <TableCell className="capitalize">{p.unit}</TableCell>
                    <TableCell>{p.size}</TableCell>
                    <TableCell>{p.currentStock}</TableCell>
                    <TableCell>₹{p.price}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={p.isActive}
                          onCheckedChange={() => toggleActiveState(p)}
                          disabled={updatingId === p._id}
                          className="data-[state=checked]:bg-black"
                        />
                        <span className={`text-sm ${p.isActive ? 'text-black' : 'text-gray-500'}`}>
                          {p.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {updatingId === p._id && (
                          <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(p)}
                          className="border-gray-300 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(p)}
                          className="border-gray-300 hover:bg-gray-100"
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

      {/* Create Product Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-white text-black border border-gray-200 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Create Product</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="productType" className="text-sm font-medium">Product Type</Label>
              <Select
                value={form.productTypeId}
                onValueChange={(val) => handleFormChange("productTypeId", val)}
              >
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  {productTypes.map((pt) => (
                    <SelectItem key={pt._id} value={pt._id}>
                      {pt.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Product Name</Label>
              <Input
                id="name"
                placeholder="Product name"
                value={form.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                className="bg-white border-gray-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="unit" className="text-sm font-medium">Unit</Label>
                <Select
                  value={form.unit}
                  onValueChange={(val) => handleFormChange("unit", val)}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    {UNIT_OPTIONS.map((u) => (
                      <SelectItem key={u.value} value={u.value}>
                        {u.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="size" className="text-sm font-medium">Size</Label>
                <Input
                  id="size"
                  placeholder="Size"
                  value={form.size}
                  onChange={(e) => handleFormChange("size", e.target.value)}
                  className="bg-white border-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">Price</Label>
              <Input
                id="price"
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(e) => handleFormChange("price", e.target.value)}
                className="bg-white border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentStock" className="text-sm font-medium">Current Stock</Label>
              <Input
                id="currentStock"
                placeholder="Current Stock"
                type="number"
                value={form.currentStock}
                onChange={(e) => handleFormChange("currentStock", e.target.value)}
                className="bg-white border-gray-300"
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={form.isActive}
                onCheckedChange={(val) => handleFormChange("isActive", val)}
                className="data-[state=checked]:bg-black"
              />
              <Label className="text-sm">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCreateOpen(false)}
              className="border-gray-300 text-black hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreate}
              disabled={!form.productTypeId || !form.name || !form.price}
              className="bg-black hover:bg-gray-800 text-white"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-white text-black border border-gray-200 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Edit Product</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-productType" className="text-sm font-medium">Product Type</Label>
              <Select
                value={form.productTypeId}
                onValueChange={(val) => handleFormChange("productTypeId", val)}
              >
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  {productTypes.map((pt) => (
                    <SelectItem key={pt._id} value={pt._id}>
                      {pt.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-sm font-medium">Product Name</Label>
              <Input
                id="edit-name"
                placeholder="Product name"
                value={form.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                className="bg-white border-gray-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="edit-unit" className="text-sm font-medium">Unit</Label>
                <Select
                  value={form.unit}
                  onValueChange={(val) => handleFormChange("unit", val)}
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="Unit" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-300">
                    {UNIT_OPTIONS.map((u) => (
                      <SelectItem key={u.value} value={u.value}>
                        {u.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-size" className="text-sm font-medium">Size</Label>
                <Input
                  id="edit-size"
                  placeholder="Size"
                  value={form.size}
                  onChange={(e) => handleFormChange("size", e.target.value)}
                  className="bg-white border-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-price" className="text-sm font-medium">Price</Label>
              <Input
                id="edit-price"
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(e) => handleFormChange("price", e.target.value)}
                className="bg-white border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-currentStock" className="text-sm font-medium">Current Stock</Label>
              <Input
                id="edit-currentStock"
                placeholder="Current Stock"
                type="number"
                value={form.currentStock}
                onChange={(e) => handleFormChange("currentStock", e.target.value)}
                className="bg-white border-gray-300"
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={form.isActive}
                onCheckedChange={(val) => handleFormChange("isActive", val)}
                className="data-[state=checked]:bg-black"
              />
              <Label className="text-sm">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditOpen(false);
                setEditingProduct(null);
              }}
              className="border-gray-300 text-black hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdate}
              disabled={!form.productTypeId || !form.name || !form.price}
              className="bg-black hover:bg-gray-800 text-white"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}