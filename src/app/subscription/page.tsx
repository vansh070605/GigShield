"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { plans } from "@/data/mockData";
import { toast } from "sonner";

const planIcons = [Shield, Zap, Sparkles];

export default function SubscriptionPage() {
  const [activatingPlan, setActivatingPlan] = useState<string | null>(null);

  const handleActivate = (planName: string) => {
    setActivatingPlan(planName);
    setTimeout(() => {
      toast.success(`${planName} plan activated!`, {
        description: "Your coverage is now active. You're protected!",
      });
      setActivatingPlan(null);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Choose Your{" "}
          <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Coverage Plan
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Compare plans and pick the one that best fits your needs. Our AI recommends the plan
          with optimal coverage for your area.
        </p>
      </motion.div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        {plans.map((plan, index) => {
          const PlanIcon = planIcons[index];
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-2xl border p-8 transition-all duration-300 ${
                plan.recommended
                  ? "border-teal-500/50 bg-gradient-to-b from-teal-500/5 to-transparent shadow-xl shadow-teal-500/10"
                  : "border-border/40 bg-card/50 hover:border-border"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-teal-500 to-blue-500 border-0 text-white px-4 py-1 rounded-full">
                    <Sparkles className="h-3 w-3 mr-1" /> AI Recommended
                  </Badge>
                </div>
              )}

              {/* Plan icon */}
              <div className="flex justify-center mb-6">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.color} shadow-lg`}
                >
                  <PlanIcon className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className={`text-4xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}
                  >
                    ₹{plan.price}
                  </span>
                  <span className="text-muted-foreground">/week</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${plan.color} mt-0.5`}
                    >
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleActivate(plan.name)}
                disabled={activatingPlan === plan.name}
                className={`w-full rounded-2xl py-6 font-semibold transition-all ${
                  plan.recommended
                    ? "bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg shadow-teal-500/25 hover:shadow-xl"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {activatingPlan === plan.name ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5 border-2 border-current border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Activate Coverage
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden max-w-4xl mx-auto"
      >
        <div className="p-6 border-b border-border/40">
          <h3 className="text-xl font-semibold">Plan Comparison</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Feature</th>
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    className={`text-center p-4 text-sm font-semibold ${
                      plan.recommended ? "text-teal-400" : ""
                    }`}
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "Weather Coverage", basic: true, standard: true, premium: true },
                { feature: "Government Alerts", basic: false, standard: true, premium: true },
                { feature: "AI Risk Analysis", basic: false, standard: true, premium: true },
                { feature: "Crowd Verification", basic: false, standard: true, premium: true },
                { feature: "Fraud Detection AI", basic: false, standard: false, premium: true },
                { feature: "Real-time Monitoring", basic: false, standard: false, premium: true },
                { feature: "24/7 Support", basic: false, standard: false, premium: true },
                { feature: "Max Payout", basic: "₹1,000", standard: "₹2,500", premium: "₹5,000" },
              ].map((row) => (
                <tr key={row.feature} className="border-b border-border/20">
                  <td className="p-4 text-sm">{row.feature}</td>
                  {(["basic", "standard", "premium"] as const).map((planKey) => (
                    <td key={planKey} className="text-center p-4">
                      {typeof row[planKey] === "boolean" ? (
                        row[planKey] ? (
                          <Check className="h-5 w-5 text-emerald-400 mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )
                      ) : (
                        <span className="text-sm font-medium">{row[planKey]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
