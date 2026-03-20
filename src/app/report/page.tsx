"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  AlertTriangle,
  Send,
  CheckCircle2,
  Clock,
  Users,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { crowdReports, disruptionTypes, type CrowdReport } from "@/data/mockData";
import { toast } from "sonner";

const statusConfig = {
  verified: { label: "Verified", icon: CheckCircle2, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  pending: { label: "Pending", icon: Clock, color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  rejected: { label: "Rejected", icon: XCircle, color: "bg-red-500/10 text-red-400 border-red-500/20" },
};

export default function ReportPage() {
  const [location, setLocation] = useState("Mumbai, Maharashtra");
  const [disruptionType, setDisruptionType] = useState("");
  const [description, setDescription] = useState("");
  const [reports, setReports] = useState<CrowdReport[]>(crowdReports);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disruptionType) {
      toast.error("Please select a disruption type");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const newReport: CrowdReport = {
        id: `cr-${Date.now()}`,
        location,
        type: disruptionType,
        description: description || `${disruptionType} reported in ${location}`,
        reporterCount: 1,
        status: "pending",
        timestamp: "Just now",
      };
      setReports([newReport, ...reports]);
      toast.success("Report submitted!", {
        description: "Your disruption report has been received and is being verified.",
      });
      setDisruptionType("");
      setDescription("");
      setSubmitting(false);
    }, 1200);
  };

  const totalReporters = reports.reduce((acc, r) => acc + r.reporterCount, 0);
  const verifiedCount = reports.filter((r) => r.status === "verified").length;

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
          Crowd{" "}
          <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Reporting
          </span>
        </h1>
        <p className="text-muted-foreground">
          Report disruptions in your area to help fellow workers and speed up payouts.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Submit a Report</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Location */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border border-border/40 bg-background/50 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all"
                    placeholder="Enter your location"
                  />
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Type of Disruption
                </label>
                <div className="relative">
                  <AlertTriangle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <select
                    value={disruptionType}
                    onChange={(e) => setDisruptionType(e.target.value)}
                    className="w-full rounded-xl border border-border/40 bg-background/50 pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all appearance-none"
                  >
                    <option value="">Select type</option>
                    {disruptionTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-border/40 bg-background/50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all resize-none"
                  placeholder="Describe the disruption..."
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full rounded-2xl py-6 font-semibold bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg shadow-blue-500/25"
              >
                {submitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Report
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 grid grid-cols-2 gap-4"
          >
            <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-4 text-center">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{totalReporters}</div>
              <div className="text-xs text-muted-foreground">Workers Reporting</div>
            </div>
            <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-4 text-center">
              <CheckCircle2 className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-bold">{verifiedCount}</div>
              <div className="text-xs text-muted-foreground">Verified Reports</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Reports List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Recent Reports</h3>
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {reports.map((report) => {
                  const config = statusConfig[report.status];
                  const StatusIcon = config.icon;
                  return (
                    <motion.div
                      key={report.id}
                      layout
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl border border-border/30 bg-background/50 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{report.type}</span>
                            <Badge
                              variant="outline"
                              className={`text-xs ${config.color}`}
                            >
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {config.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {report.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {report.location}
                            </span>
                            <span>{report.timestamp}</span>
                          </div>
                        </div>
                        <div className="text-center shrink-0">
                          <div className="text-lg font-bold text-blue-400">
                            {report.reporterCount}
                          </div>
                          <div className="text-xs text-muted-foreground">reporters</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
