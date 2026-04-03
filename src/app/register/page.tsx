"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, User, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { apiCall } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    role: "user",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await apiCall("/auth/register", {
        method: "POST",
        body: JSON.stringify({ ...formData, risk_profile: "medium" }),
      });

      toast.success("Registration successful! Please login.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 rounded-3xl border border-border/40 bg-card/50 p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-teal-400 shadow-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight">Create an account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join thousands of protected gig workers
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-border/40 bg-background/50 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                placeholder="Full Name"
              />
            </div>
          </div>
          
          <div>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-border/40 bg-background/50 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-border/40 bg-background/50 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative mt-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <select
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded-xl border border-border/40 bg-background/50 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/40 appearance-none text-sm"
              >
                <option value="" disabled>Select region</option>
                <option value="Mumbai Central">Mumbai Central</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Bangalore South">Bangalore South</option>
                <option value="Hyderabad East">Hyderabad East</option>
                <option value="Chennai North">Chennai North</option>
                <option value="Pune West">Pune West</option>
              </select>
            </div>
            <div className="relative mt-1">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <select
                name="occupation"
                required
                value={formData.occupation}
                onChange={handleChange}
                className="w-full rounded-xl border border-border/40 bg-background/50 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/40 appearance-none text-sm"
              >
                <option value="" disabled>Select occupation</option>
                <option value="Delivery Partner">Delivery Partner</option>
                <option value="Ride-share Driver">Ride-share Driver</option>
                <option value="Courier">Courier</option>
                <option value="Food Delivery">Food Delivery</option>
              </select>
            </div>
          </div>
          
          <div>
            <div className="relative mt-1">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <select
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="w-full rounded-xl border border-border/40 bg-background/50 pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/40 appearance-none text-sm"
              >
                <option value="user">User / Gig Worker</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl py-6 mt-4 font-semibold bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg hover:shadow-xl transition-all"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-blue-400 hover:text-blue-300">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
