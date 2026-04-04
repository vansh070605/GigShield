from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_tables
from routes import auth, policies, premiums, claims, events, admin

app = FastAPI(title="GigShield API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://gig-shield-omega.vercel.app"],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
create_tables()

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(policies.router, prefix="/api/policies", tags=["Policies"])
app.include_router(premiums.router, prefix="/api/premiums", tags=["Premiums"])
app.include_router(claims.router, prefix="/api/claims", tags=["Claims"])
app.include_router(events.router, prefix="/api/events", tags=["Events"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])

@app.get("/api/health")
def health_check():
    return {"status": "ok", "version": "1.0.0"}
