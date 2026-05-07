import pandas as pd
import networkx as nx
import plotly.graph_objects as go

# ---------------------------------------------------
# LOAD AIRPORT DATA
# ---------------------------------------------------

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

# ---------------------------------------------------
# LOAD ROUTES DATA
# ---------------------------------------------------

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

routes = routes[
    (routes["source_airport"] != "\\N") &
    (routes["destination_airport"] != "\\N")
]

# ---------------------------------------------------
# BUILD GRAPH
# ---------------------------------------------------

G = nx.DiGraph()

for _, row in routes.iterrows():

    source = row["source_airport"]
    destination = row["destination_airport"]

    if G.has_edge(source, destination):
        G[source][destination]["weight"] += 1
    else:
        G.add_edge(source, destination, weight=1)

# ---------------------------------------------------
# PAGERANK
# ---------------------------------------------------

pagerank = nx.pagerank(G)

# ---------------------------------------------------
# FILTER AIRPORTS
# ---------------------------------------------------

# ---------------------------------------------------
# FILTER AIRPORTS
# ---------------------------------------------------

airports = airports[
    airports["iata"].isin(G.nodes())
]

# importance scores
airports["importance"] = airports["iata"].map(pagerank)

airports["importance"] = airports["importance"].fillna(0)

# ---------------------------------------------------
# KEEP ONLY TOP AIRPORTS
# ---------------------------------------------------

airports = airports.sort_values(
    by="importance",
    ascending=False
).head(200)

# ---------------------------------------------------
# BETTER SIZE SCALING
# ---------------------------------------------------

airports["size"] = (
    airports["importance"] ** 0.5
) * 2000

# ---------------------------------------------------
# CREATE FIGURE
# ---------------------------------------------------

fig = go.Figure()

# ---------------------------------------------------
# AIRPORT NODES
# ---------------------------------------------------

fig.add_trace(

    go.Scattergeo(

        lon=airports["longitude"],

        lat=airports["latitude"],

        text=(
            airports["name"]
            + "<br>"
            + airports["country"]
        ),

        mode="markers",

        hoverinfo="text",

        marker=dict(

            size=airports["size"],

            color="#00d9ff",

            opacity=0.85,

            line=dict(
                width=0
            )
        )
    )
)

# ---------------------------------------------------
# LAYOUT
# ---------------------------------------------------

fig.update_layout(

    title=dict(

        text="SKYGRAPH AI",
        x=0.5,
        font=dict(
            size=28,
            color="white"
        )
    ),

    paper_bgcolor="#050816",

    plot_bgcolor="#050816",

    geo=dict(

        projection_type="natural earth",

        bgcolor="#050816",

        showland=True,

        landcolor="#0b1220",

        showocean=True,

        oceancolor="#050816",

        showcountries=False,

        showcoastlines=False
    ),

    margin=dict(
        l=0,
        r=0,
        t=60,
        b=0
    ),

    font=dict(
        color="white"
    )
)

fig.show()