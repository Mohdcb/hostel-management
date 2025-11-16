"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserDashboard } from "@/components/user/user-dashboard";
import { getCurrentSession, checkUserRole } from "@/lib/supabaseAuth";

export default function UserDashboardPage() {
  const router = useRouter();

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
    if (role === 'admin') {
      router.push("/admin/dashboard");
      return;
    }
  };

  return <UserDashboard />;
} 