"use client";

import { motion } from "framer-motion";
import { CloudRain, Landmark, Users, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: CloudRain,
    title: "Weather Detection",
    description:
      "Real-time monitoring of severe weather events that could impact your work area and earnings.",
    gradient: "from-blue-500/10 to-cyan-500/10",
    borderColor: "border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Landmark,
    title: "Government Alerts",
    description:
      "Instant tracking of government restrictions, curfews, and road closures affecting your routes.",
    gradient: "from-purple-500/10 to-pink-500/10",
    borderColor: "border-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: Users,
    title: "Crowd Verification",
    description:
      "Community-powered disruption reporting. Workers verify each other's reports for faster payouts.",
    gradient: "from-teal-500/10 to-emerald-500/10",
    borderColor: "border-teal-500/20",
    iconColor: "text-teal-400",
  },
  {
    icon: ShieldCheck,
    title: "Fraud Detection AI",
    description:
      "Advanced machine learning models detect suspicious patterns and protect the community from fraud.",
    gradient: "from-orange-500/10 to-amber-500/10",
    borderColor: "border-orange-500/20",
    iconColor: "text-orange-400",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            Intelligent{" "}
            <span className="bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform uses multiple data sources to protect your income accurately and fairly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`group relative rounded-2xl border ${feature.borderColor} bg-gradient-to-br ${feature.gradient} backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-xl cursor-default`}
            >
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-background/80 border border-border/50 mb-5 ${feature.iconColor}`}>
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
