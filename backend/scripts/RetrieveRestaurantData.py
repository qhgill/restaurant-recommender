import os
import requests
from flask import Flask, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
from bson.objectid import ObjectId
from bson.errors import InvalidId
import json

# Load environment variables from .env file
load_dotenv()
app = Flask(__name__)  # Initialize Flask app

# Connect to MongoDB
MONGO_CONNECTION_STRING = os.getenv("MONGO_CONNECTION_STRING")
DB_NAME = os.getenv("DB_NAME")
USER_COLLECTION_NAME = os.getenv("USER_COLLECTION_NAME")
GOOGLE_PLACES_API_KEY = os.getenv("GOOGLE_PLACES_API_KEY")

client = None
database = None
user_collection = None

try:
    client = MongoClient(MONGO_CONNECTION_STRING)       # Connect to MongoDB
    database = client[DB_NAME]                          # Select the database
    user_collection = database[USER_COLLECTION_NAME]    # Select the user collection
    print("Connected to MongoDB successfully.")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    exit(1)

# Retrieve user data from Google Places API
def get_restaurant_recommendations(user_data: dict, api_key: str):
    # Extract user preferences and location
    preferences = user_data.get('preferences', {})              # Extract preferences from user data
    cuisine_preferences = preferences.get('cuisine', {})        # Extract cuisines preferences from preferences
    current_location = user_data.get('currentLocation', {})     # Extract current location from user data
    latitude = current_location.get('latitude')                 # Extract latitude from current location
    longitude = current_location.get('longitude')               # Extract longitude from current location

    # Construct query
    preferred_cuisines = [cuisine for cuisine, liked in cuisine_preferences.items() if liked]
    disliked_cuisines = [cuisine for cuisine, liked in cuisine_preferences.items() if not liked] 
    if not preferred_cuisines:
        return None, "No preferred cuisines found in user preferences."

    text_query = " restaurant or ".join(preferred_cuisines) + " restaurant"                     # Construct text query for preferred cuisines
    text_query += " but not " + " or ".join(disliked_cuisines) if disliked_cuisines else ""     # Append disliked cuisines to the text query
    print(f"Text query for restaurant search: {text_query}")

    # Construct the API request URL
    url = 'https://places.googleapis.com/v1/places:searchText'
    params = {
        "textQuery": text_query,
        "locationBias": {
            "circle": {
                "center": {"latitude": latitude, "longitude": longitude},
                "radius": 8046.72
            }
        },
        "maxResultCount": 3
    }
    headers = {
        'Content-Type': 'application/json',
        'X-Goog-API-Key': api_key,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.generativeSummary,places.reviewSummary'
    }

    # DEBUG: Print the request details
    print(f"Sending request to Google Places API...")
    print(f"Payload: {json.dumps(params, indent=2)}")

    # Make the API request
    try:
        response = requests.post(url, json=params, headers=headers)
        results = response.json()

        # DEBUG: Print the response details
        print(f"Received response from Google (Status: {response.status_code})")
        print(f"Response JSON: {json.dumps(results, indent=2)}")

        return results.get('places', []), None # Return the list of places and None for error
    except Exception as e:
        print(f"Error retrieving restaurant recommendations: {e}")
        return None, "An unexpected error occurred while retrieving restaurant recommendations."

# Endpoint to retrieve restaurant recommendations
@app.route('/api/recommendations/<user_id>', methods=['GET'])
def retrieve_recommendations(user_id):
    try:
        user_data = user_collection.find_one({"_id": ObjectId(user_id)})  # Retrieve user data from MongoDB
    except InvalidId:
        return jsonify({"error": "Invalid user ID format"}), 400
    except Exception as e:
        print(f"Error retrieving user data: {e}")
        return jsonify({"error": "Failed to retrieve user data"}), 500
    
    if not user_data:
        return jsonify({"error": "User not found"}), 404
    
    # Get restaurant recommendations
    recommendations, error = get_restaurant_recommendations(user_data, GOOGLE_PLACES_API_KEY)
    if error:
        return jsonify({"error": error}), 500
    if not recommendations:
        return jsonify({"message": "No recommendations found"}), 200
    return jsonify({"recommendations": recommendations}), 200

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)





