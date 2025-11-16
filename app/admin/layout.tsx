"use client";

import React, { useEffect, useState, createContext } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Building, Home, UserCheck, CreditCard, Settings, LogOut, Menu, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/lib/supabaseAuth";
import { getCurrentSession } from "@/lib/supabaseAuth";
import { getHostelsByAdmin } from "@/lib/hostelsApi";

const navigationItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/tenants", label: "Tenants", icon: UserCheck },
  { href: "/admin/rooms", label: "Rooms", icon: Building },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
];

export const HostelContext = createContext({
  selectedHostel: null as any,
  setSelectedHostel: (_: any) => {},
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [hostels, setHostels] = useState<any[]>([]);
  const [selectedHostel, setSelectedHostel] = useState<any | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingHostels, setLoadingHostels] = useState(true);
  const [hostelError, setHostelError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHostels() {
      try {
        setLoadingHostels(true);
        setHostelError(null);
        const { session } = await getCurrentSession();
        if (!session?.user) {
          setHostels([]);
          setSelectedHostel(null);
          return;
        }

        const data = await getHostelsByAdmin(session.user.id);
        const mapped = data || [];
        setHostels(mapped);
        if (mapped.length === 0) {
          setSelectedHostel(null);
        }
      } catch (error) {
        console.error("Failed to load hostels", error);
        setHostelError("Failed to load hostels");
        setHostels([]);
        setSelectedHostel(null);
      } finally {
        setLoadingHostels(false);
      }
    }

    loadHostels();
  }, []);
  useEffect(() => {
    if (loadingHostels) return;

    const hostelSlugFromUrl = searchParams?.get("hostel");

    if (hostels.length === 0) {
      setSelectedHostel(null);
      return;
    }

    if (!hostelSlugFromUrl || hostelSlugFromUrl === "all") {
      if (selectedHostel !== null) {
        setSelectedHostel(null);
      }
      return;
    }

    if (hostelSlugFromUrl) {
      const match = hostels.find((h) => slugifyHostelName(h.name) === hostelSlugFromUrl);
      if (match && (!selectedHostel || String(selectedHostel.id) !== String(match.id))) {
        setSelectedHostel(match);
      } else if (!match && selectedHostel === null) {
        setSelectedHostel(hostels[0]);
      }
      return;
    }

    if (!selectedHostel) {
      setSelectedHostel(null);
    }
  }, [loadingHostels, hostels, searchParams, selectedHostel]);

  const clearNotifications = () => setNotifications(0);

  const slugifyHostelName = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const updateUrlWithHostel = (value: string | null) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (!value || value === "all") {
      params.delete("hostel");
    } else {
      params.set("hostel", value);
    }
    const queryString = params.toString();
    router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false });
  };

  const handleHostelSelect = (value: string) => {
    if (value === "all") {
      setSelectedHostel(null);
      updateUrlWithHostel(null);
      return;
    }

    const match = hostels.find((h) => String(h.id) === value) || null;
    setSelectedHostel(match);
    if (match) {
      updateUrlWithHostel(slugifyHostelName(match.name));
    } else {
      updateUrlWithHostel(null);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("userType");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/");
    }
  };

  // Unified sidebar/selector background
  const sidebarBg = "bg-white";

  return (
    <HostelContext.Provider value={{ selectedHostel, setSelectedHostel }}>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Desktop Sidebar */}
        <div className={`hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 ${sidebarBg}`}> 
          <div className="flex flex-col flex-grow border-r shadow-sm">
            <div className="flex items-center flex-shrink-0 px-6 py-4 border-b">
              <div className="bg-lime-100 w-10 h-10 rounded-2xl flex items-center justify-center mr-3">
                <Building className="h-6 w-6 text-lime-600" />
              </div>
              <h1 className="font-playfair text-xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            {/* Unified hostel selector */}
            <div className="p-4 border-b bg-white">
              <label className="text-xs font-medium text-gray-500 mb-2 block">SELECT HOSTEL</label>
              <select
                value={selectedHostel ? String(selectedHostel.id) : "all"}
                onChange={(e) => handleHostelSelect(e.target.value)}
                className="w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all text-sm font-medium"
                disabled={loadingHostels}
              >
                <option value="all">All Hostels</option>
                {hostels.map((hostel) => (
                  <option key={hostel.id} value={hostel.id}>
                    {hostel.name}
                  </option>
                ))}
              </select>
              {hostelError && <p className="text-xs text-red-500 mt-2">{hostelError}</p>}
              {selectedHostel && (
                <div className="mt-2 text-xs text-gray-500">
                  {selectedHostel.location && <p>{selectedHostel.location}</p>}
                </div>
              )}
            </div>
            <nav className="flex-1 px-4 space-y-2 mt-5">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                const href = selectedHostel
                  ? {
                      pathname: item.href,
                      query: { hostel: slugifyHostelName(selectedHostel.name) },
                    }
                  : item.href;
                return (
                  <Link key={item.href} href={href} legacyBehavior>
                    <a className={`flex items-center w-full rounded-xl h-12 px-3 transition-all font-medium ${
                      active
                        ? "text-lime-600 font-bold"
                        : "text-gray-600 hover:text-lime-600 hover:bg-gray-50"
                    }`}>
                      <Icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </a>
                  </Link>
                );
              })}
            </nav>
            <div className="flex-shrink-0 p-4 border-t">
              <Button variant="outline" size="sm" className="w-full rounded-xl bg-transparent" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
            <div className={`fixed inset-y-0 left-0 w-64 shadow-xl ${sidebarBg}`}> 
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex items-center">
                  <div className="bg-lime-100 w-8 h-8 rounded-xl flex items-center justify-center mr-2">
                    <Building className="h-5 w-5 text-lime-600" />
                  </div>
                  <h1 className="font-playfair text-lg font-bold text-gray-900">Admin Panel</h1>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {/* Unified hostel selector */}
              <div className="p-4 border-b bg-white">
                <label className="text-xs font-medium text-gray-500 mb-2 block">SELECT HOSTEL</label>
                <select
                  value={selectedHostel ? String(selectedHostel.id) : "all"}
                  onChange={(e) => handleHostelSelect(e.target.value)}
                  className="w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all text-sm font-medium"
                  disabled={loadingHostels}
                >
                  <option value="all">All Hostels</option>
                  {hostels.map((hostel) => (
                    <option key={hostel.id} value={hostel.id}>
                      {hostel.name}
                    </option>
                  ))}
                </select>
                {hostelError && <p className="text-xs text-red-500 mt-2">{hostelError}</p>}
                {selectedHostel && (
                  <div className="mt-2 text-xs text-gray-500">
                    {selectedHostel.location && <p>{selectedHostel.location}</p>}
                  </div>
                )}
              </div>
              <nav className="mt-5 px-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  const href = selectedHostel
                    ? {
                        pathname: item.href,
                        query: { hostel: slugifyHostelName(selectedHostel.name) },
                      }
                    : item.href;
                  return (
                    <Link key={item.href} href={href} legacyBehavior>
                      <a
                        className={`flex items-center w-full rounded-xl h-12 px-3 transition-all font-medium ${
                          active
                            ? "text-lime-600 font-bold"
                            : "text-gray-600 hover:text-lime-600 hover:bg-gray-50"
                        }`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {item.label}
                      </a>
                    </Link>
                  );
                })}
              </nav>
              <div className="absolute bottom-4 left-4 right-4">
                <Button variant="outline" size="sm" className="w-full rounded-xl bg-transparent" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 lg:pl-64">
          {/* Header */}
          <div className="bg-white shadow-sm border-b px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="font-playfair text-xl font-bold text-gray-900">Hostel Management</h1>
                  <p className="text-xs text-gray-500 lg:block hidden">Admin Dashboard</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" className="relative" onClick={clearNotifications}>
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </Button>
                <Avatar className="h-8 w-8 border-2 border-lime-200">
                  <AvatarImage src="/profile-demo.jpg" />
                  <AvatarFallback className="bg-lime-100 text-lime-700">AD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
          <div className="p-4 lg:p-6 pb-28 lg:pb-6">{children}</div>
          {/* Mobile Bottom Navigation */}
          <div className="fixed bottom-6 left-4 right-4 lg:hidden z-30">
            <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-center gap-2 bg-lime-500 text-white py-2">
                <Building className="h-4 w-4" />
                <span className="text-xs font-semibold">
                  {selectedHostel ? selectedHostel.name : "All Hostels"}
                </span>
              </div>
              <div className="grid grid-cols-4 divide-x divide-gray-100">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  const href = selectedHostel
                    ? { pathname: item.href, query: { hostel: slugifyHostelName(selectedHostel.name) } }
                    : item.href;
                  return (
                    <Link key={item.href} href={href} legacyBehavior>
                      <a
                        className={`flex flex-col items-center justify-center gap-1 py-3 transition-all font-medium ${
                          active ? "text-lime-600" : "text-gray-500 hover:text-lime-500"
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${active ? "fill-lime-100" : ""}`} />
                        <span className="text-xs">{item.label}</span>
                        {active && <span className="h-1 w-6 rounded-full bg-lime-500" />}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HostelContext.Provider>
  );
} 