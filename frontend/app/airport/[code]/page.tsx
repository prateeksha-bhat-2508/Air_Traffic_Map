"use client";

import { useEffect, useState, use } from "react";



export default function AirportPage({

    params,

}: any) {

    const resolvedParams: any = use(params);

    const code =
        resolvedParams.code;

    const [operationsData,
        setOperationsData] =
        useState<any>(null);
    // =====================================
    // GATE ANALYTICS
    // =====================================

    const gateCounts: any = {};

    (operationsData?.flights || []).forEach(

        (flight: any) => {

            const gate =

                flight.gate || "Unknown";

            gateCounts[gate] =

                (gateCounts[gate] || 0) + 1;
        }
    );

    // =====================================
    // SORT GATES BY TRAFFIC
    // =====================================

    const sortedGates =

        Object.entries(gateCounts)

            .sort(

                (a: any, b: any) =>

                    Number(b[1]) - Number(a[1])
            );

    // =====================================
    // MOST BUSY GATE
    // =====================================

    const busiestGate =

        sortedGates[0]?.[0] || "N/A";

    const busiestGateTraffic =

        Number(sortedGates[0]?.[1] || 0);

    // =====================================
    // LEAST BUSY GATE
    // =====================================

    const leastBusyGate =

        sortedGates[
        sortedGates.length - 1
        ]?.[0] || "N/A";

    // =====================================
    // AI GATE OPTIMIZATION
    // =====================================

    const optimizationSuggestion =

        busiestGate !== "N/A"

            ? `Shift selected flights from Gate ${busiestGate} to Gate ${leastBusyGate} to reduce congestion and improve turnaround efficiency.`

            : "No optimization required.";

    // =====================================
    // TRAFFIC SCORE
    // =====================================

    const trafficScore =

        Math.min(

            (operationsData?.total_flights || 0) * 2,

            100
        );

    // =====================================
    // TRAFFIC LEVEL
    // =====================================

    const trafficLevel =

        trafficScore > 80

            ? "EXTREME"

            : trafficScore > 60

                ? "HIGH"

                : trafficScore > 30

                    ? "MODERATE"

                    : "LOW";
    useEffect(() => {

        fetch(

            `http://127.0.0.1:8000/live-airport-operations/${code}`

        )

            .then((res) => res.json())

            .then((data) => {

                setOperationsData(data);

            })

            .catch((error) => {

                console.error(error);

            });

    }, [code]);
    // =====================================
    // LOADING SCREEN
    // =====================================

    if (!operationsData) {

        return (

            <main className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
      ">

                <div className="text-center">

                    <h1 className="
            text-5xl
            font-black
            text-cyan-300
          ">

                        Loading Airport Intelligence...

                    </h1>

                    <p className="
            text-gray-400
            mt-4
          ">

                        Fetching live aviation operations

                    </p>

                </div>

            </main>
        );
    }

    return (

        <main className="
      min-h-screen
      bg-black
      text-white
      p-10
    ">

            {/* HEADER */}

            <div className="
        flex
        items-center
        justify-between
      ">

                <div>

                    <h1 className="
            text-7xl
            font-black
            text-cyan-300
          ">

                        {operationsData.airport}

                    </h1>

                    <p className="
            text-gray-400
            text-xl
            mt-3
          ">

                        Live Airport Operations Intelligence

                    </p>

                </div>

                <button

                    onClick={() => {

                        window.location.href = "/";

                    }}

                    className="
            bg-white/10
            hover:bg-white/20
            transition-all
            px-6
            py-3
            rounded-2xl
            text-lg
          "
                >

                    Back

                </button>

            </div>

            {/* KPI SECTION */}

            <div className="
        grid
        grid-cols-3
        gap-6
        mt-10
      ">



                {/* TOTAL FLIGHTS */}

                <div className="
          bg-cyan-500/10
          border
          border-cyan-400/20
          rounded-3xl
          p-6
        ">

                    <p className="
            text-cyan-300
          ">

                        Total Flights

                    </p>

                    <h1 className="
            text-6xl
            font-black
            mt-4
          ">

                        {operationsData.total_flights}

                    </h1>

                </div>

                {/* ACTIVE GATES */}

                <div className="
          bg-orange-500/10
          border
          border-orange-400/20
          rounded-3xl
          p-6
        ">

                    <p className="
            text-orange-300
          ">

                        Active Gates

                    </p>

                    <h1 className="
            text-6xl
            font-black
            mt-4
          ">

                        {

                            new Set(

                                (operationsData.flights || [])

                                    .map((flight: any) =>

                                        flight.gate
                                    )

                            ).size

                        }

                    </h1>

                </div>

                {/* LIVE STATUS */}

                <div className="
          bg-green-500/10
          border
          border-green-400/20
          rounded-3xl
          p-6
        ">

                    <p className="
            text-green-300
          ">

                        Operational Status

                    </p>

                    <h1 className="
            text-4xl
            font-black
            mt-6
          ">

                        ACTIVE

                    </h1>

                </div>

            </div>

 {/* AIRPORT ANALYTICS */}

<div className="
  mt-10
  grid
  lg:grid-cols-3
  grid-cols-1
  gap-6
">

  {/* AIRPORT INTELLIGENCE */}

  <div className="
    bg-white/5
    border
    border-white/10
    rounded-3xl
    p-6
  ">

    <h2 className="
      text-3xl
      font-black
      text-cyan-300
    ">

      Airport Intelligence

    </h2>

    <div className="
      mt-6
      space-y-5
    ">

      <div className="
        flex
        justify-between
      ">

        <span className="text-gray-400">
          Airport Code
        </span>

        <span className="font-bold">
          {operationsData.airport}
        </span>

      </div>

      <div className="
        flex
        justify-between
      ">

        <span className="text-gray-400">
          Operational Status
        </span>

        <span className="
          text-green-300
          font-bold
        ">
          ACTIVE
        </span>

      </div>

      <div className="
        flex
        justify-between
      ">

        <span className="text-gray-400">
          Traffic Level
        </span>

        <span className="
          text-orange-300
          font-bold
        ">
          {trafficLevel}
        </span>

      </div>

      <div className="
        flex
        justify-between
      ">

        <span className="text-gray-400">
          Traffic Score
        </span>

        <span className="
          text-cyan-300
          font-bold
        ">
          {trafficScore}/100
        </span>

      </div>

    </div>

  </div>

  {/* GATE CONGESTION */}

  <div className="
    bg-red-500/10
    border
    border-red-400/20
    rounded-3xl
    p-6
  ">

    <h2 className="
      text-3xl
      font-black
      text-red-300
    ">

      Gate Congestion AI

    </h2>

    <div className="
      mt-6
      space-y-5
    ">

      <div>

        <p className="
          text-gray-400
          text-sm
        ">

          Most Busy Gate

        </p>

        <h1 className="
          text-6xl
          font-black
          text-red-300
          mt-2
        ">

          {busiestGate}

        </h1>

      </div>

      <div>

        <p className="
          text-gray-400
          text-sm
        ">

          Flights Using Gate

        </p>

        <h3 className="
          text-3xl
          font-bold
          mt-2
        ">

          {busiestGateTraffic}

        </h3>

      </div>

      <div>

        <p className="
          text-gray-400
          text-sm
        ">

          Suggested Relief Gate

        </p>

        <h3 className="
          text-3xl
          font-bold
          text-cyan-300
          mt-2
        ">

          {leastBusyGate}

        </h3>

      </div>

    </div>

  </div>

  {/* AI OPTIMIZATION */}

  <div className="
    bg-cyan-500/10
    border
    border-cyan-400/20
    rounded-3xl
    p-6
  ">

    <h2 className="
      text-3xl
      font-black
      text-cyan-300
    ">

      AI Optimization

    </h2>

    <div className="
      mt-6
    ">

      <p className="
        text-gray-400
        text-sm
      ">

        Optimization Confidence

      </p>

      <h1 className="
        text-6xl
        font-black
        mt-2
      ">

        92%

      </h1>

      <div className="
        mt-6
        bg-black/30
        rounded-2xl
        p-4
        text-lg
        leading-relaxed
      ">

        {optimizationSuggestion}

      </div>

    </div>

  </div>

</div>
            {/* FLIGHT OPERATIONS */}

            <div className="
        mt-12
      ">

                <div className="
          flex
          items-center
          justify-between
        ">

                    <h2 className="
            text-4xl
            font-black
          ">

                        Flight Operations

                    </h2>

                    <p className="
            text-gray-400
          ">

                        Live aviationstack API feed

                    </p>

                </div>

                {/* FLIGHTS GRID */}

                <div className="
          mt-8
          grid
          grid-cols-2
          gap-6
        ">

                    {(operationsData.flights || []).map(

                        (
                            flight: any,
                            index: number
                        ) => (

                            <div

                                key={index}

                                className="
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-6
                  hover:bg-cyan-500/10
                  transition-all
                "
                            >

                                {/* TOP */}

                                <div className="
                  flex
                  items-center
                  justify-between
                ">

                                    <div>

                                        <h1 className="
                      text-3xl
                      font-black
                    ">

                                            {flight.flight}

                                        </h1>

                                        <p className="
                      text-gray-400
                      mt-2
                    ">

                                            {flight.airline}

                                        </p>

                                    </div>

                                    <div className="
                    text-right
                  ">

                                        <p className="
                      text-gray-400
                    ">

                                            Gate

                                        </p>

                                        <h1 className="
                      text-5xl
                      font-black
                      text-cyan-300
                    ">

                                            {flight.gate || "N/A"}

                                        </h1>

                                    </div>

                                </div>

                                {/* DETAILS */}

                                <div className="
                  grid
                  grid-cols-4
                  gap-4
                  mt-8
                ">

                                    {/* TIME */}

                                    <div>

                                        <p className="
                      text-gray-400
                      text-sm
                    ">

                                            Departure

                                        </p>

                                        <h3 className="
                      font-bold
                      mt-2
                    ">

                                            {

                                                flight.departure
                                                    ?.slice(11, 16)

                                                || "N/A"

                                            }

                                        </h3>

                                    </div>

                                    {/* TERMINAL */}

                                    <div>

                                        <p className="
                      text-gray-400
                      text-sm
                    ">

                                            Terminal

                                        </p>

                                        <h3 className="
                      font-bold
                      mt-2
                    ">

                                            {flight.terminal || "N/A"}

                                        </h3>

                                    </div>

                                    {/* STATUS */}

                                    <div>

                                        <p className="
                      text-gray-400
                      text-sm
                    ">

                                            Status

                                        </p>

                                        <h3 className="
                      font-bold
                      mt-2
                      text-orange-300
                    ">

                                            {flight.status}

                                        </h3>

                                    </div>

                                    {/* AIRCRAFT */}

                                    <div>

                                        <p className="
                      text-gray-400
                      text-sm
                    ">

                                            Aircraft

                                        </p>

                                        <h3 className="
                      font-bold
                      mt-2
                    ">

                                            {flight.aircraft || "N/A"}

                                        </h3>

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>

            </div>

        </main>
    );
}