"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ElementType;
  index?: number;
}

export default function MetricCard({
  label,
  value,
  change,
  changeType,
  icon: Icon,
  index = 0,
}: MetricCardProps) {
  const changeColors = {
    positive: "text-emerald-400",
    negative: "text-red-400",
    neutral: "text-blue-400",
  };

  const ChangeIcon =
    changeType === "positive"
      ? TrendingUp
      : changeType === "negative"
      ? TrendingDown
      : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-6 hover:border-border/60 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-teal-500/10 border border-blue-500/20">
          <Icon className="h-5 w-5 text-blue-400" />
        </div>
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className={`flex items-center gap-1 text-sm ${changeColors[changeType]}`}>
        <ChangeIcon className="h-4 w-4" />
        <span>{change}</span>
      </div>
    </motion.div>
  );
}
