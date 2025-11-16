"use client";
import { useEffect, useState } from "react";
import {
  getAllHostels,
  createHostel,
  deleteHostel,
} from "@/lib/hostelsApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HostelsList() {
  const [hostels, setHostels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newHostel, setNewHostel] = useState({ name: "", location: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHostels();
  }, []);

  async function fetchHostels() {
    setLoading(true);
    try {
      const data = await getAllHostels();
      setHostels(data || []);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }

  async function handleAddHostel(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createHostel(newHostel);
      setNewHostel({ name: "", location: "" });
      fetchHostels();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDeleteHostel(id: string) {
    try {
      await deleteHostel(id);
      fetchHostels();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair">Add Hostel</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex gap-2" onSubmit={handleAddHostel}>
            <Input
              placeholder="Hostel Name"
              value={newHostel.name}
              onChange={e => setNewHostel({ ...newHostel, name: e.target.value })}
              required
            />
            <Input
              placeholder="Location"
              value={newHostel.location}
              onChange={e => setNewHostel({ ...newHostel, location: e.target.value })}
              required
            />
            <Button type="submit">Add</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair">Hostels</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <ul className="space-y-2">
              {hostels.map(h => (
                <li key={h.id} className="flex items-center justify-between border-b py-2">
                  <div>
                    <span className="font-bold">{h.name}</span> — {h.location}
                  </div>
                  <Button variant="outline" className="text-red-600" onClick={() => handleDeleteHostel(h.id)}>
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