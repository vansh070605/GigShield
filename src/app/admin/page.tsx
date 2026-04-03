"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Search,
  Eye,
  MapPin,
  Check,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { apiCall } from "@/lib/api";
import { toast } from "sonner";
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

const statusColors: any = {
  investigating: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
  cleared: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
  flagged: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20" },
  pending: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
};

export default function AdminPage() {
  const [stats, setStats] = useState({ flagged: 0, investigating: 0, cleared: 0 });
  const [fraudClaims, setFraudClaims] = useState<any[]>([]);

  const fetchAdminData = async () => {
    try {
      const statsData = await apiCall("/admin/stats");
      const claimsData = await apiCall("/admin/fraud-claims");
      setStats(statsData);
      setFraudClaims(claimsData);
    } catch (e) {
      toast.error("Failed to load admin data");
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleAction = async (claimId: number, action: "approve" | "reject") => {
    try {
      await apiCall(`/admin/claims/${claimId}/status`, {
        method: "PATCH",
        body: JSON.stringify({
          status: action === "approve" ? "approved" : "rejected",
          fraud_flag: action === "approve" ? "cleared" : "flagged"
        })
      });
      toast.success(`Claim ${action === 'approve' ? 'approved' : 'rejected'} successfully.`);
      fetchAdminData();
    } catch (e: any) {
      toast.error(e.message || `Failed to ${action} claim`);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Fraud <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Monitoring</span>
        </h1>
        <p className="text-muted-foreground">Admin panel to manually review flagged and investigated claims.</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Flagged Claims", value: stats.flagged, icon: AlertTriangle, color: "text-red-400", bg: "from-red-500/10 to-red-500/5" },
          { label: "Under Investigation", value: stats.investigating, icon: Search, color: "text-blue-400", bg: "from-blue-500/10 to-blue-500/5" },
          { label: "Cleared Claims", value: stats.cleared, icon: CheckCircle2, color: "text-emerald-400", bg: "from-emerald-500/10 to-emerald-500/5" },
        ].map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`rounded-2xl border border-border/40 bg-gradient-to-br ${card.bg} backdrop-blur-sm p-6`}>
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

      {/* Claims Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="p-6 border-b border-border/40 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Claims Requiring Review</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground w-24">Claim ID</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground w-32">Amount</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground w-1/3">Reason</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status / AI Fraud Level</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">AI Score</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fraudClaims.map((claim) => {
                const fraudStatus = statusColors[claim.fraud_flag] || statusColors.investigating;
                return (
                  <tr key={claim.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                    <td className="p-4 text-sm font-medium">CLM-{claim.id}</td>
                    <td className="p-4 text-sm font-medium">₹{claim.amount.toLocaleString()}</td>
                    <td className="p-4">
                      <p className="text-sm truncate max-w-xs" title={claim.reason}>{claim.reason}</p>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className={`${fraudStatus.bg} ${fraudStatus.text} ${fraudStatus.border} text-xs capitalize`}>
                        {claim.fraud_flag === "cleared" ? "Pending (Cleared by AI)" : claim.fraud_flag}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                       {(claim.fraud_score * 100).toFixed(1)}% Suspicious
                    </td>
                    <td className="p-4 text-right">
                      {claim.status === "pending" || claim.status === "investigating" || claim.status === "flagged" ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" onClick={() => handleAction(claim.id, "approve")} className="bg-emerald-500 hover:bg-emerald-600 text-white gap-1 h-8">
                            <Check className="h-3 w-3" /> Approve
                          </Button>
                          <Button size="sm" onClick={() => handleAction(claim.id, "reject")} variant="destructive" className="gap-1 h-8">
                            <X className="h-3 w-3" /> Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground capitalize">{claim.status}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
              {fraudClaims.length === 0 && (
                <tr>
                   <td colSpan={5} className="p-8 text-center text-muted-foreground">No claims require manual review right now.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
