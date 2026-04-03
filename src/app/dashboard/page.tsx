"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, TrendingUp, Wallet, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MetricCard from "@/components/dashboard/MetricCard";
import RiskScore from "@/components/dashboard/RiskScore";
import DisruptionAlerts from "@/components/dashboard/DisruptionAlerts";
import PayoutStatus from "@/components/dashboard/PayoutStatus";
import { apiCall } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    
    const fetchDashboardData = async () => {
      try {
        const policies = await apiCall("/policies");
        const claims = await apiCall("/claims");
        setData({ policies, claims });
      } catch (err) {
        console.error("Failed to load dashboard data");
      }
    };
    fetchDashboardData();
  }, [user]);

  if (!user || !data) {
    return <div className="p-8 text-center text-muted-foreground">Loading dashboard...</div>;
  }

  const activePolicy = data.policies.find((p: any) => p.status === "active");
  const claimsTotal = data.claims.reduce((acc: number, c: any) => acc + c.amount, 0);

  const metricsData = [
    { label: "Active Coverage", value: activePolicy ? `₹${activePolicy.coverage_amount}` : "None", change: "Current Limit", changeType: "neutral", icon: "shield-alert" },
    { label: "Premium Paid", value: activePolicy ? `₹${activePolicy.premium_amount}/w` : "₹0", change: "Weekly", changeType: "neutral", icon: "wallet" },
    { label: "Total Claims", value: `₹${claimsTotal}`, change: `${data.claims.length} claims filed`, changeType: "neutral", icon: "activity" },
    { label: "Risk Status", value: user.risk_profile, change: "Determined by AI", changeType: "neutral", icon: "trending-up" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Welcome back, <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">{user.name}</span>
            </h1>
            <p className="text-muted-foreground mt-1">Here is your real-time risk & coverage overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-teal-500/10 text-teal-400 border-teal-500/20 px-4 py-1.5 rounded-xl">
              {activePolicy ? "Protected" : "No Active Policy"}
            </Badge>
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metricsData.map((metric, i) => (
          <div key={metric.label} className="rounded-2xl border border-border/40 bg-card/50 p-6 flex flex-col justify-between">
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="text-2xl font-bold mt-2">{metric.value}</p>
            <p className="text-xs text-muted-foreground mt-1 capitalize">{metric.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <RiskScore score={42} /> {/* ML Risk Score mock component */}
        </div>
        <div className="lg:col-span-2">
          <DisruptionAlerts />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PayoutStatus />
      </div>
    </div>
  );
}
