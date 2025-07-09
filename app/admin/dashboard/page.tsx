"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardContent from "@/components/admin/DashboardContent";
import { initialTenants, hostels } from "@/lib/demo-data";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [selectedHostel] = useState(hostels[0]);
  const [tenants] = useState(initialTenants);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "admin") {
      router.push("/");
    }
  }, [router]);

  return <DashboardContent selectedHostel={selectedHostel} tenants={tenants} />;
} 