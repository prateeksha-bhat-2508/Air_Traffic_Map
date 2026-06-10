"use client";

import { useEffect, useRef, useState } from "react";

import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

const airportMap = new Map();

export default function Home() {

  const mapContainer =
    useRef<HTMLDivElement | null>(null);

  const [airportCount, setAirportCount] =
    useState(0);

  const [routeCount, setRouteCount] =
    useState(0);

  const [topAirport, setTopAirport] =
    useState("N/A");

  const [selectedAirport, setSelectedAirport] =
    useState<any>(null);

  const [allRoutes, setAllRoutes] =
    useState<any[]>([]);

  const [selectedConnections,
    setSelectedConnections] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [allAirports, setAllAirports] =
    useState<any[]>([]);

  useEffect(() => {

    if (!mapContainer.current) return;

    const map = new maplibregl.Map({

      container: mapContainer.current,

      style:
        "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",

      center: [0, 20],

      zoom: 2.2
    });

    map.addControl(

      new maplibregl.NavigationControl(),

      "top-right"
    );

    map.on("load", async () => {

      // =====================================
      // FETCH AIRPORTS
      // =====================================

      const airportResponse =
        await fetch(

          "http://127.0.0.1:8000/top-airports"
        );

      const airports =
        await airportResponse.json();

      setAllAirports(airports);

      setAirportCount(
        airports.length
      );

      if (airports.length > 0) {

        setTopAirport(
          airports[0].name
        );
      }

      // =====================================
      // CREATE AIRPORT MARKERS
      // =====================================

      airports.forEach((airport: any) => {

        if (
          !airport.latitude ||
          !airport.longitude
        ) return;

        airportMap.set(

          airport.iata,

          {
            lat: Number(airport.latitude),

            lon: Number(airport.longitude)
          }
        );

        const el =
          document.createElement("div");

        el.style.width = "7px";

        el.style.height = "7px";

        el.style.borderRadius = "50%";

        el.style.background = "#00ffff";

        el.style.boxShadow =
          "0 0 12px cyan";

        el.style.cursor = "pointer";

        // =====================================
        // MARKER CLICK
        // =====================================

       el.onclick = () => {

  setTimeout(() => {

    window.location.href =

      `/airport/${airport.iata}`;

  }, 100);

};
        const popup = new maplibregl.Popup({

  offset: 25

}).setHTML(`

  <div style="
    color:black;
    font-family:sans-serif;
  ">

    <h3>${airport.name}</h3>

    <p>${airport.country}</p>

    <p>${airport.iata}</p>

  </div>
`);
        new maplibregl.Marker(el)

          .setLngLat([

            Number(airport.longitude),

            Number(airport.latitude)

          ])

          .setPopup(popup)

          .addTo(map);

      });

      // =====================================
      // FETCH ROUTES
      // =====================================

      const routesResponse =
        await fetch(

          "http://127.0.0.1:8000/routes"
        );

      const routes =
        await routesResponse.json();

      setAllRoutes(routes);

      setRouteCount(
        routes.length
      );

      // =====================================
      // DRAW ROUTES
      // =====================================

      routes.forEach((route: any) => {

        const source =
          airportMap.get(
            route.source
          );

        const destination =
          airportMap.get(
            route.destination
          );

        if (
          !source ||
          !destination
        ) return;

        const routeId =

          `${route.source}-${route.destination}`;

        if (
          map.getSource(routeId)
        ) return;

        map.addSource(routeId, {

          type: "geojson",

          data: {

            type: "Feature",

            geometry: {

              type: "LineString",

              coordinates: [

                [
                  source.lon,
                  source.lat
                ],

                [
                  destination.lon,
                  destination.lat
                ]
              ]
            },

            properties: {}
          }
        });

        map.addLayer({

          id: routeId,

          type: "line",

          source: routeId,

          paint: {

            "line-color": "#ff4d4d",

            "line-width": 1.2,

            "line-opacity": 0.25
          }
        });

      });

    });

    return () => map.remove();

  }, []);

  // =====================================
  // FILTERED AIRPORTS
  // =====================================

  const filteredAirports =
    allAirports.filter((airport) => {

      return (

        airport.name
          ?.toLowerCase()
          .includes(search.toLowerCase())

        ||

        airport.iata
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });

  return (

    <main className="
      w-screen
      h-screen
      bg-black
      relative
      overflow-hidden
      text-white
    ">

      {/* MAP */}

      <div
        ref={mapContainer}
        className="w-full h-full"
      />

      {/* HEADER */}

      <div className="
        absolute
        top-5
        left-5
        z-20
      ">

        <h1 className="
          text-5xl
          font-black
          tracking-widest
          text-white
        ">

          SKYGRAPH AI

        </h1>

        <p className="
          text-cyan-400
          mt-2
          text-lg
        ">

          Aviation Intelligence Platform

        </p>

      </div>

      {/* STATS */}

      <div className="
        absolute
        top-5
        right-5
        z-20
        flex
        gap-4
      ">

        <div className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          rounded-2xl
          p-5
          min-w-[180px]
        ">

          <p className="
            text-gray-400
            text-sm
          ">

            Airports

          </p>

          <h2 className="
            text-4xl
            font-black
            mt-2
          ">

            {airportCount}

          </h2>

        </div>

        <div className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          rounded-2xl
          p-5
          min-w-[180px]
        ">

          <p className="
            text-gray-400
            text-sm
          ">

            Routes

          </p>

          <h2 className="
            text-4xl
            font-black
            mt-2
          ">

            {routeCount}

          </h2>

        </div>

      </div>

      {/* WEATHER DISRUPTION BUTTON */}

      <div className="
        absolute
        top-40
        right-5
        z-20
      ">

        <button

          onClick={() => {

            window.location.href =
              "/disruption";

          }}

          className="
  bg-red-500/20
  hover:bg-red-500/40
  border
  border-red-400/30
  backdrop-blur-xl
  px-6
  py-4
  rounded-2xl
  transition-all
  text-white
  font-semibold
">

          Weather Disruption Intelligence

        </button>

      </div>

      {/* SIDEBAR */}

      <div className="
        absolute
        left-5
        top-32
        bottom-5
        w-80
        z-20
        bg-white/10
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        overflow-hidden
        flex
        flex-col
      ">

        {/* SEARCH */}

        <div className="
          p-5
          border-b
          border-white/10
        ">

          <input

            type="text"

            placeholder="Search airport..."

            value={search}

            onChange={(e) =>

              setSearch(
                e.target.value
              )
            }

            className="
              w-full
              bg-black/40
              border
              border-white/10
              rounded-xl
              px-4
              py-3
              outline-none
              text-white
            "
          />

        </div>

        {/* AIRPORT LIST */}

        <div className="
          flex-1
          overflow-y-auto
          p-4
          space-y-3
        ">

          {filteredAirports

            .slice(0, 50)

            .map((airport, index) => (

              <div

                key={index}

                onClick={() => {

                  setSelectedAirport(
                    airport
                  );

                  const connections =

                    allRoutes.filter((route) =>

                      route.source === airport.iata ||

                      route.destination === airport.iata
                    );

                  setSelectedConnections(
                    connections
                  );

                }}

                className="
                  bg-black/30
                  hover:bg-cyan-500/20
                  transition-all
                  cursor-pointer
                  rounded-2xl
                  p-4
                "
              >

                <div className="
                  flex
                  items-center
                  justify-between
                ">

                  <div>

                    <h3 className="
                      font-bold
                      text-white
                    ">

                      {airport.iata}

                    </h3>

                    <p className="
                      text-sm
                      text-gray-400
                      mt-1
                    ">

                      {airport.name}

                    </p>

                  </div>

                  <div className="
                    w-3
                    h-3
                    rounded-full
                    bg-cyan-400
                  " />

                </div>

              </div>

            ))}

        </div>

      </div>

      {/* AIRPORT DETAILS */}

      {selectedAirport && (

        <div className="
          absolute
          bottom-5
          right-5
          z-20
          w-[420px]
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-6
          shadow-2xl
          text-white
        ">

          <div className="
            flex
            items-start
            justify-between
          ">

            <div>

              <h2 className="
                text-4xl
                font-black
                text-cyan-300
              ">

                {selectedAirport.iata}

              </h2>

              <p className="
                text-xl
                font-semibold
                mt-1
              ">

                {selectedAirport.name}

              </p>

              <p className="
                text-gray-400
                mt-1
              ">

                {selectedAirport.city},
                {" "}
                {selectedAirport.country}

              </p>

            </div>

            <button

              onClick={() => {

                setSelectedAirport(null);

                setSelectedConnections([]);

              }}

              className="
                w-10
                h-10
                rounded-full
                bg-white/10
                hover:bg-red-500/30
                transition-all
                flex
                items-center
                justify-center
                text-xl
                text-white
              "
            >

              ✕

            </button>

          </div>

          {/* ANALYTICS */}

          <div className="
            grid
            grid-cols-2
            gap-4
            mt-6
          ">

            <div className="
              bg-cyan-500/10
              border
              border-cyan-400/20
              rounded-2xl
              p-4
            ">

              <p className="
                text-cyan-300
                text-sm
              ">

                Connectivity

              </p>

              <h3 className="
                text-3xl
                font-black
                mt-2
              ">

                {selectedConnections.length}

              </h3>

            </div>

            <div className="
              bg-purple-500/10
              border
              border-purple-400/20
              rounded-2xl
              p-4
            ">

              <p className="
                text-purple-300
                text-sm
              ">

                Airport Type

              </p>

              <h3 className="
                text-2xl
                font-black
                mt-3
              ">

                {
                  selectedConnections.length > 40
                    ? "Major"

                    : selectedConnections.length > 15
                    ? "Regional"

                    : "Minor"
                }

              </h3>

            </div>

          </div>

          {/* LOCATION */}

          <div className="
            mt-6
            bg-white/5
            border
            border-white/10
            rounded-2xl
            p-5
            space-y-4
          ">

            <div className="
              flex
              justify-between
            ">

              <span className="text-gray-400">
                Latitude
              </span>

              <span className="
                font-semibold
                text-cyan-300
              ">

                {selectedAirport.latitude}

              </span>

            </div>

            <div className="
              flex
              justify-between
            ">

              <span className="text-gray-400">
                Longitude
              </span>

              <span className="
                font-semibold
                text-cyan-300
              ">

                {selectedAirport.longitude}

              </span>

            </div>

            <div className="
              flex
              justify-between
            ">

              <span className="text-gray-400">
                Country
              </span>

              <span className="
                font-semibold
              ">

                {selectedAirport.country}

              </span>


            </div>
            {/* FLIGHT DETAILS BUTTON */}

<button

  onClick={() => {

    window.location.href =

      `/airport/${selectedAirport.iata}`;

  }}

  className="
    mt-6
    w-full
    bg-cyan-500/20
    hover:bg-cyan-500/40
    border
    border-cyan-400/30
    transition-all
    rounded-2xl
    py-4
    text-lg
    font-semibold
    text-cyan-300
  "
>

  Show Flight Details

</button>

          </div>

        </div>

      )}

    </main>
  );
}