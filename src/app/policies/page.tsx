"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, FileText, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiCall } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PoliciesPage() {
  const [policies, setPolicies] = useState<any[]>([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    const fetchPolicies = async () => {
      try {
        const data = await apiCall("/policies");
        setPolicies(data);
      } catch (e: any) {
        toast.error("Failed to load policies");
      }
    };
    fetchPolicies();
  }, [user, router]);

  const handleCancel = async (policyId: number) => {
    try {
      await apiCall(`/policies/${policyId}/cancel`, { method: "PATCH" });
      toast.success("Policy cancelled successfully");
      const data = await apiCall("/policies");
      setPolicies(data);
    } catch (e: any) {
      toast.error("Failed to cancel policy");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Policies</h1>
        <p className="text-muted-foreground">Manage your active insurance policies.</p>
      </motion.div>

      {policies.length === 0 ? (
        <div className="text-center py-20 border border-border/40 rounded-2xl bg-card/50">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold">No Active Policies</h2>
          <p className="text-muted-foreground mt-2 mb-6">You don't have any active coverage plans.</p>
          <Button onClick={() => router.push("/subscription")} className="rounded-xl px-8">
            Get Protected
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((policy) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border/40 bg-card/50 p-6 flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">
                    <FileText className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg capitalize">{policy.subscription_type} Plan</h3>
                    <p className="text-xs text-muted-foreground">ID: POL-{policy.id}</p>
                  </div>
                </div>
                <Badge variant="outline" className={policy.status === "active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}>
                  {policy.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Coverage Region</p>
                  <p className="font-medium">{policy.region}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Max Payout</p>
                  <p className="font-medium">₹{policy.coverage_amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Premium Setup</p>
                  <p className="font-medium text-blue-400">₹{policy.premium_amount} /w</p>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-border/40 flex justify-end">
                {policy.status === "active" && (
                  <Button variant="ghost" onClick={() => handleCancel(policy.id)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                    <XCircle className="h-4 w-4 mr-2" /> Cancel Policy
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
