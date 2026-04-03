from fastapi import APIRouter
from schemas.premium import PremiumRequest, PremiumResponse
from services.premium_service import calculate_premium

router = APIRouter()

@router.post("/calculate", response_model=PremiumResponse)
def calculate_premium_endpoint(request: PremiumRequest):
    return calculate_premium(request.location, request.coverage_amount, request.subscription_type)
