import os
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.errors import InvalidId

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# MongoDB connection
MONGO_CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")
DB_NAME = os.getenv("DB_NAME")
USER_COLLECTION_NAME = os.getenv("USER_COLLECTION_NAME")

client = None
database = None
user_collection = None

try:
    client = MongoClient(MONGO_CONNECTION_STRING)
    database = client[DB_NAME]
    user_collection = database[USER_COLLECTION_NAME]
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    raise SystemExit(1)

@app.get("/api/users/{user_id}/preferences")
async def get_preferences(user_id: str):
    if user_collection is None:
        raise HTTPException(status_code=500, detail="User collection not initialized")
    
    try:
        user = user_collection.find_one({"_id": ObjectId(user_id)}, {"preferences": 1})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return {"preferences": user.get("preferences", {})}
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    except Exception as e:
        print(f"Error fetching user preferences: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch user preferences")

@app.get("/api/users/{user_id}/currentLocation")
async def get_current_location(user_id: str):
    if user_collection is None:
        raise HTTPException(status_code=500, detail="User collection not initialized")

    try:
        user = user_collection.find_one({"_id": ObjectId(user_id)}, {"currentLocation": 1})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return {"currentLocation": user.get("currentLocation", {})}
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid user ID format")
    except Exception as e:
        print(f"Error fetching user current location: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch user current location")