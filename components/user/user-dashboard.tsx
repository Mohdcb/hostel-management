"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Upload, History, User, Camera, CheckCircle, Clock, Bell } from "lucide-react"
import { signOut } from "@/lib/supabaseAuth"


interface UserDashboardProps {
  onLogout?: () => void;
}

export function UserDashboard({ onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState("home")

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "upload", label: "Upload", icon: Upload },
    { id: "history", label: "History", icon: History },
    { id: "profile", label: "Profile", icon: User },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeContent />
      case "upload":
        return <UploadContent />
      case "history":
        return <HistoryContent />
      case "profile":
        return <ProfileContent />
      default:
        return <HomeContent />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-xl font-bold text-gray-900">
              {activeTab === "home" && "Dashboard"}
              {activeTab === "upload" && "Upload Payment"}
              {activeTab === "history" && "Payment History"}
              {activeTab === "profile" && "Profile"}
            </h1>
            <p className="text-sm text-gray-500">
              {activeTab === "home" && "Welcome back to your dashboard"}
              {activeTab === "upload" && "Submit your payment proof"}
              {activeTab === "history" && "View all your transactions"}
              {activeTab === "profile" && "Manage your account"}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            <Avatar className="h-10 w-10 border-2 border-lime-200">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback className="bg-lime-100 text-lime-700">JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">{renderContent()}</div>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-6 left-4 right-4">
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
                  className={`flex flex-col items-center space-y-1 px-4 py-3 rounded-2xl transition-all duration-200 ${
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

function HomeContent() {
  return (
    <div className="space-y-6">
      {/* Enhanced Welcome Card - Taller like reference */}
      <Card className="bg-gradient-to-r from-lime-400 to-lime-600 text-white shadow-lg relative overflow-hidden min-h-[200px]">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 400 300" className="w-full h-full">
            <path d="M0,100 Q100,50 200,100 T400,100 L400,300 L0,300 Z" fill="currentColor" opacity="0.3" />
            <path d="M0,150 Q150,100 300,150 T600,150 L600,300 L0,300 Z" fill="currentColor" opacity="0.2" />
          </svg>
        </div>
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-3 border-white/30 shadow-lg">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback className="bg-white/20 text-white text-xl">JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-playfair text-2xl font-bold">Welcome back!</h2>
                <p className="text-green-100 text-lg">John Doe</p>
                <p className="text-green-100 text-sm">Room A-101 • Bed 1</p>
              </div>
            </div>
            <Badge className="bg-black/20 text-white px-3 py-1">Active</Badge>
          </div>

          {/* Bottom Stats Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-2 rounded-xl">
                <Clock className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Due Amount</p>
                <p className="text-gray-900 font-bold text-lg">₹5,500</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-xl">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Paid This Year</p>
                <p className="text-gray-900 font-bold text-lg">₹22,000</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Month Payment */}
      <Card className="shadow-lg border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="font-playfair flex items-center justify-between">
            January 2025 Payment
            <Badge variant="destructive" className="rounded-full">
              Pending
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-3xl font-bold font-playfair text-orange-500">₹5,500</p>
              <p className="text-gray-500 text-sm">Due: 5th January 2025</p>
              <p className="text-red-500 text-xs font-medium mt-1">⚠️ Payment overdue by 2 days</p>
            </div>
            <div className="bg-orange-100 p-4 rounded-2xl">
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <Button className="w-full bg-gradient-to-r from-lime-400 to-lime-600 text-white rounded-2xl py-4 shadow-lg hover:shadow-xl hover:from-lime-500 hover:to-lime-700 transition-all">
            <Upload className="h-5 w-5 mr-2" />
            Upload Payment Proof
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6 text-center">
            <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Home className="h-7 w-7 text-blue-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Room</p>
            <p className="font-bold font-playfair text-lg">A-101</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-6 text-center">
            <div className="bg-green-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-7 w-7 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Check-in</p>
            <p className="font-bold font-playfair text-lg">Sep 2024</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-playfair">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-2xl">
              <div className="bg-green-100 p-3 rounded-2xl">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">December Payment Approved</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-2xl">
              <div className="bg-orange-100 p-3 rounded-2xl">
                <Clock className="h-5 w-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">January Payment Due</p>
                <p className="text-sm text-gray-500">Due in 2 days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function UploadContent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success">("idle")

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      setUploadStatus("uploading")
      // Simulate upload
      setTimeout(() => {
        setUploadStatus("success")
      }, 2000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Current Month Card */}
      <Card className="bg-gradient-to-r from-lime-400 to-lime-600 text-white shadow-lg">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="font-playfair text-2xl font-bold mb-2">January 2025</h2>
            <p className="text-4xl font-bold font-playfair mb-2">₹5,500</p>
            <p className="text-green-100 text-sm">Due: 5th January 2025</p>
            <div className="bg-white/20 rounded-full px-3 py-1 inline-block mt-2">
              <span className="text-sm font-medium">⚠️ Overdue by 2 days</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-playfair">Upload Payment Proof</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {uploadStatus === "success" ? (
            <div className="text-center py-12">
              <div className="bg-green-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
              <h3 className="font-semibold text-xl mb-3">Payment Uploaded Successfully!</h3>
              <p className="text-gray-600 mb-6">Your payment proof has been submitted for approval.</p>
              <Badge className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full">Awaiting Approval</Badge>
            </div>
          ) : (
            <>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-lime-400 transition-colors">
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <p className="text-gray-600 mb-6 text-lg">Upload screenshot of your payment</p>
                <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="file-upload" />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl cursor-pointer hover:bg-gray-200 transition-colors font-medium"
                >
                  Choose File
                </label>
              </div>

              {selectedFile && (
                <div className="bg-lime-50 p-6 rounded-2xl border border-lime-200">
                  <p className="text-sm text-gray-600 mb-2">Selected file:</p>
                  <p className="font-semibold text-lime-700">{selectedFile.name}</p>
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploadStatus === "uploading"}
                className="w-full bg-gradient-to-r from-lime-400 to-lime-600 text-white rounded-2xl py-4 shadow-lg hover:shadow-xl hover:from-lime-500 hover:to-lime-700 transition-all"
              >
                {uploadStatus === "uploading" ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-2" />
                    Submit Payment Proof
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Payment Instructions */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-playfair">Payment Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              "Make payment via UPI, Bank Transfer, or Cash",
              "Take a clear screenshot of the payment confirmation",
              "Upload the screenshot using the form above",
              "Wait for admin approval (usually within 24 hours)",
            ].map((instruction, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-lime-100 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-lime-600 text-sm font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-700 pt-1">{instruction}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function HistoryContent() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-playfair">Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* No payment history available. Replace with Supabase data or show empty state. */}
            <div className="text-center text-gray-400">No payment history available.</div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-lime-400 to-lime-600 text-white shadow-lg">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="font-playfair text-xl font-bold mb-2">Total Paid</h3>
            <p className="text-4xl font-bold font-playfair mb-2">₹22,000</p>
            <p className="text-green-100 text-sm">Last 4 months</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ProfileContent() {
  const handleLogout = async () => {
    try {
      await signOut();
      localStorage.removeItem("userType");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/";
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <div className="text-center">
            <Avatar className="h-28 w-28 mx-auto mb-4 border-4 border-lime-100">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback className="text-3xl bg-lime-100 text-lime-700">JD</AvatarFallback>
            </Avatar>
            <h2 className="font-playfair text-2xl font-bold">John Doe</h2>
            <p className="text-gray-600">Room A-101</p>
            <Button variant="outline" className="mt-4 rounded-2xl px-6 bg-transparent">
              <Camera className="h-4 w-4 mr-2" />
              Edit Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-playfair">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Full Name", value: "John Doe", type: "text" },
            { label: "Phone Number", value: "+91 9876543210", type: "tel" },
            { label: "Email", value: "john.doe@email.com", type: "email" },
            { label: "Emergency Contact", value: "+91 9876543211", type: "tel" },
          ].map((field, index) => (
            <div key={index} className="space-y-2">
              <label className="text-sm font-medium text-gray-600">{field.label}</label>
              <input
                type={field.type}
                className="w-full p-4 border rounded-2xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                defaultValue={field.value}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Room Information */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-playfair">Room Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Room Number", value: "A-101" },
              { label: "Monthly Rent", value: "₹5,500" },
              { label: "Check-in Date", value: "15 Sep 2024" },
              { label: "Bed Number", value: "Bed 1" },
            ].map((info, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-2xl">
                <p className="text-sm text-gray-600 mb-1">{info.label}</p>
                <p className="font-semibold text-lg">{info.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button className="w-full bg-gradient-to-r from-lime-400 to-lime-600 text-white rounded-2xl py-4 shadow-lg hover:shadow-xl hover:from-lime-500 hover:to-lime-700 transition-all">
        Save Changes
      </Button>
      {/* Logout Button */}
      <Button
        variant="outline"
        className="w-full mt-2 rounded-2xl px-6 bg-transparent border-red-400 text-red-600 hover:bg-red-50 hover:border-red-600"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  )
}
