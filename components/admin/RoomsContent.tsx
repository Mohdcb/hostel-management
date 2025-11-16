import React, { useState, useEffect, useContext, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Building } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { getAllHostels } from "@/lib/hostelsApi";
import { createRoom, updateRoom, deleteRoom } from "@/lib/roomsApi";
import { HostelContext } from "@/app/admin/layout";

interface RoomsContentProps {
  rooms: any[];
  setRooms: React.Dispatch<React.SetStateAction<any[]>>;
  tenants: any[];
}

const RoomsContent: React.FC<RoomsContentProps> = ({ rooms, setRooms, tenants }) => {
  const [editingRoom, setEditingRoom] = useState<any | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [hostels, setHostels] = useState<any[]>([]);
  const { selectedHostel } = useContext(HostelContext);

  useEffect(() => {
    async function fetchHostels() {
      const data = await getAllHostels();
      setHostels(data || []);
    }
    fetchHostels();
  }, []);

  const handleAddRoom = async (newRoom: any) => {
    try {
      const payload = {
        ...newRoom,
        hostel_id: newRoom.hostel_id || selectedHostel?.id || hostels[0]?.id,
      };
      const created = await createRoom(payload);
      setRooms([...rooms, created]);
      setIsAddDialogOpen(false);
    } catch (err) {
      console.error("Failed to add room:", err);
      alert("Failed to add room. Please try again.");
    }
  };

  const handleEditRoom = async (updatedRoom: any) => {
    try {
      const updated = await updateRoom(updatedRoom.id, updatedRoom);
      setRooms(rooms.map((r: any) => (r.id === updatedRoom.id ? updated : r)));
      setEditingRoom(null);
    } catch (err) {
      console.error("Failed to update room:", err);
      alert("Failed to update room. Please try again.");
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    try {
      await deleteRoom(roomId);
      setRooms(rooms.filter((r: any) => r.id !== roomId));
    } catch (err) {
      console.error("Failed to delete room:", err);
      alert("Failed to delete room. Please try again.");
    }
  };

  const roomsByHostel = useMemo(() => {
    const grouped = new Map<string, { hostel: any; rooms: any[] }>();

    rooms.forEach((room) => {
      const hostelMatch = hostels.find((h) => String(h.id) === String(room.hostel_id));
      const key = hostelMatch ? String(hostelMatch.id) : "unknown";

      if (!grouped.has(key)) {
        grouped.set(key, {
          hostel: hostelMatch || { id: "unknown", name: "Unassigned Hostel" },
          rooms: [],
        });
      }

      grouped.get(key)!.rooms.push(room);
    });

    return Array.from(grouped.values()).sort((a, b) => a.hostel.name.localeCompare(b.hostel.name));
  }, [rooms, hostels]);

  const visibleHostelGroups = useMemo(() => {
    if (selectedHostel) {
      return roomsByHostel.filter((group) => String(group.hostel.id) === String(selectedHostel.id));
    }
    return roomsByHostel;
  }, [roomsByHostel, selectedHostel]);

  const getOccupancy = (room: any) => {
    const occupancy = tenants.filter((tenant) => {
      const matchById = tenant.room_id && String(tenant.room_id) === String(room.id);
      const matchByNumber = tenant.room && String(tenant.room).toLowerCase() === String(room.number).toLowerCase();
      return matchById || matchByNumber;
    }).length;
    const capacity = Number(room.capacity) || 0;
    const percentage = capacity > 0 ? Math.min(100, Math.max(0, (occupancy / capacity) * 100)) : 0;
    return { occupancy, capacity, percentage };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="font-playfair text-2xl font-bold">Room Management</h2>
          <p className="text-gray-600 text-sm">
            {selectedHostel ? `Showing rooms for ${selectedHostel.name}` : "Showing rooms across all hostels"}
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-green text-white rounded-2xl px-6 shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Add New Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-playfair">Add New Room</DialogTitle>
            </DialogHeader>
            <RoomForm onSubmit={handleAddRoom} hostels={hostels} defaultHostelId={selectedHostel?.id} />
          </DialogContent>
        </Dialog>
      </div>
      {visibleHostelGroups.length === 0 ? (
        <Card className="p-6 text-center text-gray-500 border-dashed border-2">
          <CardContent>
            <p>No rooms found. Try adding a new room.</p>
          </CardContent>
        </Card>
      ) : (
        visibleHostelGroups.map(({ hostel, rooms: hostelRooms }) => (
          <div key={hostel.id} className="space-y-4">
            {!selectedHostel && (
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-lime-600" />
                <h3 className="font-playfair text-xl font-semibold">{hostel.name}</h3>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {hostelRooms.map((room) => {
                const { occupancy, capacity, percentage } = getOccupancy(room);

                return (
                  <Link key={room.id} href={`/admin/tenants?room=${encodeURIComponent(room.number)}`} passHref legacyBehavior>
                    <a className="block">
                      <Card className="shadow-card hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex flex-row items-center justify-between mb-6 gap-4">
                            <div className="bg-lime-100 w-16 h-16 rounded-2xl flex items-center justify-center">
                              <Building className="h-8 w-8 text-lime-600" />
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                              <h3 className="font-playfair text-xl font-bold">{room.number}</h3>
                              <p className="text-gray-500">Capacity: {room.capacity} beds</p>
                            </div>
                            <div className="flex flex-row gap-1 items-center justify-center" onClick={(e) => e.stopPropagation()}>
                              <Dialog open={editingRoom?.id === room.id} onOpenChange={(open) => setEditingRoom(open ? room : null)}>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="bg-white shadow-sm rounded-[14px] border-lime-200 border p-2 hover:bg-lime-50 transition-colors"
                                    aria-label="Edit Room"
                                  >
                                    <Edit className="h-5 w-5 text-gray-500 hover:text-lime-600" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle className="font-playfair">Edit Room</DialogTitle>
                                  </DialogHeader>
                                  {editingRoom && editingRoom.id === room.id && (
                                    <RoomForm
                                      room={editingRoom}
                                      onSubmit={handleEditRoom}
                                      hostels={hostels}
                                      defaultHostelId={selectedHostel?.id}
                                    />
                                  )}
                                </DialogContent>
                              </Dialog>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="bg-white shadow-sm rounded-[14px] border-lime-200 border p-2 hover:bg-red-50 transition-colors"
                                    aria-label="Delete Room"
                                  >
                                    <Trash2 className="h-5 w-5 text-red-500 hover:text-red-700" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Room</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this room? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeleteRoom(room.id)}>Delete</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                          <div className="space-y-3 mb-6">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Occupied:</span>
                              <span className="font-semibold">
                                {occupancy}/{capacity || "-"}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-lime-500 h-2 rounded-full transition-all"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

function RoomForm({ room, onSubmit, hostels, defaultHostelId }: { room?: any; onSubmit: any; hostels: any[]; defaultHostelId?: string }) {
  const initialHostel = room?.hostel_id || defaultHostelId || hostels[0]?.id || "";
  const [formData, setFormData] = useState({
    number: room?.number || "",
    capacity: room?.capacity || "",
    rent: room?.rent || "",
    hostelId: String(initialHostel),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: room?.id,
      number: formData.number,
      capacity: Number.parseInt(String(formData.capacity)),
      rent: Number.parseInt(String(formData.rent)),
      hostel_id: formData.hostelId,
    };

    onSubmit(room ? payload : { ...payload, id: undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="number">Room Number</Label>
          <Input
            id="number"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hostel">Hostel</Label>
          <select
            id="hostel"
            value={formData.hostelId}
            onChange={(e) => setFormData({ ...formData, hostelId: e.target.value })}
            className="w-full p-2 border rounded-xl bg-white focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all text-sm font-medium"
            required
          >
            <option value="" disabled>
              Select Hostel
            </option>
            {hostels.map((hostel) => (
              <option key={hostel.id} value={hostel.id}>
                {hostel.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rent">Monthly Rent</Label>
          <Input
            id="rent"
            type="number"
            value={formData.rent}
            onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" className="gradient-green text-white">
          {room ? "Update Room" : "Add Room"}
        </Button>
      </div>
    </form>
  );
}

export default RoomsContent; 