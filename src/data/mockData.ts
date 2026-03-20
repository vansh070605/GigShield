// ==========================================
// MOCK DATA FOR GIG WORKER INSURANCE PLATFORM
// ==========================================

// ---------- Plans ----------
export interface Plan {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  features: string[];
  recommended: boolean;
  color: string;
}

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 30,
    priceLabel: "₹30/week",
    features: [
      "Weather disruption coverage",
      "Basic payout protection",
      "Weekly coverage reports",
      "Email support",
    ],
    recommended: false,
    color: "from-blue-400 to-blue-600",
  },
  {
    id: "standard",
    name: "Standard",
    price: 50,
    priceLabel: "₹50/week",
    features: [
      "Weather + Government alert coverage",
      "Enhanced payout protection",
      "AI-powered risk analysis",
      "Crowd verification access",
      "Priority support",
    ],
    recommended: true,
    color: "from-teal-400 to-teal-600",
  },
  {
    id: "premium",
    name: "Premium",
    price: 80,
    priceLabel: "₹80/week",
    features: [
      "All disruption types covered",
      "Maximum payout protection",
      "Real-time AI risk monitoring",
      "Crowd verification + reporting",
      "Fraud detection AI",
      "24/7 dedicated support",
    ],
    recommended: false,
    color: "from-purple-400 to-purple-600",
  },
];

// ---------- Dashboard ----------
export interface MetricData {
  label: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: string;
}

export const metricsData: MetricData[] = [
  {
    label: "Current Risk Score",
    value: "34",
    change: "-12% from last week",
    changeType: "positive",
    icon: "activity",
  },
  {
    label: "Expected Earnings",
    value: "₹8,500",
    change: "+5% from last week",
    changeType: "positive",
    icon: "trending-up",
  },
  {
    label: "Actual Earnings",
    value: "₹7,200",
    change: "-15% from expected",
    changeType: "negative",
    icon: "wallet",
  },
  {
    label: "Income Loss",
    value: "₹1,300",
    change: "Covered under plan",
    changeType: "neutral",
    icon: "shield-alert",
  },
];

// ---------- Disruption Alerts ----------
export interface DisruptionAlert {
  id: string;
  type: "weather" | "government" | "roadblock";
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  time: string;
  location: string;
}

export const initialAlerts: DisruptionAlert[] = [
  {
    id: "alert-1",
    type: "weather",
    title: "Heavy Rain Warning",
    description: "IMD issues red alert for Mumbai region. Expected 150mm rainfall in next 24 hours.",
    severity: "high",
    time: "2 hours ago",
    location: "Mumbai, Maharashtra",
  },
  {
    id: "alert-2",
    type: "government",
    title: "Road Closure Notice",
    description: "NH-48 closed for maintenance from Km 23 to Km 31 until March 25.",
    severity: "medium",
    time: "5 hours ago",
    location: "Pune, Maharashtra",
  },
  {
    id: "alert-3",
    type: "roadblock",
    title: "Traffic Congestion",
    description: "Major traffic jam reported near Andheri junction due to waterlogging.",
    severity: "low",
    time: "1 hour ago",
    location: "Mumbai, Maharashtra",
  },
];

export const simulatedAlerts: DisruptionAlert[] = [
  {
    id: "alert-sim-1",
    type: "weather",
    title: "Cyclone Warning",
    description: "Cyclonic storm approaching Gujarat coast. High winds expected.",
    severity: "high",
    time: "Just now",
    location: "Ahmedabad, Gujarat",
  },
  {
    id: "alert-sim-2",
    type: "government",
    title: "Curfew Announced",
    description: "Section 144 imposed in parts of Hyderabad from 8 PM to 6 AM.",
    severity: "high",
    time: "Just now",
    location: "Hyderabad, Telangana",
  },
  {
    id: "alert-sim-3",
    type: "roadblock",
    title: "Bridge Under Repair",
    description: "Bandra-Worli Sea Link partially closed for structural inspection.",
    severity: "medium",
    time: "Just now",
    location: "Mumbai, Maharashtra",
  },
];

// ---------- Earnings History ----------
export interface EarningsWeek {
  week: string;
  expected: number;
  actual: number;
  payout: number;
}

export const earningsHistory: EarningsWeek[] = [
  { week: "Week 1", expected: 7500, actual: 7200, payout: 0 },
  { week: "Week 2", expected: 8000, actual: 6500, payout: 1200 },
  { week: "Week 3", expected: 7800, actual: 7800, payout: 0 },
  { week: "Week 4", expected: 8200, actual: 5900, payout: 1800 },
  { week: "Week 5", expected: 8500, actual: 8100, payout: 0 },
  { week: "Week 6", expected: 7900, actual: 7400, payout: 400 },
  { week: "Week 7", expected: 8300, actual: 6800, payout: 1200 },
  { week: "Week 8", expected: 8500, actual: 7200, payout: 1000 },
];

// ---------- Payout ----------
export interface PayoutInfo {
  status: "triggered" | "not_triggered";
  amount: number;
  reason: string;
  date: string;
}

export const payoutInfo: PayoutInfo = {
  status: "triggered",
  amount: 1300,
  reason: "Heavy rain disruption detected in your area",
  date: "March 18, 2026",
};

