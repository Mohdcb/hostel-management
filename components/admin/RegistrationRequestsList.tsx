"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegistrationRequestsList() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-playfair">Registration Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Registration requests and fee policies have been removed. Admins should add students
            directly as tenants; login accounts are created from tenants.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
 