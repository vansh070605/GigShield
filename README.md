<div align="center">
  <h1>🛡️ GigShield AI</h1>
  <p><strong>Parametric Insurance Platform for Gig Workers</strong></p>
  <p>Providing income security to the backbone of the delivery economy through automated, data-driven micro-insurance.</p>
</div>

---

## 🚨 The Problem: Income Insecurity in the Gig Economy

Gig workers—delivery partners for food delivery, ride-sharing, and logistics platforms—face massive income volatility. A sudden downpour, a minor accident, or a temporary marketplace ban can easily erase a full day of earnings. 

Traditional insurance is fundamentally incompatible with the gig economy:
- **Too Slow**: Claims take weeks or months to process.
- **Too Complex**: High paperwork overhead and manual claim adjustment processes.
- **Wrong Coverage**: Standard auto or health policies don't cover micro-losses, like missing a daily earnings target due to extreme weather or minor vehicular breakdowns.

## 💡 Our Solution: GigShield AI

**GigShield AI** is an end-to-end, fully automated **Parametric Insurance Platform** tailored specifically for gig and delivery workers. Instead of waiting for claims adjusters, our platform relies on real-time data integrations corresponding to predefined parameters (e.g., weather APIs, traffic data) to initiate instant payouts the moment an adverse event occurs.

### ⚙️ How It Works Behind the Scenes

The platform is designed around three core AI and automation engines that run in the FastAPI backend:

#### 1. ML-Powered Dynamic Premium Engine
We do not use flat insurance rates. Premiums and subscription costs are calculated dynamically based on real-time risk assessment:
- **Data Points Evaluated**: `location_risk`, `weather_risk`, and `historical_risk`.
- **Logic**: The platform computes a localized risk multiplier (baselined via simulated `scikit-learn` algorithms) applying variations on a 1% base rate of the coverage amount.
- **Outcome**: A gig worker in a high-rain density area might pay a slightly varied premium compared to a worker in a sunnier locale, ensuring fair, mathematically-backed pricing.

#### 2. The Parametric Claim Engine (Auto-Payouts)
The defining feature of GigShield. 
- **Trigger**: An `Event` (e.g., heavy rain, marketplace outage) is registered in a specific `region`.
- **Execution**: The system queries the PostgreSQL database for all `active` policies in that target region.
- **Resolution**: An automated claim is instantly generated for those workers, bypassing fraud checks, with an immediate **20% payout of their coverage amount**. No paperwork. No waiting.

#### 3. AI Fraud Detection for Hybrid Claims
Gig workers can still file *manual* claims for edge cases (e.g., specific vehicular breakdowns not captured by global triggers).
- **Process**: When a manual claim is submitted, it passes through our AI Fraud Service.
- **Detection Mechanism**: Evaluates claim amount thresholds alongside randomized anomaly scoring. Flagged anomalies (e.g., score > 0.8 or claims > $5000) automatically mark the claim as `flagged` or `investigating`, while standard claims are instantly `cleared`.

---

## 🏗️ Core Architecture & Tech Stack

The application is built vertically, ensuring high-performance, real-time data fetching, and fluid interactions.

### Frontend: Client-Side Excellence
- **Next.js 15+** (App Router) & **React 19**: Providing server-side rendering and hyper-fast route handling.
- **Tailwind CSS v4 & Framer Motion**: Sleek, glass-like UI, micro-animations, and fluid transitions (liquid aesthetics).
- **Recharts**: For in-dashboard visualizations of policy coverages and risk metrics.
- **JWT Authentication**: Securely storing session states without persisting bulky cookies.

### Backend: Scalable & Performant
- **FastAPI (Python)**: High-performance routing, dependency injection for DB sessions, and async capabilities.
- **Relational Data Mapping (SQLAlchemy)**: Strictly modeled entities (`User`, `Policy`, `Claim`, `Event`) enforcing data integrity.
- **PostgreSQL**: Serving as the rigid, relational spinal cord for all financial and policy interactions.
- **Modular Services Pattern**: Clean separation of `premium_service`, `claims_service`, `event_service`, and `fraud_service` for high maintainability.

---

## 🚀 Step-by-Step Instructions to Run Locally

### 1. Setup Backend
1. Open a new terminal and navigate to the `backend` directory.
   ```bash
   cd backend
   ```
2. Activate the virtual environment (created during setup):
   - **Windows**: `.\venv\Scripts\activate`
   - **Mac/Linux**: `source venv/bin/activate`
3. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```
   *The backend will run on `http://localhost:8000`. It connects to a `gigshield` PostgreSQL database seeded with our initial dataset.*

### 2. Setup Frontend
1. Open a **second** terminal and ensure you are in the project root (`GigShield`).
2. Run the Next.js development server:
   ```bash
   npm run dev
   ```
   *The frontend will start on `http://localhost:3000`.*

### 3. Using the App
1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Click **Login** and use the pre-seeded demo account:
   - **Email:** `test@gigshield.com`
   - **Password:** `password123`
3. Explore the platform:
   - **Dashboard**: Securely loads data from the backend.
   - **Subscribe**: Browse and select a parametric policy plan.
   - **Policies**: View active subscriptions.
   - **Claims**: Monitor parametric auto-triggers or file manual claims.

<br/>
<div align="center">
  <p>Built for the future of work. Everything works end-to-end natively!</p>
</div>
