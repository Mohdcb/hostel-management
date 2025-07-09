import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DollarSign, TrendingUp, Users, Clock, BarChart3, Calendar, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { monthlyData, occupancyData, paymentStatusData, recentPayments } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";

interface DashboardContentProps {
  selectedHostel: any;
  tenants: any[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({ selectedHostel, tenants }) => {
  return (
    <div className="space-y-6">
      {/* Mobile Hostel Indicator */}
      {selectedHostel.id !== 0 && (
        <Card className="lg:hidden shadow-lg border-l-4 border-l-lime-500">
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
      <Card className="bg-gradient-to-r from-lime-400 to-lime-600 text-white shadow-lg relative overflow-hidden">
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
        <Card className="bg-white shadow-lg">
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
        <Card className="bg-white shadow-lg">
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
        <Card className="bg-white shadow-lg sm:col-span-2 lg:col-span-1">
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
      <Card className="shadow-lg">
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
                        .map((n: string) => n[0])
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
        <Card className="shadow-lg lg:col-span-2">
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
        <Card className="shadow-lg">
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
        <Card className="shadow-lg lg:col-span-2">
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
        <Card className="shadow-lg">
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
                          .map((n: string) => n[0])
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
      <Card className="shadow-lg">
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
  );
};

export default DashboardContent; 