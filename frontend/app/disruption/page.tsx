"use client";

import { useState } from "react";

export default function DisruptionPage() {

  const [airport, setAirport] = useState("");

  const [data, setData] = useState<any>(null);

  const [loading, setLoading] = useState(false);

  const simulate = async () => {

    if (!airport) return;

    setLoading(true);

    const response = await fetch(
      `http://127.0.0.1:8000/simulate-disruption/${airport}`
    );

    const result = await response.json();

    setData(result);

    setLoading(false);
  };

  return (

    <main className="min-h-screen bg-black text-white p-10">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-black text-red-400">
            WEATHER DISRUPTION
          </h1>

          <p className="text-gray-400 mt-3">
            Aviation Resilience Intelligence System
          </p>

        </div>

        <a
          href="/"
          className="
            bg-white/10
            px-6
            py-3
            rounded-2xl
            hover:bg-white/20
            transition-all
          "
        >
          ← Back
        </a>

      </div>

      {/* SEARCH */}

      <div className="mt-10 flex gap-4">

        <input
          type="text"
          placeholder="Enter airport code..."
          value={airport}
          onChange={(e) =>
            setAirport(
              e.target.value.toUpperCase()
            )
          }
          className="
            flex-1
            bg-white/10
            border
            border-white/10
            rounded-2xl
            px-5
            py-4
            text-white
            outline-none
          "
        />

        <button
          onClick={simulate}
          className="
            bg-red-500/30
            hover:bg-red-500/50
            transition-all
            px-8
            rounded-2xl
            font-bold
          "
        >

          {
            loading
              ? "Simulating..."
              : "Simulate"
          }

        </button>

      </div>

      {/* RESULTS */}

      {data && (

        <div className="mt-10">

          {/* KPI GRID */}

          <div className="grid grid-cols-4 gap-6">

            <div className="
              bg-red-500/10
              border
              border-red-400/20
              rounded-3xl
              p-6
            ">

              <p className="text-gray-400 text-sm">
                Closed Airport
              </p>

              <h2 className="
                text-4xl
                font-black
                mt-3
              ">
                {data.closed_airport}
              </h2>

            </div>

            <div className="
              bg-orange-500/10
              border
              border-orange-400/20
              rounded-3xl
              p-6
            ">

              <p className="text-gray-400 text-sm">
                Routes Lost
              </p>

              <h2 className="
                text-4xl
                font-black
                mt-3
                text-orange-300
              ">
                {data.routes_removed}
              </h2>

            </div>

            <div className="
              bg-cyan-500/10
              border
              border-cyan-400/20
              rounded-3xl
              p-6
            ">

              <p className="text-gray-400 text-sm">
                Connectivity Loss
              </p>

              <h2 className="
                text-4xl
                font-black
                mt-3
                text-cyan-300
              ">
                {data.loss_percent}%
              </h2>

            </div>

            <div className="
              bg-purple-500/10
              border
              border-purple-400/20
              rounded-3xl
              p-6
            ">

              <p className="text-gray-400 text-sm">
                Backup Hub
              </p>

              <h2 className="
                text-4xl
                font-black
                mt-3
                text-purple-300
              ">
                {data.alternative_hub}
              </h2>

            </div>

          </div>

          {/* LOWER GRID */}

          <div className="
            grid
            grid-cols-2
            gap-6
            mt-8
          ">

            {/* AFFECTED AIRPORTS */}

            <div className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-6
            ">

              <h2 className="
                text-2xl
                font-bold
              ">
                Affected Airports
              </h2>

              <div className="
                mt-6
                flex
                flex-wrap
                gap-3
              ">

                {data.affected_airports.map(

                  (
                    airportCode: string,
                    index: number
                  ) => (

                    <div
                      key={index}
                      className="
                        px-4
                        py-2
                        rounded-xl
                        bg-red-500/20
                        border
                        border-red-400/20
                      "
                    >

                      {airportCode}

                    </div>
                  )
                )}

              </div>

            </div>

            {/* FLIGHT REROUTING */}

            <div className="
              bg-white/5
              border
              border-white/10
              rounded-3xl
              p-6
            ">

              <h2 className="
                text-2xl
                font-bold
              ">
                Flight Rerouting Intelligence
              </h2>

              <div className="
                mt-6
                space-y-4
              ">
{(data.rerouting || []).map(

  (
    flight: any,
    index: number
  ) => (

    <div
      key={index}
      className="
        bg-black/40
        rounded-2xl
        p-4
        flex
        items-center
        justify-between
      "
    >
                      <div>

                        <p className="
                          text-sm
                          text-gray-400
                        ">
                          Flight Number
                        </p>

                        <h3 className="
                          text-xl
                          font-bold
                          mt-1
                        ">
                          {flight.flight}
                        </h3>

                      </div>

                      <div className="text-center">

                        <p className="
                          text-gray-400
                          text-sm
                        ">
                          Rerouted Path
                        </p>

                        <h3 className="
                          text-cyan-300
                          font-bold
                          mt-1
                        ">
                          {flight.old_route}
                        </h3>

                        <p className="
                          mt-2
                          text-red-300
                        ">
                          ↓
                        </p>

                        <h3 className="
                          text-green-300
                          font-bold
                          mt-2
                        ">
                          {flight.new_route}
                        </h3>

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}