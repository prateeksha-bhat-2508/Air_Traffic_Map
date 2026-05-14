````markdown
# SKYGRAPH AI

## Aviation Disruption Intelligence and Airport Operations Platform

SKYGRAPH AI is a full-stack aviation intelligence platform designed to analyze global airport connectivity, simulate operational disruptions, visualize route networks, monitor live airport activity, and provide AI-assisted gate optimization insights.

The platform combines aviation datasets, real-time flight APIs, graph-based network analysis, interactive geospatial visualization, and operational intelligence modules into a unified aviation analytics dashboard.

---

# Project Overview

The system provides:

- Global airport visualization
- Aviation route network mapping
- Airport connectivity analysis
- Weather disruption simulation
- Flight rerouting intelligence
- Live airport operations monitoring
- Gate congestion analytics
- AI-assisted operational optimization
- Interactive airport intelligence dashboards

The platform is built using a modern frontend-backend architecture with React, Next.js, FastAPI, Python analytics, and live aviation APIs.

---

# Key Features

---

## 1. Global Airport Network Visualization

The main dashboard visualizes airports across the globe on an interactive aviation map.

### Features
- Interactive airport markers
- Airport hover intelligence popup
- Global airline route visualization
- Airport connectivity analytics
- Dynamic network rendering
- Searchable airport sidebar

### Information Displayed
- Airport IATA code
- Airport name
- Country
- Latitude
- Longitude
- Connectivity score
- Airport category

---

## 2. Airport Connectivity Intelligence

The platform analyzes airport route relationships using graph-based aviation connectivity logic.

### Connectivity Metrics
- Number of connected routes
- Hub classification
- Regional airport detection
- Major airport identification
- Route density analysis

### Airport Categories
- Major Airport
- Regional Airport
- Minor Airport

Classification is determined dynamically based on route connectivity volume.

---

## 3. Weather Disruption Simulation System

The platform includes a dedicated disruption intelligence dashboard that simulates operational failures caused by weather conditions or airport shutdowns.

### Features
- Airport disruption simulation
- Connectivity loss analysis
- Alternative hub recommendation
- Route disruption estimation
- Flight rerouting intelligence
- Disrupted route visualization

### Output Analytics
- Affected airports
- Connectivity reduction
- Disrupted flight routes
- Alternative rerouting hubs
- Simulated operational impact

---

## 4. Flight Rerouting Intelligence

The system generates rerouting recommendations when airports become unavailable.

### Example
Original Route:
DEL → FRA → JFK

Suggested Route:
DEL → DXB → JFK

### Rerouting Logic
- Graph-based route substitution
- Alternative hub selection
- Connectivity preservation analysis
- Operational continuity simulation

---

## 5. Live Airport Operations Dashboard

Clicking an airport opens a dedicated airport operations intelligence page.

### Live Operational Data Includes
- Live flights
- Flight numbers
- Airline names
- Departure schedules
- Terminal assignments
- Gate assignments
- Aircraft registration
- Operational status

### Operational Metrics
- Total active flights
- Active gates
- Traffic level
- Operational health

---

## 6. Gate Congestion AI

The platform includes operational analytics for gate congestion monitoring.

### Features
- Most busy gate detection
- Gate utilization analytics
- Underutilized gate identification
- Gate traffic balancing
- Operational congestion insights

### Analytics Calculated
- Flights per gate
- Gate traffic frequency
- Operational load distribution
- Suggested relief gate

---

## 7. AI Optimization Engine

The platform includes AI-inspired optimization heuristics for airport operations management.

### Current Intelligence Logic
- Gate congestion analysis
- Traffic scoring
- Operational load balancing
- Congestion mitigation recommendations

### Example Recommendation
“Shift selected flights from Gate 17 to Gate D8 to reduce congestion and improve turnaround efficiency.”

### Algorithms Used
- Frequency counting
- Graph traversal
- Connectivity analysis
- Operational heuristics
- Load balancing logic

---

# Technology Stack

---

## Frontend Technologies

### Next.js
Used for:
- Frontend application architecture
- Routing system
- Dynamic airport pages
- Client-side rendering

### React
Used for:
- Interactive UI rendering
- State management
- Dynamic airport intelligence components

### TypeScript
Used for:
- Strong typing
- Scalable frontend architecture
- Better debugging and maintainability

### Tailwind CSS
Used for:
- Modern glassmorphism UI
- Responsive layouts
- Dynamic aviation dashboard styling

### MapLibre GL JS
Used for:
- Interactive aviation maps
- Airport marker rendering
- Route visualization
- Popup intelligence windows

