"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Banknote, Calendar } from "lucide-react";
import { payoutInfo } from "@/data/mockData";

export default function PayoutStatus() {
  const isTriggered = payoutInfo.status === "triggered";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={`rounded-2xl border p-6 ${
        isTriggered
          ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500/5 to-teal-500/5"
          : "border-border/40 bg-card/50"
      } backdrop-blur-sm`}
    >
      <h3 className="text-lg font-semibold mb-4">Payout Status</h3>

      <div className="flex items-center gap-4 mb-6">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
            isTriggered
              ? "bg-emerald-500/10 border border-emerald-500/20"
              : "bg-muted border border-border/40"
          }`}
        >
          {isTriggered ? (
            <CheckCircle2 className="h-7 w-7 text-emerald-400" />
          ) : (
            <XCircle className="h-7 w-7 text-muted-foreground" />
          )}
        </div>
        <div>
          <div
            className={`text-lg font-bold ${
              isTriggered ? "text-emerald-400" : "text-muted-foreground"
            }`}
          >
            {isTriggered ? "Payout Triggered" : "Not Triggered"}
          </div>
          <p className="text-sm text-muted-foreground">{payoutInfo.reason}</p>
        </div>
      </div>

      {isTriggered && (
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-background/50 border border-border/30 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Banknote className="h-3.5 w-3.5" />
              Credited Amount
            </div>
            <div className="text-2xl font-bold text-emerald-400">
              ₹{payoutInfo.amount.toLocaleString()}
            </div>
          </div>
          <div className="rounded-xl bg-background/50 border border-border/30 p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Calendar className="h-3.5 w-3.5" />
              Credit Date
            </div>
            <div className="text-lg font-semibold">{payoutInfo.date}</div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
