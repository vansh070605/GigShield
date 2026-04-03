"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Shield, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiCall } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SubscriptionPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activatingPlan, setActivatingPlan] = useState<string | null>(null);

  const plans = [
    { name: "Basic", price: 30, coverage: 1000, features: ["Weather disruption", "Basic payout"], recommended: false, color: "from-blue-400 to-blue-600" },
    { name: "Standard", price: 50, coverage: 2500, features: ["Weather + Govt Alerts", "Enhanced payout", "AI risk analysis"], recommended: true, color: "from-teal-400 to-teal-600" },
    { name: "Premium", price: 80, coverage: 5000, features: ["All disruptions", "Max payout", "Real-time AI", "Fraud protection"], recommended: false, color: "from-purple-400 to-purple-600" }
  ];

  const handleActivate = async (plan: any) => {
    if (!user) {
      toast.error("Please login to subscribe");
      return router.push("/login");
    }
    setActivatingPlan(plan.name);
    try {
      await apiCall("/policies", {
        method: "POST",
        body: JSON.stringify({
          coverage_amount: plan.coverage,
          region: user.location,
          subscription_type: "weekly",
          premium_amount: plan.price
        })
      });
      toast.success(`${plan.name} plan activated successfully!`);
      router.push("/policies");
    } catch (e: any) {
      toast.error(e.message || "Failed to create policy");
    } finally {
      setActivatingPlan(null);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Choose Your <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Coverage Plan</span></h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Select a parametric insurance plan that covers your location automatically.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl border p-8 hover:-translate-y-2 transition-transform duration-300 ${plan.recommended ? "border-teal-500/50 bg-teal-500/5 shadow-xl shadow-teal-500/10" : "border-border/40 bg-card/50"}`}
          >
            {plan.recommended && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-500 to-blue-500 border-0 text-white"><Sparkles className="h-3 w-3 mr-1" /> Recommended</Badge>
            )}
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center gap-1">
                <span className={`text-4xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>₹{plan.price}</span>
                <span className="text-muted-foreground">/week</span>
              </div>
            </div>
            <ul className="space-y-4 mb-8">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className={`flex h-5 w-5 rounded-full bg-gradient-to-r ${plan.color} items-center justify-center shrink-0`}>
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>
            <Button onClick={() => handleActivate(plan)} disabled={activatingPlan === plan.name} className={`w-full rounded-2xl py-6 font-bold ${plan.recommended ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white' : 'bg-secondary'}`}>
              {activatingPlan === plan.name ? "Activating..." : "Activate Coverage"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
