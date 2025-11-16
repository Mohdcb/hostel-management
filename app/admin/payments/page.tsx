"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PaymentsContent from "@/components/admin/PaymentsContent";
import { getAllPayments } from "@/lib/paymentsApi";
import { getAllTenants } from "@/lib/tenantsApi";
import { getCurrentSession, checkUserRole } from "@/lib/supabaseAuth";

export default function AdminPaymentsPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<any[]>([]);
  const [tenants, setTenants] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { session } = await getCurrentSession();
    if (!session?.user) {
      router.push("/");
      return;
    }

    const { role } = await checkUserRole(session.user.id);
    if (role !== 'admin') {
      router.push("/");
      return;
    }

    // Fetch data in parallel
    try {
      const [paymentsData, tenantsData] = await Promise.all([
        getAllPayments(),
        getAllTenants()
      ]);
      setPayments(paymentsData || []);
      setTenants(tenantsData || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return <PaymentsContent payments={payments} setPayments={setPayments} tenants={tenants} setTenants={setTenants} />;
} 