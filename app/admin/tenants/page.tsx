"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TenantsContent from "@/components/admin/TenantsContent";
import { initialTenants } from "@/lib/demo-data";

export default function AdminTenantsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tenants, setTenants] = useState(initialTenants);

  // Get room filter from query param
  const roomFilter = searchParams.get("room");
  const filteredTenants = roomFilter
    ? tenants.filter((t) => t.room === roomFilter)
    : tenants;

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "admin") {
      router.push("/");
    }
  }, [router]);

  return <TenantsContent tenants={filteredTenants} setTenants={setTenants} />;
} 