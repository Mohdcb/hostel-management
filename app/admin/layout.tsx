"use client";

import React, { useState, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building, Home, UserCheck, CreditCard, Settings, LogOut, Menu, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigationItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/tenants", label: "Tenants", icon: UserCheck },
  { href: "/admin/rooms", label: "Rooms", icon: Building },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

const hostels = [
  { id: 1, name: "Green Valley Hostel", location: "Downtown", tenants: 24, rooms: 12 },
  { id: 2, name: "Sunrise Residency", location: "University Area", tenants: 18, rooms: 8 },
  { id: 3, name: "Blue Mountain Lodge", location: "Tech Park", tenants: 32, rooms: 16 },
  { id: 4, name: "Golden Heights", location: "City Center", tenants: 28, rooms: 14 },
];

export const HostelContext = createContext({
  selectedHostel: hostels[0],
  setSelectedHostel: (_: any) => {},
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [selectedHostel, setSelectedHostel] = useState(hostels[0]);
  const pathname = usePathname();

  const clearNotifications = () => setNotifications(0);

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
                value={selectedHostel.id}
                onChange={(e) =>
                  setSelectedHostel(hostels.find((h) => h.id === Number.parseInt(e.target.value)) || hostels[0])
                }
                className="w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all text-sm font-medium"
              >
                <option value={0}>All Hostels</option>
                {hostels.map((hostel) => (
                  <option key={hostel.id} value={hostel.id}>
                    {hostel.name}
                  </option>
                ))}
              </select>
              {selectedHostel.id !== 0 && (
                <div className="mt-2 text-xs text-gray-500">
                  <p>{selectedHostel.location}</p>
                  <p>
                    {selectedHostel.tenants} tenants • {selectedHostel.rooms} rooms
                  </p>
                </div>
              )}
            </div>
            <nav className="flex-1 px-4 space-y-2 mt-5">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} legacyBehavior>
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
              <Button variant="outline" size="sm" className="w-full rounded-xl bg-transparent">
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
                  value={selectedHostel.id}
                  onChange={(e) =>
                    setSelectedHostel(hostels.find((h) => h.id === Number.parseInt(e.target.value)) || hostels[0])
                  }
                  className="w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all text-sm font-medium"
                >
                  <option value={0}>All Hostels</option>
                  {hostels.map((hostel) => (
                    <option key={hostel.id} value={hostel.id}>
                      {hostel.name}
                    </option>
                  ))}
                </select>
                {selectedHostel.id !== 0 && (
                  <div className="mt-2 text-xs text-gray-500">
                    <p>{selectedHostel.location}</p>
                    <p>
                      {selectedHostel.tenants} tenants • {selectedHostel.rooms} rooms
                    </p>
                  </div>
                )}
              </div>
              <nav className="mt-5 px-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} legacyBehavior>
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
                <Button variant="outline" size="sm" className="w-full rounded-xl bg-transparent">
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
                <h1 className="font-playfair text-xl font-bold text-gray-900 capitalize">Admin</h1>
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
            <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl">
              <div className="flex justify-around py-4">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} legacyBehavior>
                      <a
                        className={`flex flex-col items-center space-y-1 px-3 py-3 rounded-2xl transition-all duration-200 font-medium ${
                          active
                            ? "text-lime-500 scale-105 font-bold"
                            : "text-gray-500 hover:text-lime-600 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-xs">{item.label}</span>
                        {active && <div className="w-1.5 h-1.5 bg-lime-500 rounded-full animate-pulse" />}
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