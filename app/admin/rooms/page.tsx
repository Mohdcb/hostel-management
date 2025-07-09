"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RoomsContent from "@/components/admin/RoomsContent";
import { initialRooms } from "@/lib/demo-data";
import { initialTenants } from "@/lib/demo-data";

export default function AdminRoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState(initialRooms);
  const [tenants, setTenants] = useState(initialTenants);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "admin") {
      router.push("/");
    }
  }, [router]);

  return <RoomsContent rooms={rooms} setRooms={setRooms} tenants={tenants} />;
} 