// ---------- Crowd Reports ----------
export interface CrowdReport {
  id: string;
  location: string;
  type: string;
  description: string;
  reporterCount: number;
  status: "verified" | "pending" | "rejected";
  timestamp: string;
}

export const crowdReports: CrowdReport[] = [
  {
    id: "cr-1",
    location: "Mumbai, Maharashtra",
    type: "Waterlogging",
    description: "Severe waterlogging near Dadar station area",
    reporterCount: 45,
    status: "verified",
    timestamp: "2 hours ago",
  },
  {
    id: "cr-2",
    location: "Delhi, NCR",
    type: "Road Closure",
    description: "Farmers protest blocking NH-44 near Singhu border",
    reporterCount: 23,
    status: "verified",
    timestamp: "4 hours ago",
  },
  {
    id: "cr-3",
    location: "Bangalore, Karnataka",
    type: "Power Outage",
    description: "Power outage in Koramangala affecting deliveries",
    reporterCount: 12,
    status: "pending",
    timestamp: "30 minutes ago",
  },
  {
    id: "cr-4",
    location: "Chennai, Tamil Nadu",
    type: "Flooding",
    description: "Flooding reported in T. Nagar after heavy rains",
    reporterCount: 8,
    status: "pending",
    timestamp: "1 hour ago",
  },
];

export const disruptionTypes = [
  "Waterlogging",
  "Road Closure",
  "Power Outage",
  "Flooding",
  "Protest / Strike",
  "Accident",
  "Natural Disaster",
  "Government Order",
  "Other",
];

// ---------- Fraud Monitoring ----------
export interface FraudClaim {
  id: string;
  claimantName: string;
  region: string;
  claimAmount: number;
  trustScore: "high" | "medium" | "low";
  anomalyIndicators: string[];
  claimDate: string;
  status: "investigating" | "cleared" | "flagged";
}

export const fraudClaims: FraudClaim[] = [
  {
    id: "fc-1",
    claimantName: "Rajesh Kumar",
    region: "Mumbai",
    claimAmount: 2500,
    trustScore: "high",
    anomalyIndicators: [],
    claimDate: "March 15, 2026",
    status: "cleared",
  },
  {
    id: "fc-2",
    claimantName: "Amit Sharma",
    region: "Delhi",
    claimAmount: 4200,
    trustScore: "low",
    anomalyIndicators: [
      "Multiple claims in 48hrs",
      "Location mismatch",
      "No crowd verification",
    ],
    claimDate: "March 16, 2026",
    status: "flagged",
  },
  {
    id: "fc-3",
    claimantName: "Priya Patel",
    region: "Mumbai",
    claimAmount: 1800,
    trustScore: "medium",
    anomalyIndicators: ["Unusual claim time"],
    claimDate: "March 17, 2026",
    status: "investigating",
  },
  {
    id: "fc-4",
    claimantName: "Vikram Singh",
    region: "Bangalore",
    claimAmount: 3100,
    trustScore: "high",
    anomalyIndicators: [],
    claimDate: "March 17, 2026",
    status: "cleared",
  },
  {
    id: "fc-5",
    claimantName: "Suresh Reddy",
    region: "Hyderabad",
    claimAmount: 5500,
    trustScore: "low",
    anomalyIndicators: [
      "Claim exceeds coverage",
      "No disruption event found",
      "Duplicate claim pattern",
    ],
    claimDate: "March 18, 2026",
    status: "flagged",
  },
  {
    id: "fc-6",
    claimantName: "Meera Joshi",
    region: "Pune",
    claimAmount: 2100,
    trustScore: "medium",
    anomalyIndicators: ["Partial crowd verification"],
    claimDate: "March 18, 2026",
    status: "investigating",
  },
  {
    id: "fc-7",
    claimantName: "Arjun Nair",
    region: "Chennai",
    claimAmount: 1500,
    trustScore: "high",
    anomalyIndicators: [],
    claimDate: "March 19, 2026",
    status: "cleared",
  },
  {
    id: "fc-8",
    claimantName: "Deepak Gupta",
    region: "Delhi",
    claimAmount: 6000,
    trustScore: "low",
    anomalyIndicators: [
      "GPS spoofing detected",
      "Multiple device logins",
      "Claim exceeds coverage",
    ],
    claimDate: "March 19, 2026",
    status: "flagged",
  },
];

export interface ClusterData {
  region: string;
  totalClaims: number;
  flagged: number;
  cleared: number;
  investigating: number;
}

export const clusterData: ClusterData[] = [
  { region: "Mumbai", totalClaims: 45, flagged: 5, cleared: 35, investigating: 5 },
  { region: "Delhi", totalClaims: 38, flagged: 12, cleared: 20, investigating: 6 },
  { region: "Bangalore", totalClaims: 28, flagged: 3, cleared: 22, investigating: 3 },
  { region: "Chennai", totalClaims: 22, flagged: 2, cleared: 18, investigating: 2 },
  { region: "Hyderabad", totalClaims: 31, flagged: 8, cleared: 19, investigating: 4 },
  { region: "Pune", totalClaims: 19, flagged: 4, cleared: 12, investigating: 3 },
];

// ---------- User Profile ----------
export const userProfile = {
  name: "Rahul",
  activePlan: "Standard",
  coverageStatus: 72, // percentage
  joinDate: "January 2026",
  totalPayouts: 4800,
  totalWeeks: 12,
};
