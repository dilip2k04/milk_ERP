// src/pages/admin/MilkSessions.jsx
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
import milkService from "../../services/milkService";
import { successToast, errorToast } from "../../utils/toast";

export default function MilkSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const [search, setSearch] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    isActive: true,
  });

  const [editingSession, setEditingSession] = useState(null);

  // Load Sessions
  const loadSessions = async () => {
    try {
      setLoading(true);
      const res = await milkService.getSessions();
      const list = Array.isArray(res.data?.data) ? res.data.data : res.data;
      setSessions(Array.isArray(list) ? list : []);

    } catch (err) {
      console.error(err);
      errorToast("Failed to load sessions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const openCreate = () => {
    setForm({
      name: "",
      isActive: true,
    });
    setIsCreateOpen(true);
  };

  const openEdit = (session) => {
    setEditingSession(session);
    setForm({
      name: session.name,
      isActive: session.isActive,
    });
    setIsEditOpen(true);
  };

  // CREATE SESSION
  const handleCreate = async () => {
    try {
      await milkService.createSession(form);
      successToast("Session created");
      setIsCreateOpen(false);
      loadSessions();
    } catch (err) {
      console.error(err);
      errorToast(err?.response?.data?.message || "Failed to create session");
    }
  };

  // UPDATE SESSION
  const handleUpdate = async () => {
    try {
      await milkService.updateSession(editingSession._id, form);
      successToast("Session updated");
      setIsEditOpen(false);
      setEditingSession(null);
      loadSessions();
    } catch (err) {
      console.error(err);
      errorToast(err?.response?.data?.message || "Failed to update session");
    }
  };

  // DELETE SESSION
  const handleDelete = async (session) => {
    if (!window.confirm(`Delete session "${session.name}"?`)) return;
    try {
      await milkService.deleteSession(session._id);
      successToast("Session deleted");
      loadSessions();
    } catch (err) {
      console.error(err);
      errorToast("Failed to delete session");
    }
  };

  const toggleActiveState = async (session) => {
    try {
      setUpdatingId(session._id);
      const updatedSession = {
        name: session.name,
        isActive: !session.isActive
      };
      
      await milkService.updateSession(session._id, updatedSession);
      successToast(`Session ${!session.isActive ? "activated" : "deactivated"}`);
      loadSessions();
    } catch (err) {
      console.error(err);
      errorToast("Failed to update session status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredSessions = sessions.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageContainer title="Milk Sessions">
      {/* Search and Actions */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search sessions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-white border-gray-300"
              />
            </div>

            <Button onClick={openCreate} className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Session
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sessions Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                    </div>
                    <p className="text-gray-500 mt-2">Loading sessions...</p>
                  </TableCell>
                </TableRow>
              ) : filteredSessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">
                    <p className="text-gray-500">No sessions found</p>
                    {search ? (
                      <p className="text-sm text-gray-500 mt-1">
                        Try adjusting your search
                      </p>
                    ) : (
                      <Button onClick={openCreate} className="mt-4 bg-black hover:bg-gray-800 text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Session
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSessions.map((s) => (
                  <TableRow key={s._id} className="border-b border-gray-200">
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={s.isActive}
                          onCheckedChange={() => toggleActiveState(s)}
                          disabled={updatingId === s._id}
                          className="data-[state=checked]:bg-black"
                        />
                        <span className={`text-sm ${s.isActive ? 'text-black' : 'text-gray-500'}`}>
                          {s.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {updatingId === s._id && (
                          <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(s)}
                          className="border-gray-300 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(s)}
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
            <DialogTitle className="text-lg font-semibold">Create Session</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Session Name</Label>
              <Input
                id="name"
                placeholder="Session name (e.g. Morning)"
                value={form.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                className="bg-white border-gray-300"
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={form.isActive}
                onCheckedChange={(v) => handleFormChange("isActive", v)}
                className="data-[state=checked]:bg-black"
              />
              <Label className="text-sm">Active</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)} className="border-gray-300 text-black hover:bg-gray-100">
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!form.name} className="bg-black hover:bg-gray-800 text-white">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-white text-black border border-gray-200 sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Edit Session</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-sm font-medium">Session Name</Label>
              <Input
                id="edit-name"
                placeholder="Session name"
                value={form.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                className="bg-white border-gray-300"
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={form.isActive}
                onCheckedChange={(v) => handleFormChange("isActive", v)}
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
                setEditingSession(null);
              }}
              className="border-gray-300 text-black hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={!form.name} className="bg-black hover:bg-gray-800 text-white">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
}