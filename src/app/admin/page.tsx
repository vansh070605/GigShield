"use client";

import { motion } from "framer-motion";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Search,
  Eye,
  MapPin,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fraudClaims, clusterData, type FraudClaim } from "@/data/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const trustColors = {
  high: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", label: "High Trust" },
  medium: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", label: "Medium Trust" },
  low: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", label: "Low Trust" },
};

const statusColors = {
  investigating: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  cleared: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  flagged: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" },
};

export default function AdminPage() {
  const flaggedCount = fraudClaims.filter((c) => c.status === "flagged").length;
  const investigatingCount = fraudClaims.filter((c) => c.status === "investigating").length;
  const clearedCount = fraudClaims.filter((c) => c.status === "cleared").length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">
          Fraud{" "}
          <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            Monitoring
          </span>
        </h1>
        <p className="text-muted-foreground">
          AI-powered fraud detection dashboard. Monitor claims and anomalies in real-time.
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Flagged Claims", value: flaggedCount, icon: AlertTriangle, color: "text-red-400", bg: "from-red-500/10 to-red-500/5" },
          { label: "Under Investigation", value: investigatingCount, icon: Search, color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/5" },
          { label: "Cleared Claims", value: clearedCount, icon: CheckCircle2, color: "text-emerald-400", bg: "from-emerald-500/10 to-emerald-500/5" },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`rounded-2xl border border-border/40 bg-gradient-to-br ${card.bg} backdrop-blur-sm p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className={`text-3xl font-bold mt-1 ${card.color}`}>{card.value}</p>
              </div>
              <card.icon className={`h-8 w-8 ${card.color} opacity-60`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Cluster Chart + Claims Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Cluster Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-6"
        >
          <h3 className="text-lg font-semibold mb-6">Claims by Region</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clusterData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="region"
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="hsl(var(--muted-foreground))"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "1rem",
                    fontSize: 13,
                  }}
                />
                <Legend />
                <Bar dataKey="cleared" fill="#10b981" stackId="a" name="Cleared" radius={[0, 0, 0, 0]} />
                <Bar dataKey="investigating" fill="#3b82f6" stackId="a" name="Investigating" />
                <Bar dataKey="flagged" fill="#ef4444" stackId="a" name="Flagged" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Trust Score Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-6"
        >
          <h3 className="text-lg font-semibold mb-6">Anomaly Overview</h3>
          <div className="space-y-4">
            {fraudClaims
              .filter((c) => c.anomalyIndicators.length > 0)
              .map((claim) => {
                const trust = trustColors[claim.trustScore];
                return (
                  <div
                    key={claim.id}
                    className="rounded-xl border border-border/30 bg-background/50 p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{claim.claimantName}</span>
                      <Badge
                        variant="outline"
                        className={`${trust.bg} ${trust.text} ${trust.border} text-xs`}
                      >
                        {trust.label}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {claim.anomalyIndicators.map((indicator) => (
                        <span
                          key={indicator}
                          className="inline-flex items-center gap-1 rounded-lg bg-red-500/5 border border-red-500/10 px-2 py-1 text-xs text-red-400"
                        >
                          <AlertTriangle className="h-3 w-3" />
                          {indicator}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>
      </div>

      {/* Claims Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden"
      >
        <div className="p-6 border-b border-border/40">
          <h3 className="text-lg font-semibold">All Claims</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Claimant</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Region</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Trust Score</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {fraudClaims.map((claim) => {
                const trust = trustColors[claim.trustScore];
                const status = statusColors[claim.status];
                return (
                  <tr key={claim.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-sm font-medium">{claim.claimantName}</td>
                    <td className="p-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {claim.region}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-medium">₹{claim.claimAmount.toLocaleString()}</td>
                    <td className="p-4">
                      <Badge variant="outline" className={`${trust.bg} ${trust.text} ${trust.border} text-xs`}>
                        {trust.label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className={`${status.bg} ${status.text} ${status.border} text-xs capitalize`}>
                        {claim.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{claim.claimDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
