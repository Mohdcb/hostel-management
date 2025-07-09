"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PaymentsContent from "@/components/admin/PaymentsContent";
import { initialTenants } from "@/lib/demo-data";

export default function AdminPaymentsPage() {
  const router = useRouter();
  const [tenants, setTenants] = useState(initialTenants);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "admin") {
      router.push("/");
    }
  }, [router]);

  return <PaymentsContent tenants={tenants} setTenants={setTenants} />;
} 