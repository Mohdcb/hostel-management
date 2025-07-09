"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Shield, Users, Mail, Lock } from "lucide-react"

interface LoginProps {
  onLogin: (userType: "admin" | "user") => void
}

export function Login({ onLogin }: LoginProps) {
  const [userType, setUserType] = useState<"admin" | "user">("admin")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login delay
    setTimeout(() => {
      setIsLoading(false)
      localStorage.setItem("userType", userType) // Persist login
      onLogin(userType)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header Card */}
        <Card className="mb-6 shadow-lg border-0">
          <CardContent className="p-8 text-center">
            <div className="bg-lime-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-10 w-10 text-lime-600" />
            </div>
            <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-2">Hostel Management</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </CardContent>
        </Card>

        {/* User Type Selection */}
        <div className="flex mb-6 bg-white rounded-2xl p-2 shadow-lg">
          <Button
            type="button"
            variant={userType === "admin" ? "default" : "ghost"}
            onClick={() => setUserType("admin")}
            className={`flex-1 rounded-xl py-3 transition-all ${
              userType === "admin" ? "bg-gradient-to-r from-lime-400 to-lime-600 text-white shadow-lg" : "text-gray-600"
            }`}
          >
            <Shield className="w-4 h-4 mr-2" />
            Admin
          </Button>
          <Button
            type="button"
            variant={userType === "user" ? "default" : "ghost"}
            onClick={() => setUserType("user")}
            className={`flex-1 rounded-xl py-3 transition-all ${
              userType === "user" ? "bg-gradient-to-r from-lime-400 to-lime-600 text-white shadow-lg" : "text-gray-600"
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Tenant
          </Button>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="font-playfair text-xl">
              {userType === "admin" ? "Admin Login" : "Tenant Login"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={userType === "admin" ? "admin@hostel.com" : "tenant@email.com"}
                    className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300 text-lime-600 focus:ring-lime-500" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <Button variant="link" className="p-0 h-auto text-lime-600 hover:text-lime-700">
                  Forgot password?
                </Button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-lime-400 to-lime-600 text-white rounded-2xl py-4 shadow-lg hover:shadow-xl hover:from-lime-500 hover:to-lime-700 transition-all"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  `Sign in as ${userType === "admin" ? "Admin" : "Tenant"}`
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 shadow-lg border-0 bg-blue-50">
          <CardContent className="p-4">
            <p className="text-xs text-blue-700 font-medium mb-2">Demo Credentials:</p>
            <div className="text-xs text-blue-600 space-y-1">
              <p>
                <strong>Admin:</strong> admin@hostel.com / admin123
              </p>
              <p>
                <strong>Tenant:</strong> tenant@email.com / tenant123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
