import React, { useContext, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Eye, Edit, Trash2, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createTenant, updateTenant, deleteTenant } from "@/lib/tenantsApi";
import { HostelContext } from "@/app/admin/layout";

interface TenantsContentProps {
  tenants: any[];
  setTenants: React.Dispatch<React.SetStateAction<any[]>>;
  rooms: any[];
  roomFilter?: string | null;
}

const TenantsContent: React.FC<TenantsContentProps> = ({ tenants, setTenants, rooms, roomFilter }) => {
  const [editingTenant, setEditingTenant] = useState<any | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewingTenant, setViewingTenant] = useState<any | null>(null);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const { selectedHostel } = useContext(HostelContext);

  const roomsForSelectedHostel = useMemo(() => {
    if (!selectedHostel) return rooms;
    return rooms.filter((room) => String(room.hostel_id) === String(selectedHostel.id));
  }, [rooms, selectedHostel]);

  const getRoomsForTenant = (tenantItem: any) => {
    if (!tenantItem?.hostel_id) return roomsForSelectedHostel;
    const filtered = rooms.filter((room) => String(room.hostel_id) === String(tenantItem.hostel_id));
    return filtered.length > 0 ? filtered : roomsForSelectedHostel;
  };

  const getRoomLabel = (tenantItem: any) => {
    if (tenantItem?.room) return tenantItem.room;
    if (tenantItem?.room_id) {
      const roomMatch = rooms.find((room) => String(room.id) === String(tenantItem.room_id));
      if (roomMatch?.number) {
        return roomMatch.number;
      }
    }
    return "";
  };

  const getTenantHostelIdOrName = (tenantItem: any) => {
    if (!tenantItem) return { id: null as string | null, name: null as string | null };

    const directIdMatches = [
      tenantItem.hostel_id,
      tenantItem.hostelId,
      tenantItem.hostel?.id,
      tenantItem.hostel?.hostel_id,
    ].filter(Boolean);

    const nameMatches = [
      tenantItem.hostel_name,
      tenantItem.hostelName,
      tenantItem.hostel?.name,
    ].filter(Boolean);

    if (tenantItem.room_id || tenantItem.room) {
      const roomMatch = rooms.find((room) => {
        const sameId = tenantItem.room_id && String(room.id) === String(tenantItem.room_id);
        const sameNumber = tenantItem.room && room.number && String(room.number).toLowerCase() === String(tenantItem.room).toLowerCase();
        return sameId || sameNumber;
      });
      if (roomMatch?.hostel_id) {
        directIdMatches.unshift(roomMatch.hostel_id);
      }
      if (roomMatch?.hostel?.name) {
        nameMatches.unshift(roomMatch.hostel.name);
      }
    }

    return {
      id: directIdMatches.length > 0 ? String(directIdMatches[0]) : null,
      name: nameMatches.length > 0 ? String(nameMatches[0]) : null,
    };
  };

  const handleAddTenant = async (newTenant: any) => {
    setActionLoading(true);
    try {
      if (!selectedHostel) {
        alert("Please select a hostel before adding a tenant.");
        return;
      }
      if (!newTenant.room) {
        alert("Please select a room for the tenant.");
        return;
      }

      const payload = {
        ...newTenant,
        hostel_id: selectedHostel.id,
      };

      const created = await createTenant(payload);
      const normalized = {
        ...created,
        room: created.room ?? newTenant.room,
        room_id: created.room_id ?? newTenant.roomId,
        hostel_id: created.hostel_id ?? selectedHostel.id,
        checkIn: created.checkIn ?? created.check_in_date ?? newTenant.checkIn,
      };
      setTenants([...tenants, normalized]);
      setIsAddDialogOpen(false);
    } catch (err) {
      // Optionally show error
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditTenant = async (updatedTenant: any) => {
    setActionLoading(true);
    try {
      const payload = {
        ...updatedTenant,
        room: updatedTenant.room,
        room_id: updatedTenant.roomId ?? updatedTenant.room_id,
        checkIn: undefined,
      };
      const updated = await updateTenant(updatedTenant.id, payload);
      setTenants(tenants.map((t: any) => (t.id === updatedTenant.id ? updated : t)));
      setEditingTenant(null);
    } catch (err) {
      // Optionally show error
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTenant = async (tenantId: string) => {
    setActionLoading(true);
    try {
      await deleteTenant(tenantId);
      setTenants(tenants.filter((t: any) => t.id !== tenantId));
    } catch (err) {
      // Optionally show error
    } finally {
      setActionLoading(false);
    }
  };

  // Filtering logic (search only)
  const filteredTenants = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    const normalizedRoomFilter = roomFilter ? roomFilter.toString().toLowerCase() : null;

    return tenants.filter((tenant) => {
      const { id: tenantHostelId, name: tenantHostelName } = getTenantHostelIdOrName(tenant);

      if (selectedHostel) {
        const matchesHostel =
          (tenantHostelId && String(tenantHostelId) === String(selectedHostel.id)) ||
          (tenantHostelName && tenantHostelName.toLowerCase() === selectedHostel.name.toLowerCase());

        const matchesViaRoom = rooms.some((room) => {
          const sameId = tenant.room_id && String(room.id) === String(tenant.room_id);
          const sameNumber =
            tenant.room &&
            room.number &&
            String(room.number).toLowerCase() === String(tenant.room).toLowerCase();
          const roomHostelMatch =
            String(room.hostel_id) === String(selectedHostel.id) ||
            (room.hostel?.name && room.hostel.name.toLowerCase() === selectedHostel.name.toLowerCase());
          return roomHostelMatch && (sameId || sameNumber);
        });

        if (!matchesHostel && !matchesViaRoom) {
          return false;
        }
      }

      if (normalizedRoomFilter) {
        const roomLabel = getRoomLabel(tenant).toLowerCase();
        const matchesRoomNumber = roomLabel === normalizedRoomFilter;
        const matchesRoomId = tenant.room_id && String(tenant.room_id).toLowerCase() === normalizedRoomFilter;
        if (!matchesRoomNumber && !matchesRoomId) {
          return false;
        }
      }

      if (!searchValue) return true;

      const roomLabel = getRoomLabel(tenant);
      const phone = tenant.phone ?? "";
      const email = tenant.email ?? "";

      return (
        tenant.name?.toLowerCase().includes(searchValue) ||
        roomLabel.toLowerCase().includes(searchValue) ||
        phone.toLowerCase().includes(searchValue) ||
        email.toLowerCase().includes(searchValue)
      );
    });
  }, [tenants, selectedHostel, roomFilter, search, rooms]);

  useEffect(() => {
    console.log("[TenantsContent] state", {
      selectedHostel,
      totalTenants: tenants.length,
      filteredTenants: filteredTenants.length,
      sampleTenant: tenants[0],
      roomFilter,
      rooms,
    });
  }, [tenants, filteredTenants, selectedHostel, roomFilter, rooms]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="font-playfair text-2xl font-bold">Tenant Management</h2>
          <p className="text-gray-600 text-sm">Manage all tenant information and status</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-green text-white rounded-2xl px-6 shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Add New Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-playfair">Add New Tenant</DialogTitle>
              <div>Enter the details for the new tenant.</div>
            </DialogHeader>
            <TenantForm onSubmit={handleAddTenant} rooms={roomsForSelectedHostel} />
          </DialogContent>
        </Dialog>
      </div>
      {/* Search Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-1/2">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search by name, room, phone, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        {filteredTenants.length === 0 && (
          <Card className="p-6 text-center text-gray-500 border-dashed border-2">
            <CardContent>
              <p>No tenants found for the current filters.</p>
              <p className="text-sm mt-1">Try selecting "All Hostels" or adding a new tenant.</p>
            </CardContent>
          </Card>
        )}
        {filteredTenants.map((tenant) => (
          <Dialog key={tenant.id} open={viewingTenant?.id === tenant.id} onOpenChange={(open) => { if (!open) setViewingTenant(null); }}>
            <Card
              className="shadow-card hover:shadow-lg transition-shadow relative cursor-pointer"
              onClick={() => setViewingTenant(tenant)}
            >
              <CardContent className="p-6">
                {/* Edit and Remove icons in top right */}
                <div className="absolute top-4 right-4 flex flex-col items-center z-10 w-24">
                  <div className="grid grid-cols-2 gap-2 w-full">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-white shadow-sm rounded-[11px] p-2 hover:bg-lime-50 transition-colors"
                          onClick={e => { e.stopPropagation(); setEditingTenant(tenant); }}
                          aria-label="Edit Tenant"
                        >
                          <Edit className="h-5 w-5 text-gray-500 hover:text-lime-600" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="font-playfair">Edit Tenant</DialogTitle>
                        </DialogHeader>
                        {editingTenant && (
                          <TenantForm
                            tenant={editingTenant}
                            onSubmit={handleEditTenant}
                            rooms={getRoomsForTenant(editingTenant)}
                          />
                        )}
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-white shadow-sm rounded-[11px] p-2 hover:bg-red-50 transition-colors"
                          onClick={e => e.stopPropagation()}
                          aria-label="Remove Tenant"
                        >
                          <Trash2 className="h-5 w-5 text-red-500 hover:text-red-700" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the tenant record.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteTenant(tenant.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-playfair font-semibold text-lg">{tenant.name}</h3>
                    <p className="text-gray-500 text-sm">Room: {getRoomLabel(tenant) || "Not assigned"}</p>
                    <p className="text-gray-500 text-sm">Phone: {tenant.phone || "N/A"}</p>
                    <p className="text-gray-500 text-sm">Email: {tenant.email || "N/A"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-playfair">Tenant Details</DialogTitle>
              </DialogHeader>
              {viewingTenant && <TenantDetails tenant={viewingTenant} />}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

function TenantForm({ tenant, onSubmit, rooms }: { tenant?: any; onSubmit: any; rooms: any[] }) {
  const [formData, setFormData] = useState({
    name: tenant?.name || "",
    roomId: tenant?.room_id ? String(tenant.room_id) : "",
    room: tenant?.room || "",
    phone: tenant?.phone || "",
    email: tenant?.email || "",
    checkIn: tenant?.checkIn || tenant?.check_in_date || "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tenant) {
      const { password, ...rest } = formData;
      onSubmit({
        ...tenant,
        ...rest,
      });
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="room">Room Number</Label>
          <select
            id="room"
            value={formData.roomId || ""}
            onChange={(e) => {
              const value = e.target.value;
              const selectedRoom = rooms.find((room: any) => String(room.id) === value);
              setFormData({
                ...formData,
                roomId: value,
                room: selectedRoom?.number || "",
              });
            }}
            className="w-full p-2 border rounded-xl bg-white focus:ring-2 focus:ring-lime-500 focus-border-transparent transition-all text-sm font-medium"
            required
          >
            <option value="">Select Room</option>
            {rooms.map((room: any) => (
              <option key={room.id} value={room.id}>
                {room.number}
              </option>
            ))}
            {rooms.length === 0 && <option value="" disabled>No rooms available</option>}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="checkIn">Check-in Date</Label>
        <Input
          id="checkIn"
          type="date"
          value={formData.checkIn}
          onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
          required
        />
      </div>
      {!tenant && (
        <div className="space-y-2">
          <Label htmlFor="password">Set Password for Tenant Login</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
      )}
      <div className="flex justify-end">
        <Button type="submit" className="gradient-green text-white">
          {tenant ? "Update Tenant" : "Add Tenant"}
        </Button>
      </div>
    </form>
  );
}

function TenantDetails({ tenant }: { tenant: any }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-playfair text-xl font-bold">{tenant.name}</h3>
        <p className="text-gray-600">Room {tenant.room || "Not assigned"}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-500">Phone</Label>
          <p className="font-medium">{tenant.phone || "N/A"}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-500">Email</Label>
          <p className="font-medium">{tenant.email || "N/A"}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-500">Check-in</Label>
          <p className="font-medium">{tenant.checkIn || tenant.check_in_date || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default TenantsContent; 