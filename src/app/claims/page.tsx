"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiCall } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function ClaimsPage() {
  const [claims, setClaims] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState("");
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        const [claimsData, policiesData] = await Promise.all([
          apiCall("/claims"),
          apiCall("/policies")
        ]);
        setClaims(claimsData);
        setPolicies(policiesData.filter((p: any) => p.status === "active"));
      } catch (e: any) {
        toast.error("Failed to load claims data");
      }
    };
    fetchData();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPolicy) return toast.error("Select a policy");
    setIsSubmitting(true);
    try {
      await apiCall("/claims/manual", {
        method: "POST",
        body: JSON.stringify({
          policy_id: parseInt(selectedPolicy),
          amount: parseFloat(amount),
          reason,
          claim_type: "manual"
        })
      });
      toast.success("Manual claim submitted");
      setReason(""); setAmount("");
      const claimsData = await apiCall("/claims");
      setClaims(claimsData);
    } catch (e: any) {
      toast.error(e.message || "Failed to submit claim");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "pending": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "rejected": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Claims Center</h1>
        <p className="text-muted-foreground">View your automatic payouts and submit manual claims.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div className="lg:col-span-1 rounded-2xl border border-border/40 bg-card/50 p-6">
          <h2 className="text-xl font-bold mb-6">File Manual Claim</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Select Policy</label>
              <select 
                value={selectedPolicy} 
                onChange={e => setSelectedPolicy(e.target.value)}
                className="w-full rounded-xl border border-border/40 bg-background/50 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/40"
              >
                <option value="">Select an active policy</option>
                {policies.map(p => (
                  <option key={p.id} value={p.id}>POL-{p.id} ({p.region})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Claim Amount (₹)</label>
              <input 
                type="number" 
                required 
                value={amount} 
                onChange={e => setAmount(e.target.value)}
                className="w-full rounded-xl border border-border/40 bg-background/50 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Reason</label>
              <textarea 
                required 
                rows={3} 
                value={reason} 
                onChange={e => setReason(e.target.value)}
                className="w-full rounded-xl border border-border/40 bg-background/50 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/40"
              />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full rounded-xl py-6 bg-gradient-to-r from-blue-500 to-teal-500 font-bold">
              {isSubmitting ? "Submitting..." : "Submit Claim"}
            </Button>
          </form>
        </motion.div>
        
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold mb-2">Claim History</h2>
          {claims.length === 0 ? (
            <p className="text-muted-foreground p-8 text-center border border-border/40 rounded-2xl border-dashed">No claims filed yet.</p>
          ) : (
            claims.map(claim => (
              <motion.div key={claim.id} initial={{opacity:0}} animate={{opacity:1}} className="rounded-xl border border-border/40 bg-card/50 p-5 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-bold flex items-center gap-2">
                      {claim.claim_type === 'parametric' ? <CheckCircle className="h-4 w-4 text-emerald-400" /> : <AlertCircle className="h-4 w-4 text-blue-400" />}
                      ₹{claim.amount.toLocaleString()}
                    </span>
                    <Badge variant="outline" className={getStatusColor(claim.status)}>{claim.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{claim.reason}</p>
                  <p className="text-xs text-muted-foreground opacity-60">Type: {claim.claim_type} • Policy ID: {claim.policy_id}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
