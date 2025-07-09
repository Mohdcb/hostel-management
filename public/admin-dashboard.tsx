"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DollarSign,
  Users,
  Clock,
  Menu,
  Bell,
  Home,
  UserCheck,
  Building,
  CreditCard,
  Settings,
  X,
  TrendingUp,
  Calendar,
  BarChart3,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Check,
  MessageCircle,
  Eye,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { CheckCircle } from "lucide-react"

const monthlyData = [
  { month: "Jan", income: 45000, expenses: 12000 },
  { month: "Feb", income: 52000, expenses: 15000 },
  { month: "Mar", income: 48000, expenses: 11000 },
  { month: "Apr", income: 61000, expenses: 18000 },
  { month: "May", income: 55000, expenses: 14000 },
  { month: "Jun", income: 67000, expenses: 16000 },
]

const occupancyData = [
  { month: "Jan", occupancy: 85 },
  { month: "Feb", occupancy: 92 },
  { month: "Mar", occupancy: 78 },
  { month: "Apr", occupancy: 95 },
  { month: "May", occupancy: 88 },
  { month: "Jun", occupancy: 96 },
]

const paymentStatusData = [
  { name: "Paid", value: 18, color: "#a3e635" },
  { name: "Pending", value: 4, color: "#f59e0b" },
  { name: "Partial", value: 2, color: "#ef4444" },
]

const recentPayments = [
  {
    id: 1,
    name: "John Doe",
    room: "A-101",
    amount: 5000,
    status: "paid",
    avatar: "/profile-demo.jpg",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    room: "B-205",
    amount: 5500,
    status: "pending",
    avatar: "/profile-demo.jpg",
  },
  {
    id: 3,
    name: "Mike Johnson",
    room: "A-103",
    amount: 5000,
    status: "paid",
    avatar: "/profile-demo.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    room: "C-301",
    amount: 6000,
    status: "partial",
    avatar: "/profile-demo.jpg",
  },
]

const initialTenants = [
  {
    id: 1,
    name: "John Doe",
    room: "A-101",
    status: "paid",
    phone: "+91 9876543210",
    email: "john.doe@email.com",
    avatar: "/profile-demo.jpg",
    checkIn: "Sep 2024",
    emergencyContact: "+91 9876543211",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    room: "B-205",
    status: "pending",
    phone: "+91 9876543211",
    email: "sarah.wilson@email.com",
    avatar: "/profile-demo.jpg",
    checkIn: "Oct 2024",
    emergencyContact: "+91 9876543212",
  },
  {
    id: 3,
    name: "Mike Johnson",
    room: "A-103",
    status: "paid",
    phone: "+91 9876543212",
    email: "mike.johnson@email.com",
    avatar: "/profile-demo.jpg",
    checkIn: "Aug 2024",
    emergencyContact: "+91 9876543213",
  },
  {
    id: 4,
    name: "Emily Davis",
    room: "C-301",
    status: "partial",
    phone: "+91 9876543213",
    email: "emily.davis@email.com",
    avatar: "/profile-demo.jpg",
    checkIn: "Nov 2024",
    emergencyContact: "+91 9876543214",
  },
  {
    id: 5,
    name: "Alex Chen",
    room: "B-102",
    status: "paid",
    phone: "+91 9876543214",
    email: "alex.chen@email.com",
    avatar: "/profile-demo.jpg",
    checkIn: "Jul 2024",
    emergencyContact: "+91 9876543215",
  },
  {
    id: 6,
    name: "Lisa Park",
    room: "C-205",
    status: "paid",
    phone: "+91 9876543215",
    email: "lisa.park@email.com",
    avatar: "/profile-demo.jpg",
    checkIn: "Dec 2024",
    emergencyContact: "+91 9876543216",
  },
]

const initialRooms = [
  { id: 1, number: "A-101", capacity: 2, occupied: 1, rent: 5000 },
  { id: 2, number: "A-102", capacity: 3, occupied: 3, rent: 6000 },
  { id: 3, number: "B-205", capacity: 2, occupied: 1, rent: 5500 },
  { id: 4, number: "C-301", capacity: 4, occupied: 2, rent: 7000 },
]

