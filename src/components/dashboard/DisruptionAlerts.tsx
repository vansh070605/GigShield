"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloudRain, Landmark, Construction, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { initialAlerts, simulatedAlerts, type DisruptionAlert } from "@/data/mockData";

const typeIcons = {
  weather: CloudRain,
  government: Landmark,
  roadblock: Construction,
};

const severityColors = {
  high: "bg-red-500/10 text-red-400 border-red-500/20",
  medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  low: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const typeColors = {
  weather: "from-blue-500/10 to-cyan-500/10 border-blue-500/20",
  government: "from-purple-500/10 to-pink-500/10 border-purple-500/20",
  roadblock: "from-orange-500/10 to-amber-500/10 border-orange-500/20",
};

export default function DisruptionAlerts() {
  const [alerts, setAlerts] = useState<DisruptionAlert[]>(initialAlerts);
  const [simIndex, setSimIndex] = useState(0);

  // Real-time alert simulation
  useEffect(() => {
    if (simIndex >= simulatedAlerts.length) return;

    const timer = setInterval(() => {
      setAlerts((prev) => [
        { ...simulatedAlerts[simIndex], id: `sim-${Date.now()}` },
        ...prev,
      ]);
      setSimIndex((i) => i + 1);
    }, 8000);

    return () => clearInterval(timer);
  }, [simIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Disruption Alerts</h3>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        <AnimatePresence mode="popLayout">
          {alerts.map((alert) => {
            const Icon = typeIcons[alert.type];
            return (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`rounded-xl border bg-gradient-to-r ${typeColors[alert.type]} p-4`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background/50">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-medium text-sm truncate">{alert.title}</h4>
                      <Badge
                        variant="outline"
                        className={`text-xs shrink-0 ${severityColors[alert.severity]}`}
                      >
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{alert.location}</span>
                      <span>•</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
