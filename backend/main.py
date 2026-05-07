from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from database import (

    airports_collection,

    routes_collection
)

app = FastAPI()

# =========================================
# ENABLE FRONTEND ACCESS
# =========================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)

# =========================================
# ROOT
# =========================================

@app.get("/")
def root():

    return {

        "message":
        "SkyGraph AI Backend Running"
    }

# =========================================
# GET TOP AIRPORTS
# =========================================

@app.get("/top-airports")
def get_top_airports():

    airports = list(

        airports_collection.find(

            {},

            {

                "_id": 0
            }

        )

        .limit(400)
    )

    return airports

# =========================================
# GET ROUTES
# =========================================

@app.get("/routes")
def get_routes():

    # -------------------------------------
    # GET TOP AIRPORT IATA CODES
    # -------------------------------------

    top_airports = list(

        airports_collection.find(

            {},

            {

                "_id": 0,

                "iata": 1
            }

        )

        .limit(400)
    )

    airport_codes = [

        airport["iata"]

        for airport in top_airports
    ]

    # -------------------------------------
    # GET ONLY ROUTES CONNECTED
    # TO THOSE AIRPORTS
    # -------------------------------------

    routes = list(

        routes_collection.find(

            {

                "source": {

                    "$in":
                    airport_codes
                },

                "destination": {

                    "$in":
                    airport_codes
                }
            },

            {

                "_id": 0
            }

        )

        .sort("weight", -1)

        .limit(1200)
    )

    return routes