const hostels = [
  { id: 1, name: "Green Valley Hostel", location: "Downtown", tenants: 24, rooms: 12 },
  { id: 2, name: "Sunrise Residency", location: "University Area", tenants: 18, rooms: 8 },
  { id: 3, name: "Blue Mountain Lodge", location: "Tech Park", tenants: 32, rooms: 16 },
  { id: 4, name: "Golden Heights", location: "City Center", tenants: 28, rooms: 14 },
]

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedHostel, setSelectedHostel] = useState(hostels[0])
  const [tenants, setTenants] = useState(initialTenants)
  const [rooms, setRooms] = useState(initialRooms)
  const [notifications, setNotifications] = useState(3)

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "tenants", label: "Tenants", icon: UserCheck },
    { id: "rooms", label: "Rooms", icon: Building },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const handleLogout = () => {
    // Simulate logout
    alert("Logging out...")
    window.location.reload()
  }

  const clearNotifications = () => {
    setNotifications(0)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent selectedHostel={selectedHostel} tenants={tenants} />
      case "tenants":
        return <TenantsContent tenants={tenants} setTenants={setTenants} />
      case "rooms":
        return <RoomsContent rooms={rooms} setRooms={setRooms} />
      case "payments":
        return <PaymentsContent tenants={tenants} setTenants={setTenants} />
      case "settings":
        return <SettingsContent />
      default:
        return <DashboardContent selectedHostel={selectedHostel} tenants={tenants} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r shadow-sm">
          <div className="flex items-center flex-shrink-0 px-6 py-4 border-b">
            <div className="bg-lime-100 w-10 h-10 rounded-2xl flex items-center justify-center mr-3">
              <Building className="h-6 w-6 text-lime-600" />
            </div>
            <h1 className="font-playfair text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>

          {/* Hostel Selector */}
          <div className="p-4 border-b bg-gray-50">
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
          <div className="flex flex-col flex-grow mt-5">
            <nav className="flex-1 px-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full justify-start rounded-xl h-12 ${
                      activeTab === item.id
                        ? "gradient-green text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Button>
                )
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 p-4 border-t">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar className="h-10 w-10 border-2 border-lime-200">
                <AvatarImage src="/profile-demo.jpg" />
                <AvatarFallback className="bg-lime-100 text-lime-700">AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@hostel.com</p>
              </div>
            </div>
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
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
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

            {/* Mobile Hostel Selector */}
            <div className="p-4 border-b bg-gray-50">
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
            </div>
            <nav className="mt-5 px-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    onClick={() => {
                      setActiveTab(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`w-full justify-start rounded-xl h-12 ${
                      activeTab === item.id
                        ? "gradient-green text-white shadow-lg"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Button>
                )
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
                <h1 className="font-playfair text-xl font-bold text-gray-900 capitalize">{activeTab}</h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  {selectedHostel.id === 0
                    ? "Managing all hostels"
                    : `${selectedHostel.location} • ${selectedHostel.tenants} tenants`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {/* Desktop hostel badge */}
              {selectedHostel.id !== 0 && (
                <Badge className="bg-lime-100 text-lime-700 px-2 py-1 text-xs hidden lg:block">
                  {selectedHostel.name}
                </Badge>
              )}
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

        {/* Content */}
        <div className="p-4 lg:p-6 pb-28 lg:pb-6">{renderContent()}</div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-6 left-4 right-4 lg:hidden">
        <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl">
          <div className="flex justify-around py-4">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center space-y-1 px-3 py-3 rounded-2xl transition-all duration-200 ${
                    activeTab === item.id
                      ? "text-lime-500 bg-lime-50 shadow-lg scale-105"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                  {activeTab === item.id && <div className="w-1.5 h-1.5 bg-lime-500 rounded-full animate-pulse" />}
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardContent({ selectedHostel, tenants }) {
  return (
    <div className="space-y-6">
      {/* Mobile Hostel Indicator */}
      {selectedHostel.id !== 0 && (
        <Card className="lg:hidden shadow-card border-l-4 border-l-lime-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-playfair font-semibold text-lg">{selectedHostel.name}</h3>
                <p className="text-sm text-gray-500">{selectedHostel.location}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{selectedHostel.tenants} tenants</p>
                <p className="text-xs text-gray-500">{selectedHostel.rooms} rooms</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Main Stats Card - Mobile First */}
      <Card className="gradient-green text-white shadow-card relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <path d="M0,100 Q100,50 200,100 T400,100 L400,300 L0,300 Z" fill="currentColor" opacity="0.3" />
            <path d="M0,150 Q150,100 300,150 T600,150 L600,300 L0,300 Z" fill="currentColor" opacity="0.2" />
          </svg>
        </div>
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-green-100 text-sm font-medium">Total Earnings</span>
                <Badge className="bg-black/20 text-white text-xs px-2 py-1">+12%</Badge>
              </div>
              <p className="text-4xl lg:text-5xl font-bold font-playfair mb-2">₹67,000</p>
              <p className="text-green-100 text-sm">Updated: 12/03/2025</p>
            </div>
            <div className="bg-white/20 p-4 rounded-3xl">
              <DollarSign className="h-8 w-8" />
            </div>
          </div>

          {/* Bottom Stats Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 grid grid-cols-2 gap-4 lg:gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-xl">
                <TrendingUp className="h-5 w-5 text-red-500 rotate-180" />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Expenses</p>
                <p className="text-gray-900 font-bold text-lg">₹16,000</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-xl">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Income</p>
                <p className="text-gray-900 font-bold text-lg">₹67,000</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <Card className="bg-white shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Payments</p>
                <p className="text-2xl lg:text-3xl font-bold font-playfair text-orange-500">₹11,500</p>
                <p className="text-gray-500 text-xs mt-1">3 tenants</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-2xl">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Tenants</p>
                <p className="text-2xl lg:text-3xl font-bold font-playfair text-blue-500">24</p>
                <p className="text-gray-500 text-xs mt-1">8 rooms occupied</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-2xl">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-card sm:col-span-2 lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Occupancy Rate</p>
                <p className="text-2xl lg:text-3xl font-bold font-playfair text-purple-500">96%</p>
                <p className="text-gray-500 text-xs mt-1">+4% this month</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-2xl">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Tenants Overview - Simplified Design */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-playfair flex items-center justify-between">
            <span className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-500" />
              Current Tenants
            </span>
            <Button variant="outline" size="sm" className="rounded-full bg-transparent">
              View All ({tenants.length})
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tenants.slice(0, 6).map((tenant) => (
              <div
                key={tenant.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all hover:shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <Avatar
                    className={`h-12 w-12 border-3 shadow-lg ${
                      tenant.status === "paid"
                        ? "border-green-400"
                        : tenant.status === "pending"
                          ? "border-red-400"
                          : "border-orange-400"
                    }`}
                  >
                    <AvatarImage src={tenant.avatar || "/placeholder.svg"} className="object-cover" />
                    <AvatarFallback className="bg-lime-100 text-lime-700">
                      {tenant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-playfair font-semibold text-base">{tenant.name}</h3>
                    <p className="text-sm text-gray-500">{tenant.room}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-playfair font-bold text-lg text-lime-600">₹5,500</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-sm font-medium text-gray-900">18 Paid</p>
              <p className="text-xs text-gray-500">This month</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <p className="text-sm font-medium text-gray-900">4 Pending</p>
              <p className="text-xs text-gray-500">Due soon</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-sm font-medium text-gray-900">24 Total</p>
              <p className="text-xs text-gray-500">Active tenants</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Income vs Expenses Chart */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-playfair flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-lime-500" />
              Income vs Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="income" fill="#a3e635" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment Status Pie Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-playfair">Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {paymentStatusData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-sm text-gray-600">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Occupancy Trend */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-playfair flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
              Occupancy Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={occupancyData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Area
                  type="monotone"
                  dataKey="occupancy"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Payments */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-playfair flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-green-500" />
              Recent Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.slice(0, 4).map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                      <AvatarImage src={payment.avatar || "/placeholder.svg"} className="object-cover" />
                      <AvatarFallback className="bg-lime-100 text-lime-700">
                        {payment.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{payment.name}</p>
                      <p className="text-gray-500 text-xs">{payment.room}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">₹{payment.amount.toLocaleString()}</p>
                    <Badge
                      variant={
                        payment.status === "paid"
                          ? "default"
                          : payment.status === "pending"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Revenue Curve */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-playfair flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-lime-500" />
            Monthly Revenue Curve
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#a3e635"
                strokeWidth={4}
                dot={{ fill: "#a3e635", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: "#a3e635", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

function TenantsContent({ tenants, setTenants }) {
  const [editingTenant, setEditingTenant] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewingTenant, setViewingTenant] = useState(null)

  const handleAddTenant = (newTenant) => {
    const tenant = {
      ...newTenant,
      id: Math.max(...tenants.map((t) => t.id)) + 1,
      status: "pending",
      avatar: "/profile-demo.jpg",
    }
    setTenants([...tenants, tenant])
    setIsAddDialogOpen(false)
  }

  const handleEditTenant = (updatedTenant) => {
    setTenants(tenants.map((t) => (t.id === updatedTenant.id ? updatedTenant : t)))
    setEditingTenant(null)
  }

  const handleDeleteTenant = (tenantId) => {
    setTenants(tenants.filter((t) => t.id !== tenantId))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="font-playfair text-2xl font-bold">Tenant Management</h2>
          <p className="text-gray-600 text-sm">Manage all tenant information and status</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-green text-white rounded-2xl px-6 shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Add New Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-playfair">Add New Tenant</DialogTitle>
              <DialogDescription>Enter the details for the new tenant.</DialogDescription>
            </DialogHeader>
            <TenantForm onSubmit={handleAddTenant} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {tenants.map((tenant) => (
          <Card key={tenant.id} className="shadow-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 border-3 border-white shadow-lg">
                    <AvatarImage src={tenant.avatar || "/placeholder.svg"} className="object-cover" />
                    <AvatarFallback className="bg-lime-100 text-lime-700 text-lg">
                      {tenant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-playfair font-semibold text-lg">{tenant.name}</h3>
                    <p className="text-gray-500">Room: {tenant.room}</p>
                    <p className="text-gray-500 text-sm">{tenant.phone}</p>
                    <p className="text-gray-500 text-sm">Check-in: {tenant.checkIn}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Badge
                    variant={
                      tenant.status === "paid" ? "default" : tenant.status === "pending" ? "destructive" : "secondary"
                    }
                    className="rounded-full px-3 py-1"
                  >
                    {tenant.status}
                  </Badge>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full bg-transparent"
                          onClick={() => setViewingTenant(tenant)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="font-playfair">Tenant Details</DialogTitle>
                        </DialogHeader>
                        {viewingTenant && <TenantDetails tenant={viewingTenant} />}
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full bg-transparent"
                          onClick={() => setEditingTenant(tenant)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="font-playfair">Edit Tenant</DialogTitle>
                        </DialogHeader>
                        {editingTenant && <TenantForm tenant={editingTenant} onSubmit={handleEditTenant} />}
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="rounded-full">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the tenant record.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteTenant(tenant.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function TenantForm({ tenant, onSubmit }) {
  const [formData, setFormData] = useState({
    name: tenant?.name || "",
    room: tenant?.room || "",
    phone: tenant?.phone || "",
    email: tenant?.email || "",
    checkIn: tenant?.checkIn || "",
    emergencyContact: tenant?.emergencyContact || "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(tenant ? { ...tenant, ...formData } : formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="room">Room Number</Label>
          <Input
            id="room"
            value={formData.room}
            onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="checkIn">Check-in Date</Label>
          <Input
            id="checkIn"
            value={formData.checkIn}
            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input
            id="emergencyContact"
            value={formData.emergencyContact}
            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
            required
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className="gradient-green text-white">
          {tenant ? "Update Tenant" : "Add Tenant"}
        </Button>
      </DialogFooter>
    </form>
  )
}

function TenantDetails({ tenant }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20 border-3 border-lime-200">
          <AvatarImage src={tenant.avatar || "/placeholder.svg"} className="object-cover" />
          <AvatarFallback className="bg-lime-100 text-lime-700 text-xl">
            {tenant.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-playfair text-xl font-bold">{tenant.name}</h3>
          <p className="text-gray-600">Room {tenant.room}</p>
          <Badge
            variant={tenant.status === "paid" ? "default" : tenant.status === "pending" ? "destructive" : "secondary"}
          >
            {tenant.status}
          </Badge>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium text-gray-500">Phone</Label>
          <p className="font-medium">{tenant.phone}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-500">Email</Label>
          <p className="font-medium">{tenant.email}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-500">Check-in</Label>
          <p className="font-medium">{tenant.checkIn}</p>
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-500">Emergency Contact</Label>
          <p className="font-medium">{tenant.emergencyContact}</p>
        </div>
      </div>
    </div>
  )
}

function RoomsContent({ rooms, setRooms }) {
  const [editingRoom, setEditingRoom] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleAddRoom = (newRoom) => {
    const room = {
      ...newRoom,
      id: Math.max(...rooms.map((r) => r.id)) + 1,
      occupied: 0,
    }
    setRooms([...rooms, room])
    setIsAddDialogOpen(false)
  }

  const handleEditRoom = (updatedRoom) => {
    setRooms(rooms.map((r) => (r.id === updatedRoom.id ? updatedRoom : r)))
    setEditingRoom(null)
  }

  const handleDeleteRoom = (roomId) => {
    setRooms(rooms.filter((r) => r.id !== roomId))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="font-playfair text-2xl font-bold">Room Management</h2>
          <p className="text-gray-600 text-sm">Manage room allocation and capacity</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-green text-white rounded-2xl px-6 shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Add New Room
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-playfair">Add New Room</DialogTitle>
            </DialogHeader>
            <RoomForm onSubmit={handleAddRoom} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <Card key={room.id} className="shadow-card hover:shadow-lg transition-all hover:scale-105">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="bg-lime-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Building className="h-8 w-8 text-lime-600" />
                </div>
                <h3 className="font-playfair text-xl font-bold">{room.number}</h3>
                <p className="text-gray-500">Capacity: {room.capacity} beds</p>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Occupied:</span>
                  <span className="font-semibold">
                    {room.occupied}/{room.capacity}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rent:</span>
                  <span className="font-playfair font-semibold text-lime-600">₹{room.rent.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-lime-500 h-2 rounded-full transition-all"
                    style={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 rounded-full bg-transparent"
                      onClick={() => setEditingRoom(room)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="font-playfair">Edit Room</DialogTitle>
                    </DialogHeader>
                    {editingRoom && <RoomForm room={editingRoom} onSubmit={handleEditRoom} />}
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="flex-1 rounded-full">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Room</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this room? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteRoom(room.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function RoomForm({ room, onSubmit }) {
  const [formData, setFormData] = useState({
    number: room?.number || "",
    capacity: room?.capacity || "",
    rent: room?.rent || "",
    occupied: room?.occupied || 0,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(
      room
        ? { ...room, ...formData, capacity: Number.parseInt(formData.capacity), rent: Number.parseInt(formData.rent) }
        : { ...formData, capacity: Number.parseInt(formData.capacity), rent: Number.parseInt(formData.rent) },
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="number">Room Number</Label>
          <Input
            id="number"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rent">Monthly Rent</Label>
          <Input
            id="rent"
            type="number"
            value={formData.rent}
            onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
            required
          />
        </div>
        {room && (
          <div className="space-y-2">
            <Label htmlFor="occupied">Currently Occupied</Label>
            <Input
              id="occupied"
              type="number"
              value={formData.occupied}
              onChange={(e) => setFormData({ ...formData, occupied: Number.parseInt(e.target.value) })}
              max={formData.capacity}
            />
          </div>
        )}
      </div>
      <DialogFooter>
        <Button type="submit" className="gradient-green text-white">
          {room ? "Update Room" : "Add Room"}
        </Button>
      </DialogFooter>
    </form>
  )
}

function PaymentsContent({ tenants, setTenants }) {
  const handleApprovePayment = (tenantId) => {
    setTenants(tenants.map((t) => (t.id === tenantId ? { ...t, status: "paid" } : t)))
  }

  const handleWhatsAppMessage = (tenant) => {
    const message = `Hi ${tenant.name}, your rent payment is due. Please make the payment at your earliest convenience.`
    window.open(`https://wa.me/${tenant.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-playfair text-2xl font-bold">Payment Management</h2>
        <p className="text-gray-600 text-sm">Track and approve tenant payments</p>
      </div>

      <div className="grid gap-4">
        {tenants.map((tenant) => (
          <Card key={tenant.id} className="shadow-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 border-3 border-white shadow-lg">
                    <AvatarImage src={tenant.avatar || "/placeholder.svg"} className="object-cover" />
                    <AvatarFallback className="bg-lime-100 text-lime-700 text-lg">
                      {tenant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-playfair font-semibold text-lg">{tenant.name}</h3>
                    <p className="text-gray-500">Room: {tenant.room}</p>
                    <p className="text-gray-500 text-sm">Due: 5th of every month</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="text-center sm:text-right">
                    <p className="font-playfair font-bold text-lg">₹5,500</p>
                    <Badge
                      variant={
                        tenant.status === "paid" ? "default" : tenant.status === "pending" ? "destructive" : "secondary"
                      }
                      className="rounded-full px-3 py-1"
                    >
                      {tenant.status}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    {tenant.status === "pending" && (
                      <Button
                        className="gradient-green text-white rounded-full px-4 shadow-lg"
                        onClick={() => handleApprovePayment(tenant.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve Payment
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full bg-transparent"
                      onClick={() => handleWhatsAppMessage(tenant)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function SettingsContent() {
  const [settings, setSettings] = useState({
    hostelName: "Green Valley Hostel",
    address: "123 Main Street, City, State - 123456",
    ownerName: "John Smith",
    razorpayEnabled: false,
    razorpayKey: "",
    razorpaySecret: "",
  })

  const handleSaveSettings = () => {
    alert("Settings saved successfully!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-playfair text-2xl font-bold">Settings</h2>
        <p className="text-gray-600 text-sm">Configure system settings and integrations</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-playfair">Razorpay Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <span className="font-medium">Enable Razorpay</span>
                <p className="text-sm text-gray-500">Accept online payments</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-transparent"
                onClick={() => setSettings({ ...settings, razorpayEnabled: !settings.razorpayEnabled })}
              >
                {settings.razorpayEnabled ? "Enabled" : "Disabled"}
              </Button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="razorpayKey">Razorpay Key</Label>
                <Input
                  id="razorpayKey"
                  type="text"
                  value={settings.razorpayKey}
                  onChange={(e) => setSettings({ ...settings, razorpayKey: e.target.value })}
                  className="rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                  placeholder="Enter Razorpay Key"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="razorpaySecret">Razorpay Secret</Label>
                <Input
                  id="razorpaySecret"
                  type="password"
                  value={settings.razorpaySecret}
                  onChange={(e) => setSettings({ ...settings, razorpaySecret: e.target.value })}
                  className="rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                  placeholder="Enter Razorpay Secret"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-playfair">Hostel Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hostelName">Hostel Name</Label>
              <Input
                id="hostelName"
                type="text"
                value={settings.hostelName}
                onChange={(e) => setSettings({ ...settings, hostelName: e.target.value })}
                className="rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                placeholder="Enter Hostel Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                rows={3}
                placeholder="Enter Hostel Address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerName">Owner Name</Label>
              <Input
                id="ownerName"
                type="text"
                value={settings.ownerName}
                onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
                className="rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                placeholder="Enter Owner Name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">Logo Upload</Label>
              <Input
                id="logo"
                type="file"
                className="rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                accept="image/*"
              />
            </div>
            <Button
              onClick={handleSaveSettings}
              className="w-full gradient-green text-white rounded-2xl py-3 shadow-lg"
            >
              Save Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
