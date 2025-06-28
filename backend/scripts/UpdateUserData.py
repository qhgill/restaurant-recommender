import os
from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
from bson.objectid import ObjectId

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

# Endpoint to test if server is running
@app.route('/api/test')
def test_server():
    return "Test successful! Server is running."


# Endpoint to create a new user
@app.route('/api/users', methods=['POST'])
def create_user():
    # Colllection not initialized
    if user_collection is None:
        return jsonify({"error": "User collection not initialized"}), 500
    
    user_data = request.get_json() # Get user data from request
    if not user_data:
        return jsonify({"error": "No user data provided"}), 400
    
    # Check fields for user creation
    required_fields = ['username', 'email', 'preferences', 'currentLocation']
    for field in required_fields:
        if field not in user_data:
            return jsonify({"error": f"Missing required field: {field}"}), 400
    
    # Insert user data into the collection
    try:
        result = user_collection.insert_one(user_data)
        return jsonify({"message": "User created successfully", "user_id": str(result.inserted_id)}), 201
    except Exception as e:
        print(f"Error creating user: {e}")
        return jsonify({"error": "Failed to create user"}), 500
    

# Endpoint to update user data
# NOTE: don't use PUT because it replaces the entire document -- slower!
@app.route('/api/users/<user_id>', methods=['PATCH'])
def update_user(user_id):
    # Collection not initialized
    if user_collection is None:
        return jsonify({"error": "User collection not initialized"}), 500
    
    user_data = request.get_json() # Get user data from request
    if not user_data:
        return jsonify({"error": "No user data provided"}), 400
    
    # Update user data in the collection
    try:
        result = user_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": user_data}
        )
        
        if result.matched_count == 0:
            return jsonify({"error": "User not found"}), 404
        
        return jsonify({"message": "User updated successfully"}), 200
    except Exception as e:
        print(f"Error updating user: {e}")
        return jsonify({"error": "Failed to update user"}), 500
    

# Run the Flask app
if __name__ == '__main__':
    # Change to 0.0.0.0 if external access is needed
    app.run(host='127.0.0.1', port=5000, debug=True)