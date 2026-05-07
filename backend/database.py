from pymongo import MongoClient

# =====================================
# MONGODB CONNECTION
# =====================================

client = MongoClient(

    "mongodb://localhost:27017"
)

db = client["skygraph_ai"]

# collections
airports_collection = db["airports"]

routes_collection = db["routes"]