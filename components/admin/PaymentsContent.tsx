import React, { useContext, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, MessageCircle } from "lucide-react";
import { updatePayment } from "@/lib/paymentsApi";
import { HostelContext } from "@/app/admin/layout";

interface PaymentsContentProps {
  payments: any[];
  setPayments: React.Dispatch<React.SetStateAction<any[]>>;
  tenants: any[];
  setTenants: React.Dispatch<React.SetStateAction<any[]>>;
}

const PaymentsContent: React.FC<PaymentsContentProps> = ({ payments, setPayments, tenants, setTenants }) => {
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const { selectedHostel } = useContext(HostelContext);

  const filteredPayments = useMemo(() => {
    if (!selectedHostel) return payments;
    return payments.filter((payment) => String(payment.hostel_id) === String(selectedHostel.id));
  }, [payments, selectedHostel]);

  const tenantLookup = useMemo(() => {
    if (!selectedHostel) {
      return tenants.reduce<Record<string, any>>((acc, tenant) => {
        acc[String(tenant.id)] = tenant;
        return acc;
      }, {});
    }

    return tenants
      .filter((tenant) => String(tenant.hostel_id) === String(selectedHostel.id))
      .reduce<Record<string, any>>((acc, tenant) => {
        acc[String(tenant.id)] = tenant;
        return acc;
      }, {});
  }, [tenants, selectedHostel]);
  const handleApprovePayment = async (paymentId: string) => {
    setActionLoading(paymentId);
    try {
      const updated = await updatePayment(paymentId, { status: "paid" });
      setPayments(payments.map((p: any) => (p.id === paymentId ? updated : p)));
    } catch (err) {
      // Optionally show error
    } finally {
      setActionLoading(null);
    }
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
        {filteredPayments.map((payment) => {
          const tenant = tenantLookup[String(payment.tenant_id)];
          return (
            <Card key={payment.id} className="shadow-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16 border-3 border-white shadow-lg">
                      <AvatarImage src="/placeholder.svg" className="object-cover" />
                      <AvatarFallback className="bg-lime-100 text-lime-700 text-lg">
                        {tenant?.name?.split(" ").map((n: string) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-playfair font-semibold text-lg">{tenant?.name || "Unknown Tenant"}</h3>
                      <p className="text-gray-500">Room: {tenant?.room || "-"}</p>
                      <p className="text-gray-500 text-sm">Due: {payment.date || "-"}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="text-center sm:text-right">
                      <p className="font-playfair font-bold text-lg">₹{payment.amount?.toLocaleString()}</p>
                      <Badge
                        variant={
                          payment.status === "paid"
                            ? "default"
                            : payment.status === "pending"
                            ? "destructive"
                            : "secondary"
                        }
                        className="rounded-full px-3 py-1"
                      >
                        {payment.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      {payment.status === "pending" && (
                        <Button
                          className="gradient-green text-white rounded-full px-4 shadow-lg"
                          onClick={() => handleApprovePayment(payment.id)}
                          disabled={actionLoading === payment.id}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          {actionLoading === payment.id ? "Approving..." : "Approve Payment"}
                        </Button>
                      )}
                      {tenant && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full bg-transparent"
                          onClick={() => handleWhatsAppMessage(tenant)}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          WhatsApp
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentsContent; 