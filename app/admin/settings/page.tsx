"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SettingsContent from "@/components/admin/SettingsContent";

export default function AdminSettingsPage() {
  const router = useRouter();
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (userType !== "admin") {
      router.push("/");
    }
  }, [router]);
  return <SettingsContent />;
} 