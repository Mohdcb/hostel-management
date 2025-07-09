"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserDashboard } from "@/components/user/user-dashboard"
import { Login } from "@/components/auth/login"

export default function HomePage() {
  const [userType, setUserType] = useState<"admin" | "user" | null>(null)
  const router = useRouter();

  useEffect(() => {
    const storedType = localStorage.getItem("userType")
    if (storedType === "admin" || storedType === "user") {
      setUserType(storedType)
    }
  }, [])

  useEffect(() => {
    if (userType === "admin") {
      router.push("/admin/dashboard");
    } else if (userType === "user") {
      // You can create a /user/dashboard route and redirect here if needed
      // router.push("/user/dashboard");
    }
  }, [userType, router])

  const handleLogin = (type: "admin" | "user") => {
    setUserType(type)
  }

  const handleLogout = () => {
    localStorage.removeItem("userType")
    setUserType(null)
  }

  // Only render Login here; dashboard pages are now routed
  return <Login onLogin={handleLogin} />
}
