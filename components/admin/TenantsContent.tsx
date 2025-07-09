import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Eye, Edit, Trash2, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { initialRooms } from "@/lib/demo-data";

interface TenantsContentProps {
  tenants: any[];
  setTenants: React.Dispatch<React.SetStateAction<any[]>>;
}

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
  { label: "Partial", value: "partial" },
];

const TenantsContent: React.FC<TenantsContentProps> = ({ tenants, setTenants }) => {
  const [editingTenant, setEditingTenant] = useState<any | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewingTenant, setViewingTenant] = useState<any | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleAddTenant = (newTenant: any) => {
    const tenant = {
      ...newTenant,
      id: Math.max(...tenants.map((t: any) => t.id)) + 1,
      status: "pending",
      avatar: "/profile-demo.jpg",
    };
    setTenants([...tenants, tenant]);
    setIsAddDialogOpen(false);
  };

  const handleEditTenant = (updatedTenant: any) => {
    setTenants(tenants.map((t: any) => (t.id === updatedTenant.id ? updatedTenant : t)));
    setEditingTenant(null);
  };

  const handleDeleteTenant = (tenantId: number) => {
    setTenants(tenants.filter((t: any) => t.id !== tenantId));
  };

  // Filtering logic
  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(search.toLowerCase()) ||
      tenant.room.toLowerCase().includes(search.toLowerCase()) ||
      tenant.phone.toLowerCase().includes(search.toLowerCase()) ||
      tenant.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || tenant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
            <TenantForm onSubmit={handleAddTenant} />
          </DialogContent>
        </Dialog>
      </div>
      {/* Search and Filter Row */}
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
        <div className="flex items-center gap-2">
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              variant={statusFilter === option.value ? "default" : "outline"}
              className={`rounded-full px-4 py-1 text-sm ${statusFilter === option.value ? "gradient-green text-white" : ""}`}
              onClick={() => setStatusFilter(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        {filteredTenants.map((tenant) => (
          <Dialog key={tenant.id} open={viewingTenant?.id === tenant.id} onOpenChange={(open) => { if (!open) setViewingTenant(null); }}>
            <Card
              className="shadow-card hover:shadow-lg transition-shadow relative cursor-pointer"
              onClick={() => setViewingTenant(tenant)}
            >
              <CardContent className="p-6">
                {/* Edit and Remove icons in top right, with status badge below in a grid */}
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
                        {editingTenant && <TenantForm tenant={editingTenant} onSubmit={handleEditTenant} />}
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
                  {/* Status badge below icons, full width */}
                  <div className="w-full flex justify-center mt-2">
                    <Badge
                      variant={
                        tenant.status === "paid"
                          ? "default"
                          : tenant.status === "pending"
                          ? "destructive"
                          : "secondary"
                      }
                      className="rounded-[10px] shadow-sm px-3 py-1 w-full text-center justify-center"
                    >
                      {tenant.status}
                    </Badge>
                  </div>
                </div>
                {/* Main card content */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16 border-3 border-white shadow-lg rounded-[16px]">
                      <AvatarImage src={tenant.avatar || "/placeholder.svg"} className="object-cover rounded-[16px]" />
                      <AvatarFallback className="bg-lime-100 text-lime-700 text-lg rounded-[16px]">
                        {tenant.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-playfair font-semibold text-lg">{tenant.name}</h3>
                      <p className="text-gray-500 text-sm">Room: {tenant.room}</p>
                      <p className="text-gray-500 text-sm">Last Payment: {tenant.lastPaymentDate || 'N/A'}</p>
                    </div>
                  </div>
                  {/* Removed badge from here */}
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

function TenantForm({ tenant, onSubmit }: { tenant?: any; onSubmit: any }) {
  const [formData, setFormData] = useState({
    name: tenant?.name || "",
    room: tenant?.room || "",
    phone: tenant?.phone || "",
    email: tenant?.email || "",
    checkIn: tenant?.checkIn || "",
    emergencyContact: tenant?.emergencyContact || "",
  });
  const [rooms] = useState(initialRooms);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(tenant ? { ...tenant, ...formData } : formData);
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
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            className="w-full p-2 border rounded-xl bg-white focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all text-sm font-medium"
            required
          >
            <option value="">Select Room</option>
            {rooms.map((room: any) => (
              <option key={room.number} value={room.number}>
                {room.number}
              </option>
            ))}
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
      <div className="grid grid-cols-2 gap-4">
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
        <div className="space-y-2">
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input
            id="emergencyContact"
            value={formData.emergencyContact}
            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
            required
          />
        </div>
      </div>
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
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20 border-3 border-lime-200">
          <AvatarImage src={tenant.avatar || "/placeholder.svg"} className="object-cover" />
          <AvatarFallback className="bg-lime-100 text-lime-700 text-xl">
            {tenant.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-playfair text-xl font-bold">{tenant.name}</h3>
          <p className="text-gray-600">Room {tenant.room}</p>
          <Badge
            variant={tenant.status === "paid" ? "default" : tenant.status === "pending" ? "destructive" : "secondary"}
          >
            {tenant.status}
          </Badge>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-500">Phone</Label>
          <p className="font-medium">{tenant.phone}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-500">Email</Label>
          <p className="font-medium">{tenant.email}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-500">Check-in</Label>
          <p className="font-medium">{tenant.checkIn}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-500">Emergency Contact</Label>
          <p className="font-medium">{tenant.emergencyContact}</p>
        </div>
      </div>
    </div>
  );
}

export default TenantsContent; 