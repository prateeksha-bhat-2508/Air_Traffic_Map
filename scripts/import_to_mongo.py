import pandas as pd

from pymongo import MongoClient

# =====================================
# CONNECT TO MONGODB
# =====================================

client = MongoClient(

    "mongodb://localhost:27017"
)

db = client["skygraph_ai"]

# collections
airports_collection = db["airports"]

routes_collection = db["routes"]

# =====================================
# LOAD AIRPORTS
# =====================================

airport_columns = [

    "airport_id",
    "name",
    "city",
    "country",
    "iata",
    "icao",
    "latitude",
    "longitude",
    "altitude",
    "timezone",
    "dst",
    "tz_database_timezone",
    "type",
    "source"
]

airports = pd.read_csv(

    "../datasets/airports.dat",

    header=None,

    names=airport_columns
)

# remove invalid airports
airports = airports[
    airports["iata"] != "\\N"
]

# keep useful columns only
airports = airports[[

    "iata",

    "name",

    "city",

    "country",

    "latitude",

    "longitude"
]]

# convert to records
airport_records = airports.to_dict(

    orient="records"
)

# clear old data
airports_collection.delete_many({})

# insert data
airports_collection.insert_many(

    airport_records
)

print(

    f"Inserted {len(airport_records)} airports"
)

# =====================================
# LOAD ROUTES
# =====================================

route_columns = [

    "airline",
    "airline_id",
    "source_airport",
    "source_airport_id",
    "destination_airport",
    "destination_airport_id",
    "codeshare",
    "stops",
    "equipment"
]

routes = pd.read_csv(

    "../datasets/routes.dat",

    header=None,

    names=route_columns
)

# remove invalid routes
routes = routes[

    (routes["source_airport"] != "\\N") &

    (routes["destination_airport"] != "\\N")
]

# keep useful columns
routes = routes[[

    "source_airport",

    "destination_airport"
]]

# aggregate routes
routes = (

    routes.groupby(

        [

            "source_airport",

            "destination_airport"
        ]

    )

    .size()

    .reset_index(name="weight")
)

# rename columns
routes.columns = [

    "source",

    "destination",

    "weight"
]

# convert to records
route_records = routes.to_dict(

    orient="records"
)

# clear old data
routes_collection.delete_many({})

# insert data
routes_collection.insert_many(

    route_records
)

print(

    f"Inserted {len(route_records)} routes"
)

print("\nMongoDB import complete.")