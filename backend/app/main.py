from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Bhandhavya API",
    description="Backend API for the Bhandhavya platform",
    version="0.1.0",
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Bhandhavya API is running"}
