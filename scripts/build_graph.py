import pandas as pd
import networkx as nx

# -----------------------------
# ROUTE DATA COLUMN NAMES
# -----------------------------

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

# -----------------------------
# LOAD ROUTES DATA
# -----------------------------

routes = pd.read_csv(
    "../datasets/routes.dat",
    header=None,
    names=route_columns
)

# -----------------------------
# REMOVE INVALID AIRPORTS
# -----------------------------

routes = routes[
    (routes["source_airport"] != "\\N") &
    (routes["destination_airport"] != "\\N")
]

# -----------------------------
# CREATE GRAPH
# -----------------------------

G = nx.DiGraph()

for _, row in routes.iterrows():

    source = row["source_airport"]
    destination = row["destination_airport"]

    # if route already exists
    if G.has_edge(source, destination):
        G[source][destination]["weight"] += 1

    else:
        G.add_edge(
            source,
            destination,
            weight=1
        )

# -----------------------------
# BASIC GRAPH INFO
# -----------------------------

print("\nGRAPH CREATED SUCCESSFULLY\n")

print("Total Airports (Nodes):", G.number_of_nodes())

print("Total Routes (Edges):", G.number_of_edges())

# -----------------------------
# PAGERANK ANALYSIS
# -----------------------------

pagerank = nx.pagerank(G)

top_airports = sorted(
    pagerank.items(),
    key=lambda x: x[1],
    reverse=True
)

print("\nTOP 10 MOST IMPORTANT AIRPORTS\n")

for airport, score in top_airports[:10]:

    print(
        airport,
        "->",
        round(score, 5)
    )

# ---------------------------------------
# EXPORT TOP AIRPORTS
# ---------------------------------------

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

# keep airports in graph
airports = airports[
    airports["iata"].isin(G.nodes())
]

# add pagerank
airports["importance"] = airports["iata"].map(pagerank)

airports["importance"] = airports["importance"].fillna(0)

# top airports only
airports = airports.sort_values(
    by="importance",
    ascending=False
).head(300)

# export
airports.to_csv(
    "../frontend/public/top_airports.csv",
    index=False
)

print("\nExported top_airports.csv")

# ---------------------------------------
# EXPORT TOP ROUTES
# ---------------------------------------

top_routes = []

for source, destination, data in G.edges(data=True):

    weight = data["weight"]

    top_routes.append({

        "source": source,

        "destination": destination,

        "weight": weight
    })

top_routes = pd.DataFrame(top_routes)

top_routes = top_routes.sort_values(
    by="weight",
    ascending=False
).head(500)

top_routes.to_csv(
    "../frontend/public/top_routes.csv",
    index=False
)

print("Exported top_routes.csv")