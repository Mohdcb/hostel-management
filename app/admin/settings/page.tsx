"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SettingsContent from "@/components/admin/SettingsContent";
import { getCurrentSession, checkUserRole } from "@/lib/supabaseAuth";

export default function AdminSettingsPage() {
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
    if (role !== 'admin') {
      router.push("/");
      return;
    }
  };
  
  return <SettingsContent />;
} 