---

## Backend Technologies

### FastAPI
Used for:
- REST API architecture
- Airport intelligence endpoints
- Operational analytics APIs
- Disruption simulation APIs

### Python
Used for:
- Data processing
- Aviation analytics
- Route analysis
- AI optimization logic

### Pandas
Used for:
- Airport dataset handling
- Flight data processing
- Route analytics

### NetworkX
Used for:
- Graph-based aviation network analysis
- Connectivity intelligence
- Route relationship modeling

### Requests Library
Used for:
- External API communication
- Live aviation data retrieval

---

# Data Sources

---

## 1. OpenFlights Airport Dataset

### Source
https://openflights.org/data.html

### Data Used
- Airport names
- IATA codes
- ICAO codes
- Latitude
- Longitude
- Country
- City

### Purpose
Used for:
- Global airport visualization
- Geospatial aviation mapping
- Airport intelligence generation

---

## 2. OpenFlights Routes Dataset

### Source
https://openflights.org/data.html

### Data Used
- Airline routes
- Source airports
- Destination airports
- Route relationships

### Purpose
Used for:
- Connectivity analysis
- Route graph generation
- Disruption simulation
- Network intelligence

---

## 3. AviationStack API

### Source
https://aviationstack.com/

### Live Data Retrieved
- Flight schedules
- Airline names
- Gate assignments
- Flight statuses
- Terminal details
- Aircraft registration
- Operational flight information

### Purpose
Used for:
- Real-time airport operations dashboard
- Live flight intelligence
- Gate analytics
- Operational visualization

---

# Project Architecture

```text
Frontend (Next.js + React)
        ↓
FastAPI Backend APIs
        ↓
Airport Dataset Processing
        ↓
Graph-Based Network Analytics
        ↓
Live AviationStack API Integration
        ↓
Operational Intelligence Engine
```

---

# API Endpoints

## Airport Data

```http
GET /top-airports
```

Returns airport intelligence dataset.

---

## Route Data

```http
GET /routes
```

Returns airline route network.

---

## Disruption Simulation

```http
GET /simulate-disruption/{airport_code}
```

Simulates operational disruption for an airport.

---

## Live Airport Operations

```http
GET /live-airport-operations/{airport_code}
```

Returns real-time operational data for an airport.

---

# User Flow

---

## Main Dashboard

Users can:
- Explore airports
- Search airports
- Visualize routes
- Analyze connectivity

---

## Airport Intelligence Panel

Users can:
- View airport metadata
- Analyze connectivity
- Access flight operations page

---

## Airport Operations Dashboard

Users can:
- Monitor live flights
- Analyze gate congestion
- View operational analytics
- Monitor terminals and gates

---

## Disruption Dashboard

Users can:
- Simulate airport shutdowns
- Analyze connectivity loss
- Visualize rerouting intelligence

---

# Installation

---

## Backend Setup

```bash
pip install fastapi uvicorn pandas networkx requests
```

Run backend:

```bash
uvicorn main:app --reload
```

---

## Frontend Setup

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

<p align="center">
  <img src="D:\Airport_App\screenshots\airport.png.png" width="100%">
</p>

---

## Weather Disruption Dashboard

<p align="center">
  <img src="D:\Airport_App\screenshots\weather.png.png" width="100%">
</p>

---

## Flight Rerouting Intelligence

<p align="center">
  <img src="D:\Airport_App\screenshots\rerouting.png.png" width="100%">
</p>

---

## Airport Operations Dashboard

<p align="center">
  <img src="D:\Airport_App\screenshots\map.png.png" width="100%">
</p>

---

# Educational Value

This project demonstrates practical implementation of:

- Graph theory
- Aviation network analytics
- Operational intelligence systems
- Geospatial visualization
- Full-stack web engineering
- REST API architecture
- Live API integration
- AI-inspired optimization systems
- Aviation disruption resilience engineering

---

# Future Enhancements

- Real machine learning delay prediction
- Predictive congestion analytics
- Weather API integration
- Real-time aircraft tracking
- Gate scheduling optimization
- AI-based operational forecasting
- Passenger flow analytics
- Airline-specific analytics
- Multi-airport disruption propagation
- Real-time NOTAM integration

---

# Conclusion

SKYGRAPH AI demonstrates a modern aviation intelligence ecosystem capable of combining live aviation data, graph analytics, disruption simulation, operational monitoring, and AI-inspired optimization into a unified interactive platform.

The project showcases how real-world aviation systems can leverage operational analytics, graph theory, and intelligent visualization to improve resilience, situational awareness, and airport operational efficiency.

---
````
