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

# =========================================
# WEATHER DISRUPTION SIMULATION
# =========================================

@app.get("/simulate-disruption/{airport_code}")
def simulate_disruption(airport_code: str):

    # ================================
    # GET ALL ROUTES
    # ================================

    routes = list(

        routes_collection.find(

            {},

            {

                "_id": 0
            }
        )
    )

    total_routes = len(routes)

    # ================================
    # FIND DISRUPTED ROUTES
    # ================================

    disrupted_routes = []

    remaining_routes = []

    affected_airports = set()

    for route in routes:

        if (

            route["source"] == airport_code

            or

            route["destination"] == airport_code
        ):

            disrupted_routes.append(route)

            affected_airports.add(

                route["source"]
            )

            affected_airports.add(

                route["destination"]
            )

        else:

            remaining_routes.append(route)

    # ================================
    # CONNECTIVITY LOSS
    # ================================

    routes_removed = len(disrupted_routes)

    loss_percent = round(

        (routes_removed / total_routes) * 100,

        2
    )

    # ================================
    # FIND ALTERNATIVE HUB
    # ================================

    airport_counts = {}

    for route in remaining_routes:

        src = route["source"]

        dst = route["destination"]

        airport_counts[src] = (

            airport_counts.get(src, 0) + 1
        )

        airport_counts[dst] = (

            airport_counts.get(dst, 0) + 1
        )

    alternative_hub = "N/A"

    best_score = -1

    for airport in affected_airports:

        if airport == airport_code:

            continue

        score = airport_counts.get(

            airport,

            0
        )

        if score > best_score:

            best_score = score

            alternative_hub = airport

    return {

    "closed_airport": airport_code,

    "routes_removed": routes_removed,

    "loss_percent": loss_percent,

    "affected_airports": list(affected_airports),

    "alternative_hub": alternative_hub,

    "disrupted_routes": disrupted_routes[:200],

    "rerouting": [

        {
            "flight": "AI202",
            "old_route": f"DEL → {airport_code} → JFK",
            "new_route": f"DEL → {alternative_hub} → JFK"
        },

        {
            "flight": "BA117",
            "old_route": f"LHR → {airport_code} → SIN",
            "new_route": f"LHR → {alternative_hub} → SIN"
        },

        {
            "flight": "EK501",
            "old_route": f"DXB → {airport_code} → SFO",
            "new_route": f"DXB → {alternative_hub} → SFO"
        }
    ]
}