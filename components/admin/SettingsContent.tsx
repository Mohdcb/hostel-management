import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SettingsContent: React.FC = () => {
  const [settings, setSettings] = useState({
    hostelName: "Green Valley Hostel",
    address: "123 Main Street, City, State - 123456",
    ownerName: "John Smith",
    razorpayEnabled: false,
    razorpayKey: "",
    razorpaySecret: "",
  });

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

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
  );
};

export default SettingsContent; 