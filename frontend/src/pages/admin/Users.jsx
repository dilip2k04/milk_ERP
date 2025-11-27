// src/pages/admin/Users.jsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, MoreVertical, Edit, Trash2 } from "lucide-react";

import PageContainer from "../../components/common/PageContainer";
import userService from "../../services/userService";
import { successToast, errorToast } from "../../utils/toast";

// ROLE OPTIONS
const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "company", label: "Company" },
  { value: "shop_keeper", label: "Shop Keeper" },
  { value: "farmer", label: "Farmer" },
];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "shop_keeper",
    isActive: true,
  });

  const [editingUser, setEditingUser] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await userService.getAll();
      setUsers(res.data.data || []);
    } catch (err) {
      errorToast("Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openCreate = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      role: "shop_keeper",
      isActive: true,
    });
    setIsCreateOpen(true);
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreate = async () => {
    try {
      setActionLoading(true);
      await userService.create(form);
      successToast("User created successfully");
      setIsCreateOpen(false);
      loadUsers();
    } catch (err) {
      errorToast(err?.response?.data?.message || "Failed to create user");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const openEdit = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
    });
    setIsEditOpen(true);
  };

  const handleUpdate = async () => {
    try {
      setActionLoading(true);
      await userService.update(editingUser._id, form);
      successToast("User updated successfully");
      setIsEditOpen(false);
      setEditingUser(null);
      loadUsers();
    } catch (err) {
      errorToast("Failed to update user");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete user ${user.name}?`)) return;

    try {
      setActionLoading(true);
      await userService.remove(user._id);
      successToast("User deleted successfully");
      loadUsers();
    } catch (err) {
      errorToast("Failed to delete user");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const toggleActiveState = async (user) => {
    try {
      setActionLoading(true);
      await userService.update(user._id, {
        isActive: !user.isActive,
        name: user.name,
        phone: user.phone,
        role: user.role,
      });

      successToast(`User ${!user.isActive ? "activated" : "deactivated"}`);
      loadUsers();
    } catch (err) {
      errorToast("Failed to update user status");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      !search ||
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.phone?.includes(search);

    const matchesRole = roleFilter === "all" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <PageContainer title="Users">
      {/* Search + Actions */}
      <Card className="mb-6">
        <CardContent className="p-4 bg-[var(--color-main)] text-[var(--color-second)]">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-[var(--color-main)] border-gray-300 text-[var(--color-second)]"
                />
              </div>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-40 bg-[var(--color-main)] border-gray-300 text-[var(--color-second)]">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--color-main)] border-gray-300 text-[var(--color-second)]">
                  <SelectItem value="all">All Roles</SelectItem>
                  {ROLE_OPTIONS.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={openCreate}
              className="w-full sm:w-auto bg-[var(--color-second)] text-[var(--color-main)] hover:bg-gray-800"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-[var(--color-main)] text-[var(--color-second)]">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 text-[var(--color-second)]">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--color-second)]"></div>
                    </div>
                    <p className="text-gray-500 mt-2">Loading users...</p>
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-gray-500">No users found</p>

                    <Button
                      onClick={openCreate}
                      className="mt-4 bg-[var(--color-second)] text-[var(--color-main)] hover:bg-gray-800"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user._id} className="border-b border-gray-200">
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || "-"}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-gray-100 text-gray-700 border-gray-300"
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={user.isActive}
                          onCheckedChange={() => toggleActiveState(user)}
                          disabled={actionLoading}
                          className="data-[state=checked]:bg-[var(--color-second)]"
                        />
                        <span
                          className={`text-sm ${
                            user.isActive ? "text-[var(--color-second)]" : "text-gray-500"
                          }`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          className="bg-[var(--color-main)] border-gray-200 text-[var(--color-second)]"
                        >
                          <DropdownMenuItem onClick={() => openEdit(user)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(user)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* CREATE + EDIT dialogs would also follow the same color mapping */}
      {/* Already updated below */}

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-[var(--color-main)] text-[var(--color-second)] border-gray-300">
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              className="bg-[var(--color-main)] text-[var(--color-second)] border-gray-300"
            />

            <Label>Email</Label>
            <Input
              value={form.email}
              onChange={(e) => handleFormChange("email", e.target.value)}
              className="bg-[var(--color-main)] text-[var(--color-second)] border-gray-300"
            />

            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => handleFormChange("phone", e.target.value)}
              className="bg-[var(--color-main)] text-[var(--color-second)] border-gray-300"
            />

            <Label>Role</Label>
            <Select
              value={form.role}
              onValueChange={(val) => handleFormChange("role", val)}
            >
              <SelectTrigger className="bg-[var(--color-main)] text-[var(--color-second)] border-gray-300">
                <SelectValue />
              </SelectTrigger>

              <SelectContent className="bg-[var(--color-main)] text-[var(--color-second)] border-gray-300">
                {ROLE_OPTIONS.map((r) => (
                  <SelectItem value={r.value}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Switch
                checked={form.isActive}
                onCheckedChange={(val) => handleFormChange("isActive", val)}
                className="data-[state=checked]:bg-[var(--color-second)]"
              />
              <Label>Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateOpen(false)}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              className="bg-[var(--color-second)] text-[var(--color-main)]"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EDIT USER */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-[var(--color-main)] text-[var(--color-second)] border-gray-300">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <Label>Name</Label>
            <Input
              value={form.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              className="bg-[var(--color-main)] text-[var(--color-second)] border-gray-300"
            />

            <Label>Email</Label>
            <Input
              disabled
              value={form.email}
              className="bg-gray-100 border-gray-300 text-gray-600"
            />

            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => handleFormChange("phone", e.target.value)}
              className="bg-[var(--color-main)] text-[var(--color-second)] border-gray-300"
            />

            <Label>Role</Label>
            <Select
              value={form.role}
              onValueChange={(val) => handleFormChange("role", val)}
            >
              <SelectTrigger className="bg-[var(--color-main)] text-[var(--color-second)] border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[var(--color-main)] text-[var(--color-second)] border-gray-300">
                {ROLE_OPTIONS.map((r) => (
                  <SelectItem value={r.value}>{r.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Switch
                checked={form.isActive}
                onCheckedChange={(val) => handleFormChange("isActive", val)}
                className="data-[state=checked]:bg-[var(--color-second)]"
              />
              <Label>Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditOpen(false)}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdate}
              className="bg-[var(--color-second)] text-[var(--color-main)]"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}
