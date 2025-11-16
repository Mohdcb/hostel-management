"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RoomsContent from "@/components/admin/RoomsContent";
import { getAllRooms } from "@/lib/roomsApi";
import { getAllTenants } from "@/lib/tenantsApi";
import { getCurrentSession, checkUserRole } from "@/lib/supabaseAuth";

export default function AdminRoomsPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState<any[]>([]);
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
      const [roomsData, tenantsData] = await Promise.all([
        getAllRooms(),
        getAllTenants()
      ]);
      setRooms(roomsData || []);
      setTenants(tenantsData || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return <RoomsContent rooms={rooms} setRooms={setRooms} tenants={tenants} />;
} 