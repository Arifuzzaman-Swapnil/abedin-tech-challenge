# app/main.py
from fastapi import FastAPI
from app.routes import posts, designs, analytics    # ✅ designs import করো
from app.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Abedin Tech Backend")
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      # কোন কোন origin থেকে request আসতে দেবে
    allow_credentials=True,
    allow_methods=["*"],        # সব method allow
    allow_headers=["*"],        # সব header allow
)
# Routes
app.include_router(posts.router, prefix="/posts", tags=["Posts"])
app.include_router(designs.router, prefix="/designs", tags=["Designs"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])

@app.get("/")
def root():
    return {"message": "Welcome to Abedin Tech Backend API 🚀"}
