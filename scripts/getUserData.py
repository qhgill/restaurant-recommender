import os
from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
from bson.objectid import ObjectId
from bson.errors import InvalidId

load_dotenv()           # Load environment variables from .env file
app = Flask(__name__)   # Initialize Flask app

# Connect to MongoDB
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
    exit(1)

@app.route('/api/users/<user_id>/preferences', methods=['GET'])
def get_preferences(user_id):
    if user_collection is None:
        return jsonify({"error": "User collection not initialized"}), 500

    try:
        user = user_collection.find_one({"_id": ObjectId(user_id)}, {"preferences": 1})
        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"preferences": user.get("preferences", {})}), 200
    except Exception as e:
        print(f"Error fetching user preferences: {e}")
        return jsonify({"error": "Failed to fetch user preferences"}), 500

@app.route('/api/users/<user_id>/currentLocation', methods=['GET'])
def get_current_location(user_id):
    if user_collection is None:
        return jsonify({"error": "User collection not initialized"}), 500

    try:
        user = user_collection.find_one({"_id": ObjectId(user_id)}, {"currentLocation": 1})
        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify({"currentLocation": user.get("currentLocation", {})}), 200
    except Exception as e:
        print(f"Error fetching user preferences: {e}")
        return jsonify({"error": "Failed to fetch user current location"}), 500


if __name__ == '__main__':
    # Change to 0.0.0.0 if external access is needed
    app.run(host='127.0.0.1', port=5000, debug=True)