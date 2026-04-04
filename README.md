<div align="center">
  <h1>🛡️ GigShield AI</h1>
  <p><strong>Parametric Insurance Platform for Gig Workers</strong></p>
  <p>Providing income security to the backbone of the delivery economy through automated, data-driven micro-insurance.</p>
</div>

---

## 🚨 The Problem: Income Insecurity in the Gig Economy

Gig workers—delivery partners for food delivery, ride-sharing, and logistics—face significant income volatility. A sudden downpour, a minor accident, or a temporary marketplace ban can easily erase a full day of earnings. 

Traditional insurance is fundamentally incompatible with the gig economy:
- **Too Slow**: Claims take weeks or months to process.
- **Too Complex**: High paperwork overhead and manual claim adjustment processes.
- **Wrong Coverage**: Standard policies don't cover micro-losses like missing a daily earnings target due to extreme weather or minor vehicle breakdowns.

## 💡 Our Solution: GigShield AI

**GigShield AI** is a fully automated **Parametric Insurance Platform** tailored specifically for gig and delivery workers. Instead of waiting for adjusters, we use real-time data triggers to initiate instant payouts when a negative event occurs.

### ✨ Key Features

- 🤖 **ML-Powered Dynamic Premiums**: Our platform leverages `scikit-learn` models to calculate fair, personalized premium rates dynamically based on risk factors, operating area, and historical delivery statistics.
- ⚡ **Parametric Engine (Auto-Payouts)**: Pre-agreed conditions (e.g., "Heavy Rainfall (>20mm) during a shift") automatically trigger payouts to the worker's account—no claims adjuster required.
- 🔐 **Secure & Fast Authentication**: Robust JWT-based authentication for secure user sessions.
- 📊 **Real-time Dashboard**: A sleek, full-stack Next.js frontend giving workers a transparent, responsive view of their active policies, historical claims, and auto-triggers.
- 📝 **Hybrid Claim Management**: Support for both automated parametric payouts and easy-to-file manual claims for edge cases.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15+, React 19, Tailwind CSS v4, Framer Motion, Recharts, Shadcn UI
- **Backend**: FastAPI (Python), JWT Auth
- **AI & Data Science**: scikit-learn
- **Database**: PostgreSQL

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
