# GigShield AI

GigShield AI is a parametric insurance platform for gig workers (delivery partners). This MVP features a completely integrated stack with a Next.js Full Stack Frontend, FastAPI backend, PostgreSQL Database, ML Models for Premium Calculation (scikit-learn), and fully working JWT Authentication, Policy creation, and Claims management!

## Step-by-Step Instructions to Run Locally

### 1. Setup Backend
1. Open a new terminal and navigate to the `backend` directory.
   ```bash
   cd backend
   ```
2. Activate the virtual environment (created during setup):
   ```bash
   .\venv\Scripts\activate
   ```
3. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   *The backend will run on http://localhost:8000. It is connected to the `gigshield` PostgreSQL database which we have already seeded with test data.*

### 2. Setup Frontend
1. Open a **second** terminal and ensure you are in the root directory (`GigShield`).
2. Run the Next.js development server:
   ```bash
   npm run dev
   ```
   *The frontend will start on http://localhost:3000.*

### 3. Using the App
1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. Click **Login** and use the seeded account:
   - **Email:** `test@gigshield.com`
   - **Password:** `password123`
3. Check out the **Dashboard** which securely fetches data from the backend.
4. Go to **Subscribe** to select a parametric policy plan.
5. Visit **Policies** to see your active subscriptions.
6. Visit **Claims** to see parametric payouts (auto-triggers) or to file a manual claim.

Everything works end-to-end natively! Real database, real JWT Auth, real API connections! Enjoy!
