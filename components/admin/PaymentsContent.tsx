import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, MessageCircle } from "lucide-react";

interface PaymentsContentProps {
  tenants: any[];
  setTenants: React.Dispatch<React.SetStateAction<any[]>>;
}

const PaymentsContent: React.FC<PaymentsContentProps> = ({ tenants, setTenants }) => {
  const handleApprovePayment = (tenantId: number) => {
    setTenants(tenants.map((t: any) => (t.id === tenantId ? { ...t, status: "paid" } : t)));
  };

  const handleWhatsAppMessage = (tenant: any) => {
    const message = `Hi ${tenant.name}, your rent payment is due. Please make the payment at your earliest convenience.`;
    window.open(`https://wa.me/${tenant.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`, "_blank");
  };

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
                        .map((n: string) => n[0])
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
                        tenant.status === "paid"
                          ? "default"
                          : tenant.status === "pending"
                          ? "destructive"
                          : "secondary"
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
  );
};

export default PaymentsContent; 