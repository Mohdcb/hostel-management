"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmail, signUpWithEmail, getCurrentSession, checkUserRole } from "@/lib/supabaseAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserType] = useState<"admin" | "tenant">("admin");
  const router = useRouter();

  // Check for existing session on component mount
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    const { session } = await getCurrentSession();
    if (session?.user) {
      const { role } = await checkUserRole(session.user.id);
      if (role === 'admin') {
        router.push("/admin/dashboard");
      } else if (role === 'tenant') {
        router.push("/user/dashboard");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (isLogin) {
      const { user, error } = await signInWithEmail(email, password);
      if (error) {
        setError(error.message);
      } else if (user) {
        if (user.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      }
    } else {
      const { user, error } = await signUpWithEmail(email, password, userType);
      if (error) {
        setError(error.message);
      } else {
        setIsLogin(true);
        setError("Account created successfully! Please login.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Card */}
        <div className="rounded-lg bg-card text-card-foreground mb-6 shadow-lg border-0">
          <div className="p-8 text-center">
            <div className="bg-lime-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield h-10 w-10 text-lime-600">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              </svg>
            </div>
            <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-2">Hostel Management</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
        </div>

        {/* Role Selection */}
        <div className="flex mb-6 bg-white rounded-2xl p-2 shadow-lg">
          <Button
            type="button"
            variant={userType === "admin" ? "default" : "ghost"}
            onClick={() => setUserType("admin")}
            className="flex-1 rounded-xl py-3 transition-all bg-gradient-to-r from-lime-400 to-lime-600 text-white shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-4 h-4 mr-2">
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            </svg>
            Admin
          </Button>
          <Button
            type="button"
            variant={userType === "tenant" ? "default" : "ghost"}
            onClick={() => setUserType("tenant")}
            className="flex-1 rounded-xl py-3 transition-all text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users w-4 h-4 mr-2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Tenant
          </Button>
        </div>

        {/* Login Form */}
        <div className="rounded-lg bg-card text-card-foreground shadow-lg border-0">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="font-semibold tracking-tight font-playfair text-xl">
              {userType === "admin" ? "Admin Login" : "Tenant Login"}
            </div>
          </div>
          <div className="p-6 pt-0">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye h-4 w-4">
                      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300 text-lime-600 focus:ring-lime-500" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto text-lime-600 hover:text-lime-700"
                >
                  Forgot password?
                </Button>
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-lime-400 to-lime-600 text-white rounded-2xl py-4 shadow-lg hover:shadow-xl hover:from-lime-500 hover:to-lime-700 transition-all"
                disabled={loading}
              >
                {loading ? "Loading..." : `Sign in as ${userType === "admin" ? "Admin" : "Tenant"}`}
              </Button>
            </form>
          </div>
        </div>


      </div>
    </div>
  );
}
