"use client";
import { useEffect, useState } from "react";
import {
  getAllTenants,
  createTenant,
  deleteTenant,
} from "@/lib/tenantsApi";
import { getAllHostels } from "@/lib/hostelsApi";
import { getAllRooms } from "@/lib/roomsApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TenantsList() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [hostels, setHostels] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTenant, setNewTenant] = useState({
    name: "",
    phone: "",
    email: "",
    status: "pending",
    hostel_id: "",
    room_id: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTenants();
    fetchHostels();
    fetchRooms();
  }, []);

  async function fetchTenants() {
    setLoading(true);
    try {
      const data = await getAllTenants();
      setTenants(data || []);
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

  async function fetchRooms() {
    try {
      const data = await getAllRooms();
      setRooms(data || []);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleAddTenant(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createTenant(newTenant);
      setNewTenant({ name: "", phone: "", email: "", status: "pending", hostel_id: "", room_id: "" });
      fetchTenants();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDeleteTenant(id: string) {
    try {
      await deleteTenant(id);
      fetchTenants();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair">Add Tenant</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex gap-2 flex-wrap" onSubmit={handleAddTenant}>
            <Input
              placeholder="Name"
              value={newTenant.name}
              onChange={e => setNewTenant({ ...newTenant, name: e.target.value })}
              required
            />
            <Input
              placeholder="Phone"
              value={newTenant.phone}
              onChange={e => setNewTenant({ ...newTenant, phone: e.target.value })}
              required
            />
            <Input
              placeholder="Email"
              type="email"
              value={newTenant.email}
              onChange={e => setNewTenant({ ...newTenant, email: e.target.value })}
              required
            />
            <select
              value={newTenant.status}
              onChange={e => setNewTenant({ ...newTenant, status: e.target.value })}
              className="p-2 border rounded-xl"
              required
            >
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={newTenant.hostel_id}
              onChange={e => setNewTenant({ ...newTenant, hostel_id: e.target.value })}
              className="p-2 border rounded-xl"
              required
            >
              <option value="">Select Hostel</option>
              {hostels.map(h => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
            <select
              value={newTenant.room_id}
              onChange={e => setNewTenant({ ...newTenant, room_id: e.target.value })}
              className="p-2 border rounded-xl"
              required
            >
              <option value="">Select Room</option>
              {rooms.map(r => (
                <option key={r.id} value={r.id}>{r.number}</option>
              ))}
            </select>
            <Button type="submit">Add</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair">Tenants</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <ul className="space-y-2">
              {tenants.map(t => (
                <li key={t.id} className="flex items-center justify-between border-b py-2">
                  <div>
                    <span className="font-bold">{t.name}</span> — {t.phone} — {t.email} — <span className="capitalize">{t.status}</span> <span className="text-xs text-gray-500">({hostels.find(h => h.id === t.hostel_id)?.name || ""} / {rooms.find(r => r.id === t.room_id)?.number || ""})</span>
                  </div>
                  <Button variant="outline" className="text-red-600" onClick={() => handleDeleteTenant(t.id)}>
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