"use client";
import { useEffect, useState } from "react";
import {
  getAllPayments,
  createPayment,
  deletePayment,
} from "@/lib/paymentsApi";
import { getAllTenants } from "@/lib/tenantsApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PaymentsList() {
  const [payments, setPayments] = useState<any[]>([]);
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPayment, setNewPayment] = useState({
    tenant_id: "",
    amount: 0,
    status: "pending",
    date: "",
    month: "",
    mode: "upi",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPayments();
    fetchTenants();
  }, []);

  async function fetchPayments() {
    setLoading(true);
    try {
      const data = await getAllPayments();
      setPayments(data || []);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }

  async function fetchTenants() {
    try {
      const data = await getAllTenants();
      setTenants(data || []);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleAddPayment(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createPayment({
        ...newPayment,
        amount: Number(newPayment.amount),
      });
      setNewPayment({ tenant_id: "", amount: 0, status: "pending", date: "", month: "", mode: "upi" });
      fetchPayments();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDeletePayment(id: string) {
    try {
      await deletePayment(id);
      fetchPayments();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair">Add Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex gap-2 flex-wrap" onSubmit={handleAddPayment}>
            <select
              value={newPayment.tenant_id}
              onChange={e => setNewPayment({ ...newPayment, tenant_id: e.target.value })}
              className="p-2 border rounded-xl"
              required
            >
              <option value="">Select Tenant</option>
              {tenants.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <Input
              placeholder="Amount"
              type="number"
              min={0}
              value={newPayment.amount}
              onChange={e => setNewPayment({ ...newPayment, amount: e.target.value })}
              required
            />
            <select
              value={newPayment.status}
              onChange={e => setNewPayment({ ...newPayment, status: e.target.value })}
              className="p-2 border rounded-xl"
              required
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
            </select>
            <Input
              placeholder="Date"
              type="date"
              value={newPayment.date}
              onChange={e => setNewPayment({ ...newPayment, date: e.target.value })}
              required
            />
            <Input
              placeholder="Month"
              value={newPayment.month}
              onChange={e => setNewPayment({ ...newPayment, month: e.target.value })}
              required
            />
            <select
              value={newPayment.mode}
              onChange={e => setNewPayment({ ...newPayment, mode: e.target.value })}
              className="p-2 border rounded-xl"
              required
            >
              <option value="upi">UPI</option>
              <option value="cash">Cash</option>
              <option value="bank">Bank</option>
            </select>
            <Button type="submit">Add</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair">Payments</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <ul className="space-y-2">
              {payments.map(p => (
                <li key={p.id} className="flex items-center justify-between border-b py-2">
                  <div>
                    <span className="font-bold">{tenants.find(t => t.id === p.tenant_id)?.name || "Unknown Tenant"}</span> — ₹{p.amount} — <span className="capitalize">{p.status}</span> — {p.date} — {p.month} — {p.mode}
                  </div>
                  <Button variant="outline" className="text-red-600" onClick={() => handleDeletePayment(p.id)}>
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