"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Camera } from "lucide-react";
import { getHostelsByAdmin } from "@/lib/hostelsApi";

const paymentMethods = [
  { label: "Cash", value: "cash" },
  { label: "UPI", value: "upi" },
];

export default function RegisterPage({ params }: { params: { adminId: string } }) {
  const [form, setForm] = useState({
    name: "",
    aadhaarPhoto: null as File | null,
    photo: null as File | null,
    advance: "",
    paymentMethod: "cash",
    paymentScreenshot: null as File | null,
    hostelId: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [aadhaarPreview, setAadhaarPreview] = useState<string | null>(null);
  const [paymentPreview, setPaymentPreview] = useState<string | null>(null);
  const [hostels, setHostels] = useState<any[]>([]);

  useEffect(() => {
    async function fetchHostels() {
      setHostels(await getHostelsByAdmin(params.adminId) || []);
    }
    fetchHostels();
  }, [params.adminId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    if (name === "photo" && files && files[0]) {
      setForm({ ...form, photo: files[0] });
      setPhotoPreview(URL.createObjectURL(files[0]));
    } else if (name === "aadhaarPhoto" && files && files[0]) {
      setForm({ ...form, aadhaarPhoto: files[0] });
      setAadhaarPreview(URL.createObjectURL(files[0]));
    } else if (name === "paymentScreenshot" && files && files[0]) {
      setForm({ ...form, paymentScreenshot: files[0] });
      setPaymentPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="max-w-md w-full shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="bg-lime-100 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Upload className="h-10 w-10 text-lime-600" />
            </div>
            <h2 className="font-playfair text-2xl font-bold mb-2">Registration Submitted</h2>
            <p className="text-gray-600 mb-4">Your registration is under review. You will be notified once approved and assigned a room.</p>
            <Button className="w-full gradient-green text-white rounded-2xl py-3 mt-2" onClick={() => setSubmitted(false)}>
              Register Another Student
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-lg w-full shadow-lg">
        <CardHeader>
          <CardTitle className="font-playfair text-2xl">Student Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="rounded-xl"
                placeholder="Enter your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aadhaarPhoto">Aadhaar Card Photo</Label>
              <Input
                id="aadhaarPhoto"
                name="aadhaarPhoto"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="rounded-xl"
                required
              />
              {aadhaarPreview && (
                <div className="mt-2 flex justify-center">
                  <img src={aadhaarPreview} alt="Aadhaar Preview" className="h-24 rounded-xl border border-lime-200" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <Input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="rounded-xl"
                required
              />
              {photoPreview && (
                <Avatar className="h-20 w-20 mt-2 mx-auto border-2 border-lime-200">
                  <AvatarImage src={photoPreview} />
                  <AvatarFallback className="bg-lime-100 text-lime-700">IMG</AvatarFallback>
                </Avatar>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="hostelId">Select Hostel</Label>
              <select
                id="hostelId"
                name="hostelId"
                value={form.hostelId}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm font-medium"
                required
              >
                <option value="">Choose a hostel</option>
                {hostels.map((hostel) => (
                  <option key={hostel.id} value={hostel.id}>{hostel.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="advance">Advance Amount</Label>
              <Input
                id="advance"
                name="advance"
                type="number"
                value={form.advance}
                onChange={handleChange}
                required
                className="rounded-xl"
                placeholder="Enter advance amount"
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className="w-full p-3 border rounded-xl bg-white focus:ring-2 focus:ring-lime-500 focus:border-transparent text-sm font-medium"
                required
              >
                {paymentMethods.map((method) => (
                  <option key={method.value} value={method.value}>{method.label}</option>
                ))}
              </select>
            </div>
            {form.paymentMethod === "upi" && (
              <div className="space-y-2">
                <Label htmlFor="paymentScreenshot">UPI Payment Screenshot</Label>
                <Input
                  id="paymentScreenshot"
                  name="paymentScreenshot"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="rounded-xl"
                  required
                />
                {paymentPreview && (
                  <div className="mt-2 flex justify-center">
                    <img src={paymentPreview} alt="Payment Screenshot" className="h-24 rounded-xl border border-lime-200" />
                  </div>
                )}
              </div>
            )}
            <Button type="submit" className="w-full bg-gradient-to-r from-lime-400 to-lime-600 text-white rounded-2xl py-4 shadow-lg hover:shadow-xl hover:from-lime-500 hover:to-lime-700 transition-all">
              Submit Registration
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 