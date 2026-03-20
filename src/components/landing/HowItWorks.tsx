"use client";

import { motion } from "framer-motion";
import { UserPlus, CalendarCheck, Brain, Banknote } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Register",
    description: "Create your account in under 2 minutes with basic details and ID verification.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: CalendarCheck,
    title: "Activate Weekly Plan",
    description: "Choose a coverage plan that fits your income level. Pay weekly, cancel anytime.",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Brain,
    title: "AI Monitors Disruptions",
    description: "Our AI continuously scans weather, government alerts, and crowd data in your area.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Banknote,
    title: "Automatic Payout",
    description: "When a disruption is verified, your compensation is credited automatically within hours.",
    color: "from-emerald-500 to-emerald-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            How It{" "}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Get protected in 4 simple steps. No paperwork, no waiting — just smart, automated coverage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[calc(100%-20%)] h-px bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="flex flex-col items-center text-center">
                {/* Step number + icon */}
                <div className="relative mb-6">
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}
                  >
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-background border-2 border-border text-xs font-bold">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
