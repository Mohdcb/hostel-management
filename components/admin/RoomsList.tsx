"use client";
import { useEffect, useState } from "react";
import {
  getAllRooms,
  createRoom,
  deleteRoom,
} from "@/lib/roomsApi";
import { getAllHostels } from "@/lib/hostelsApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RoomsList() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [hostels, setHostels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newRoom, setNewRoom] = useState({ number: "", capacity: 1, rent: 0, hostel_id: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRooms();
    fetchHostels();
  }, []);

  async function fetchRooms() {
    setLoading(true);
    try {
      const data = await getAllRooms();
      setRooms(data || []);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }

  async function fetchHostels() {
    try {
      const data = await getAllHostels();
      setHostels(data || []);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleAddRoom(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createRoom({
        ...newRoom,
        capacity: Number(newRoom.capacity),
        rent: Number(newRoom.rent),
      });
      setNewRoom({ number: "", capacity: 1, rent: 0, hostel_id: "" });
      fetchRooms();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDeleteRoom(id: string) {
    try {
      await deleteRoom(id);
      fetchRooms();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair">Add Room</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex gap-2 flex-wrap" onSubmit={handleAddRoom}>
            <Input
              placeholder="Room Number"
              value={newRoom.number}
              onChange={e => setNewRoom({ ...newRoom, number: e.target.value })}
              required
            />
            <Input
              placeholder="Capacity"
              type="number"
              min={1}
              value={newRoom.capacity}
              onChange={e => setNewRoom({ ...newRoom, capacity: e.target.value })}
              required
            />
            <Input
              placeholder="Rent"
              type="number"
              min={0}
              value={newRoom.rent}
              onChange={e => setNewRoom({ ...newRoom, rent: e.target.value })}
              required
            />
            <select
              value={newRoom.hostel_id}
              onChange={e => setNewRoom({ ...newRoom, hostel_id: e.target.value })}
              className="p-2 border rounded-xl"
              required
            >
              <option value="">Select Hostel</option>
              {hostels.map(h => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
            <Button type="submit">Add</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair">Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <ul className="space-y-2">
              {rooms.map(r => (
                <li key={r.id} className="flex items-center justify-between border-b py-2">
                  <div>
                    <span className="font-bold">{r.number}</span> — Capacity: {r.capacity}, Rent: ₹{r.rent} <span className="text-xs text-gray-500">({hostels.find(h => h.id === r.hostel_id)?.name || ""})</span>
                  </div>
                  <Button variant="outline" className="text-red-600" onClick={() => handleDeleteRoom(r.id)}>
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 