"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface RiskScoreProps {
  score: number;
}

export default function RiskScore({ score }: RiskScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = (s: number) => {
    if (s <= 30) return { stroke: "#10b981", label: "Low Risk", bg: "from-emerald-500/10 to-emerald-500/5" };
    if (s <= 60) return { stroke: "#f59e0b", label: "Medium Risk", bg: "from-amber-500/10 to-amber-500/5" };
    return { stroke: "#ef4444", label: "High Risk", bg: "from-red-500/10 to-red-500/5" };
  };

  const { stroke, label, bg } = getColor(animatedScore);
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl border border-border/40 bg-gradient-to-br ${bg} backdrop-blur-sm p-6 flex flex-col items-center`}
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-4">AI Risk Score</h3>

      <div className="relative">
        <svg width="140" height="140" viewBox="0 0 120 120" className="-rotate-90">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-border/30"
          />
          {/* Progress circle */}
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke={stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-bold"
            style={{ color: stroke }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {animatedScore}
          </motion.span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-sm font-medium"
        style={{ color: stroke }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
