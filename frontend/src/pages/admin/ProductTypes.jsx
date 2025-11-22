// src/pages/admin/ProductTypes.jsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
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
import productTypeService from "../../services/productTypeService";
import { successToast, errorToast } from "../../utils/toast";

export default function ProductTypes() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    isActive: true,
  });

  const [editingType, setEditingType] = useState(null);

  const loadTypes = async () => {
    try {
      setLoading(true);
      const res = await productTypeService.getAll();
      setTypes(res.data.data || []);
    } catch (err) {
      console.error(err);
      errorToast("Failed to load product types");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTypes();
  }, []);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const openCreate = () => {
    setForm({ name: "", description: "", isActive: true });
    setIsCreateOpen(true);
  };

  const openEdit = (pt) => {
    setEditingType(pt);
    setForm({
      name: pt.name || "",
      description: pt.description || "",
      isActive: pt.isActive ?? true,
    });
    setIsEditOpen(true);
  };

  const handleCreate = async () => {
    try {
      await productTypeService.create(form);
      successToast("Product type created");
      setIsCreateOpen(false);
      loadTypes();
    } catch (err) {
      console.error(err);
      errorToast(err?.response?.data?.message || "Failed to create product type");
    }
  };

  const handleUpdate = async () => {
    try {
      await productTypeService.update(editingType._id, form);
      successToast("Product type updated");
      setIsEditOpen(false);
      setEditingType(null);
      loadTypes();
    } catch (err) {
      console.error(err);
      errorToast(err?.response?.data?.message || "Failed to update product type");
    }
  };

  const handleDelete = async (pt) => {
    if (!window.confirm(`Delete product type "${pt.name}"?`)) return;
    try {
      await productTypeService.remove(pt._id);
      successToast("Product type deleted");
      loadTypes();
    } catch (err) {
      console.error(err);
      errorToast(err?.response?.data?.message || "Failed to delete product type");
    }
  };

  const toggleActiveState = async (pt) => {
    try {
      setUpdatingId(pt._id);
      const updatedType = {
        name: pt.name,
        description: pt.description,
        isActive: !pt.isActive
      };
      
      await productTypeService.update(pt._id, updatedType);
      successToast(`Product type ${!pt.isActive ? "activated" : "deactivated"}`);
      loadTypes();
    } catch (err) {
      console.error(err);
      errorToast("Failed to update product type status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredTypes = types.filter((t) =>
    !search
      ? true
      : t.name?.toLowerCase().includes(search.toLowerCase()) ||
        t.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageContainer title="Product Types">
      {/* Search and Actions */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search product types..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-white border-gray-300"
              />
            </div>

            <Button onClick={openCreate} className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Type
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Product Types Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                    </div>
                    <p className="text-gray-500 mt-2">Loading product types...</p>
                  </TableCell>
                </TableRow>
              ) : filteredTypes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <p className="text-gray-500">No product types found</p>
                    {search ? (
                      <p className="text-sm text-gray-500 mt-1">
                        Try adjusting your search
                      </p>
                    ) : (
                      <Button onClick={openCreate} className="mt-4 bg-black hover:bg-gray-800 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Type
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredTypes.map((pt) => (
                  <TableRow key={pt._id} className="border-b border-gray-200">
                    <TableCell className="font-medium">{pt.name}</TableCell>
                    <TableCell>{pt.description || "-"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={pt.isActive}
                          onCheckedChange={() => toggleActiveState(pt)}
                          disabled={updatingId === pt._id}
                          className="data-[state=checked]:bg-black"
                        />
                        <span className={`text-sm ${pt.isActive ? 'text-black' : 'text-gray-500'}`}>
                          {pt.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {updatingId === pt._id && (
                          <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(pt)}
                          className="border-gray-300 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(pt)}
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

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-white text-black border border-gray-200 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Create Product Type</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Type Name</Label>
              <Input
                id="name"
                placeholder="Type name"
                value={form.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                className="bg-white border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">Description</Label>
              <Input
                id="description"
                placeholder="Description"
                value={form.description}
                onChange={(e) => handleFormChange("description", e.target.value)}
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
              disabled={!form.name}
              className="bg-black hover:bg-gray-800 text-white"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-white text-black border border-gray-200 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Edit Product Type</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-sm font-medium">Type Name</Label>
              <Input
                id="edit-name"
                placeholder="Type name"
                value={form.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                className="bg-white border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description" className="text-sm font-medium">Description</Label>
              <Input
                id="edit-description"
                placeholder="Description"
                value={form.description}
                onChange={(e) => handleFormChange("description", e.target.value)}
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
                setEditingType(null);
              }}
              className="border-gray-300 text-black hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdate}
              disabled={!form.name}
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