# SKYGRAPH AI

# Aviation Disruption Intelligence and Airport Operations Platform

SKYGRAPH AI is a full-stack aviation intelligence platform that visualizes global airport connectivity, simulates aviation disruptions, analyzes operational resilience, monitors live airport activity, and provides AI-inspired gate optimization insights using real-world aviation datasets and live flight APIs.

The platform combines graph analytics, aviation network intelligence, geospatial visualization, operational dashboards, and live airport operations into a unified aviation analytics ecosystem.

---

# Features

## Global Airport Network Visualization

- Interactive aviation world map
- Airport marker intelligence
- Airline route visualization
- Airport connectivity analysis
- Dynamic airport search
- Interactive airport detail panels

---

## Airport Intelligence System

Each airport contains:

- Airport name
- IATA code
- Country
- Latitude
- Longitude
- Connectivity score
- Airport category
- Operational intelligence

Airport classification includes:

- Major Airport
- Regional Airport
- Minor Airport

based on route connectivity density.

---

## Weather Disruption Intelligence

The platform can simulate airport disruptions and analyze operational impact.

### Features

- Airport disruption simulation
- Connectivity loss analysis
- Alternative hub recommendation
- Flight rerouting intelligence
- Route disruption analytics
- Operational resilience modeling

---

## Flight Rerouting Intelligence

The platform intelligently suggests rerouted flight paths during disruptions.

### Example

Original Route:

```text
DEL → FRA → JFK
```

Suggested Route:

```text
DEL → DXB → JFK
```

### Intelligence Used

- Connectivity analysis
- Graph-based rerouting
- Alternative hub selection
- Route preservation logic

---

## Live Airport Operations Dashboard

Clicking an airport opens a live operational intelligence dashboard.

### Live Flight Data Includes

- Flight numbers
- Airline names
- Departure timings
- Gate numbers
- Terminal assignments
- Flight status
- Aircraft registration

### Operational Analytics

- Total active flights
- Active gates
- Traffic levels
- Airport operational health

---

## Gate Congestion AI

The platform includes gate congestion analytics and operational balancing intelligence.

### Features

- Most busy gate detection
- Underutilized gate identification
- Gate load balancing
- Congestion analytics
- Operational traffic scoring

### AI-Inspired Optimization

Example:

```text
Shift selected flights from Gate 17 to Gate D8 to reduce congestion and improve turnaround efficiency.
```

---

# Technology Stack

| Category | Technologies Used |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Maps & Visualization | MapLibre GL JS |
| Backend | FastAPI |
| Language | Python |
| Data Processing | Pandas |
| Graph Analytics | NetworkX |
| API Integration | Requests Library |
| Live Aviation Data | AviationStack API |
| Aviation Dataset | OpenFlights Dataset |
| Routing | Next.js App Router |

---

# Real Datasets and APIs Used

## 1. OpenFlights Dataset

Source:

https://openflights.org/data.html

### Data Used

- airports.dat
- routes.dat

### Information Retrieved

- Airport names
- IATA codes
- ICAO codes
- City
- Country
- Latitude
- Longitude
- Airline route relationships

### Purpose

Used for:

- Global airport visualization
- Graph network generation
- Connectivity analysis
- Route intelligence
- Disruption simulation

---

## 2. AviationStack API

Source:

https://aviationstack.com/

### Live Operational Data Retrieved

- Live flights
- Airline names
- Gate assignments
- Flight schedules
- Terminal numbers
- Flight status
- Aircraft registration

### Purpose

Used for:

- Live airport operations dashboard
- Gate congestion analytics
- Operational intelligence
- Real-time airport monitoring

---

# AI and Algorithmic Intelligence Used

The platform includes AI-inspired operational intelligence logic.

### Algorithms and Logic Implemented

- Graph traversal
- Connectivity analysis
- Frequency counting
- Traffic scoring
- Operational heuristics
- Gate congestion analysis
- Load balancing optimization

### AI Features

- Congestion detection
- Operational risk analysis
- Alternative gate recommendation
- Traffic classification
- Route resilience analysis

---

# Project Architecture

```text
Frontend (Next.js + React)
        ↓
FastAPI Backend APIs
        ↓
Airport Dataset Processing
        ↓
Graph-Based Route Intelligence
        ↓
Live AviationStack API Integration
        ↓
Operational Intelligence Engine
```

---

# Project Structure

```text
AIR_TRAFFIC_MAP/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── visualize_graph.py
│   └── datasets/
│
├── frontend/
│   ├── app/
│   │   ├── airport/
│   │   │   └── [code]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── disruption/
│   │   │   └── page.tsx
│   │   │
│   │   └── page.tsx
│   │
│   ├── screenshots/
│   │   ├── airport.png
│   │   ├── weather.png
│   │   ├── rerouting.png
│   │   └── map.png
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── datasets/
    ├── airports.csv
    └── routes.csv
```

---

# API Endpoints

| Endpoint | Description |
|---|---|
| `/top-airports` | Returns airport intelligence data |
| `/routes` | Returns global airline routes |
| `/simulate-disruption/{airport}` | Simulates airport disruption |
| `/live-airport-operations/{airport}` | Returns live airport operational data |

---

# Installation

# Backend Setup

Install dependencies:

```bash
pip install fastapi uvicorn pandas networkx requests
```

Run backend:

```bash
uvicorn main:app --reload
```

---

# Frontend Setup

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

---

# Screenshots

## Main Dashboard

![Main Dashboard](screenshots/airport.png.png)

---

## Weather Disruption Dashboard

![Weather Dashboard](screenshots/weather.png.png)

---

## Flight Rerouting Intelligence

![Rerouting](screenshots/rerouting.png.png)

---

## Airport Operations Dashboard

![Airport Operations](screenshots/map.png.png)

---

# User Workflow

## Main Dashboard

Users can:

- Explore global airports
- Analyze connectivity
- Search airports
- View route networks

---

## Airport Intelligence Panel

Users can:

- View airport analytics
- Analyze connectivity
- Open live operations dashboard

---

## Airport Operations Dashboard

Users can:

- Monitor live flights
- Analyze gate congestion
- View operational metrics
- Monitor terminals and gates

---

## Weather Disruption Dashboard

Users can:

- Simulate disruptions
- Analyze connectivity loss
- Visualize rerouting intelligence

---

# Educational Value

This project demonstrates practical implementation of:

- Graph theory
- Aviation network analysis
- Operational intelligence systems
- Geospatial visualization
- Full-stack web engineering
- REST API architecture
- Real-time API integration
- Aviation disruption resilience engineering
- AI-inspired optimization systems

---

# Future Enhancements

- Real machine learning delay prediction
- Predictive congestion analytics
- Real-time weather integration
- Live aircraft tracking
- Advanced rerouting optimization
- Passenger flow analytics
- Airline-specific operational intelligence
- Real-time NOTAM integration
- AI-based operational forecasting

---

# Conclusion

SKYGRAPH AI demonstrates a modern aviation intelligence ecosystem capable of combining graph analytics, live aviation APIs, operational dashboards, disruption simulation, and AI-inspired optimization into a unified aviation analytics platform.

The project showcases how modern aviation systems can leverage operational intelligence, graph-based analytics, and live flight data to improve resilience, situational awareness, and airport operational efficiency.