import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, Building } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface RoomsContentProps {
  rooms: any[];
  setRooms: React.Dispatch<React.SetStateAction<any[]>>;
  tenants: any[];
}

const RoomsContent: React.FC<RoomsContentProps> = ({ rooms, setRooms, tenants }) => {
  const [editingRoom, setEditingRoom] = useState<any | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddRoom = (newRoom: any) => {
    const room = {
      ...newRoom,
      id: Math.max(...rooms.map((r: any) => r.id)) + 1,
    };
    setRooms([...rooms, room]);
    setIsAddDialogOpen(false);
  };

  const handleEditRoom = (updatedRoom: any) => {
    setRooms(rooms.map((r: any) => (r.id === updatedRoom.id ? updatedRoom : r)));
    setEditingRoom(null);
  };

  const handleDeleteRoom = (roomId: number) => {
    setRooms(rooms.filter((r: any) => r.id !== roomId));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="font-playfair text-2xl font-bold">Room Management</h2>
          <p className="text-gray-600 text-sm">Manage room allocation and capacity</p>
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
            <RoomForm onSubmit={handleAddRoom} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rooms.map((room) => {
          const occupied = tenants.filter((t) => t.room === room.number).length;
          return (
            <Link key={room.id} href={`/admin/tenants?room=${encodeURIComponent(room.number)}`} passHref legacyBehavior>
              <a className="block">
                <Card className="shadow-card hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                  <CardContent className="p-6">
                    {/* Header row: icon left, name/capacity center, edit/delete icons right (flex-col) */}
                    <div className="flex flex-row items-center justify-between mb-6 gap-4">
                      {/* Main icon left */}
                      <div className="bg-lime-100 w-16 h-16 rounded-2xl flex items-center justify-center">
                        <Building className="h-8 w-8 text-lime-600" />
                      </div>
                      {/* Name/capacity center */}
                      <div className="flex-1 flex flex-col items-center">
                        <h3 className="font-playfair text-xl font-bold">{room.number}</h3>
                        <p className="text-gray-500">Capacity: {room.capacity} beds</p>
                      </div>
                      {/* Edit/Delete icons right, stacked */}
                      <div className="flex flex-row gap-1 items-center justify-center space-y-2" onClick={e => e.stopPropagation()}>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="bg-white shadow-sm rounded-[14px] border-lime-200 border-[1px] p-2 hover:bg-lime-50 transition-colors"
                              onClick={e => { e.stopPropagation(); setEditingRoom(room); }}
                              aria-label="Edit Room"
                            >
                              <Edit className="h-5 w-5 text-gray-500 hover:text-lime-600" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="font-playfair">Edit Room</DialogTitle>
                            </DialogHeader>
                            {editingRoom && <RoomForm room={editingRoom} onSubmit={handleEditRoom} />}
                          </DialogContent>
                        </Dialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="bg-white shadow-sm rounded-[14px] border-lime-200 border-[1px] p-2 hover:bg-red-50 transition-colors"
                              onClick={e => e.stopPropagation()}
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
                         {occupied}/{room.capacity}
                       </span>
                      </div>
                      {/* <div className="flex justify-between items-center">
                        <span className="text-gray-600">Rent:</span>
                         <span className="font-playfair font-semibold text-lime-600">₹{room.rent.toLocaleString()}</span> 
                      </div> */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-lime-500 h-2 rounded-full transition-all"
                         style={{ width: `${(occupied / room.capacity) * 100}%` }}
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
  );
};

function RoomForm({ room, onSubmit }: { room?: any; onSubmit: any }) {
  const [formData, setFormData] = useState({
    number: room?.number || "",
    capacity: room?.capacity || "",
    rent: room?.rent || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(
      room
        ? { ...room, ...formData, capacity: Number.parseInt(formData.capacity), rent: Number.parseInt(formData.rent) }
        : { ...formData, capacity: Number.parseInt(formData.capacity), rent: Number.parseInt(formData.rent) }
    );
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