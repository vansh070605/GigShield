"use client";

import { motion } from "framer-motion";
import { Activity, TrendingUp, Wallet, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MetricCard from "@/components/dashboard/MetricCard";
import RiskScore from "@/components/dashboard/RiskScore";
import EarningsChart from "@/components/dashboard/EarningsChart";
import DisruptionAlerts from "@/components/dashboard/DisruptionAlerts";
import PayoutStatus from "@/components/dashboard/PayoutStatus";
import { metricsData, userProfile } from "@/data/mockData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  activity: Activity,
  "trending-up": TrendingUp,
  wallet: Wallet,
  "shield-alert": ShieldAlert,
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                {userProfile.name}
              </span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Here&apos;s your coverage overview for this week.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="bg-teal-500/10 text-teal-400 border-teal-500/20 px-4 py-1.5 rounded-xl"
            >
              {userProfile.activePlan} Plan
            </Badge>
          </div>
        </div>

        {/* Coverage Progress */}
        <div className="mt-6 rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Weekly Coverage Status</span>
            <span className="text-sm font-semibold">{userProfile.coverageStatus}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${userProfile.coverageStatus}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metricsData.map((metric, i) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            change={metric.change}
            changeType={metric.changeType}
            icon={iconMap[metric.icon] || Activity}
            index={i}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Risk Score */}
        <div className="lg:col-span-1">
          <RiskScore score={34} />
        </div>
        {/* Disruption Alerts */}
        <div className="lg:col-span-2">
          <DisruptionAlerts />
        </div>
      </div>

      {/* Payout + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PayoutStatus />
        <EarningsChart />
      </div>
    </div>
  );
}
