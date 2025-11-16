"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardContent from "@/components/admin/DashboardContent";
import { getAllTenants } from "@/lib/tenantsApi";
import { getAllRooms } from "@/lib/roomsApi";
import { getAllPayments } from "@/lib/paymentsApi";
import { getCurrentSession, checkUserRole } from "@/lib/supabaseAuth";
import { HostelContext } from "@/app/admin/layout";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { selectedHostel } = useContext(HostelContext);
  const [tenants, setTenants] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

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

    // Fetch all data in parallel for faster loading
    try {
      const [roomsData, tenantsData, paymentsData] = await Promise.all([
        getAllRooms(),
        getAllTenants(),
        getAllPayments()
      ]);

      setRooms(roomsData || []);
      setTenants(tenantsData || []);
      setPayments(paymentsData || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const filterMatchesHostel = (value: any, hostel: any) => {
    if (!hostel) return true;
    if (!value) return false;
    const normalized = String(value).toLowerCase();
    return normalized === String(hostel.id).toLowerCase() || normalized === String(hostel.name).toLowerCase();
  };

  const filteredRooms = useMemo(() => {
    if (!selectedHostel) return rooms;
    return rooms.filter((room) => {
      const hostelId = room.hostel_id || room.hostelId;
      if (hostelId && String(hostelId) === String(selectedHostel.id)) return true;
      if (room.hostel?.id && String(room.hostel.id) === String(selectedHostel.id)) return true;
      return false;
    });
  }, [rooms, selectedHostel]);

  const filteredTenants = useMemo(() => {
    if (!selectedHostel) return tenants;

    const matchesHostel = (tenant: any) => {
      const directMatches = [
        tenant.hostel_id,
        tenant.hostelId,
        tenant.hostel?.id,
        tenant.hostel?.hostel_id,
        tenant.hostel?.name,
      ].filter(Boolean);
      if (directMatches.some((id: any) => filterMatchesHostel(id, selectedHostel))) {
        return true;
      }

      if (tenant.room_id || tenant.room) {
        const roomMatch = rooms.find((room) => {
          const byId = tenant.room_id && String(room.id) === String(tenant.room_id);
          const byNumber =
            tenant.room &&
            room.number &&
            String(room.number).toLowerCase() === String(tenant.room).toLowerCase();
          return byId || byNumber;
        });
        if (roomMatch) {
          const roomHostelValues = [roomMatch.hostel_id, roomMatch.hostel?.id, roomMatch.hostel?.name].filter(Boolean);
          return roomHostelValues.some((id: any) => filterMatchesHostel(id, selectedHostel));
        }
      }

      return false;
    };

    return tenants.filter(matchesHostel);
  }, [tenants, rooms, selectedHostel]);

  const filteredPayments = useMemo(() => {
    if (!selectedHostel) return payments;

    const tenantLookup = new Map<string, any>();
    tenants.forEach((tenant) => {
      tenantLookup.set(String(tenant.id), tenant);
    });

    return payments.filter((payment) => {
      if (payment.hostel_id && String(payment.hostel_id) === String(selectedHostel.id)) {
        return true;
      }

      const tenant = payment.tenant_id ? tenantLookup.get(String(payment.tenant_id)) : null;
      if (!tenant) return false;

      const directMatches = [
        tenant.hostel_id,
        tenant.hostelId,
        tenant.hostel?.id,
        tenant.hostel?.hostel_id,
        tenant.hostel?.name,
      ].filter(Boolean);

      if (directMatches.some((id: any) => filterMatchesHostel(id, selectedHostel))) {
        return true;
      }

      if (tenant.room_id || tenant.room) {
        const roomMatch = rooms.find((room) => {
          const byId = tenant.room_id && String(room.id) === String(tenant.room_id);
          const byNumber =
            tenant.room &&
            room.number &&
            String(room.number).toLowerCase() === String(tenant.room).toLowerCase();
          return byId || byNumber;
        });
        if (roomMatch) {
          const roomHostelValues = [roomMatch.hostel_id, roomMatch.hostel?.id, roomMatch.hostel?.name].filter(Boolean);
          return roomHostelValues.some((id: any) => filterMatchesHostel(id, selectedHostel));
        }
      }

      return false;
    });
  }, [payments, tenants, rooms, selectedHostel]);

  return (
    <DashboardContent
      selectedHostel={selectedHostel}
      tenants={filteredTenants}
      rooms={filteredRooms}
      payments={filteredPayments}
    />
  );
}