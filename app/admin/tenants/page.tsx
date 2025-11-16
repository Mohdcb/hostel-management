"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TenantsContent from "@/components/admin/TenantsContent";
import { Suspense } from "react";
import { getAllTenants } from "@/lib/tenantsApi";
import { getAllRooms } from "@/lib/roomsApi";
import { getCurrentSession, checkUserRole } from "@/lib/supabaseAuth";
import { Button } from "@/components/ui/button";

function TenantsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tenants, setTenants] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get room filter from query param
  const roomFilter = searchParams.get("room");

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

    try {
      setLoading(true);
      setError(null);
      const [tenantsData, roomsData] = await Promise.all([
        getAllTenants(),
        getAllRooms(),
      ]);

      setTenants(tenantsData || []);
      setRooms(roomsData || []);
    } catch (err) {
      console.error("Error fetching tenants:", err);
      setError("Failed to load tenants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full py-16 text-gray-500 text-sm">
        Loading tenants…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 text-center">
        <p className="text-red-500 text-sm mb-3">{error}</p>
        <Button onClick={checkAuth}>Retry</Button>
      </div>
    );
  }

  return (
    <TenantsContent
      tenants={tenants}
      setTenants={setTenants}
      rooms={rooms}
      roomFilter={roomFilter}
    />
  );
}

export default function AdminTenantsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full py-16 text-gray-500 text-sm">
          Loading tenants page…
        </div>
      }
    >
      <TenantsPageContent />
    </Suspense>
  );
}