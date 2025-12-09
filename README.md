# 🌍 Abu Dhabi Amenity Search Map

An interactive web map built using **Leaflet.js** that visualizes **Parks, Hospitals, and Libraries** in Abu Dhabi.  
The application loads all data from an external **GeoJSON file** and supports:

- 🔍 Search by **name** (with autocomplete suggestions)  
- 📝 Natural-language queries such as:  
  - “parks near the corniche”  
  - “hospital near airport”  
  - “find libraries”  
- 📍 Automatic zoom to matched results  
- 📌 Filtering amenities by type and location  
- 🗺 Displaying all amenities by default  

---

## ✨ Features

### ✔ GeoJSON Data Loading
The map reads amenity data from:


Each feature includes:
- **Name**
- **Type** (Park / Hospital / Library)
- **Coordinates**

---

### ✔ Displays All Points
All amenities are shown on map load with markers and popups.

---

### ✔ Centered Search Bar
- Autocomplete suggestions while typing  
- Clicking a suggestion zooms to that point  

---

### ✔ Search Button With Natural Language
Supported queries:
- “parks”
- “show hospitals”
- “libraries”
- “parks near corniche”
- “hospital near airport”
- “find park near the corniche”

---

### ✔ Location Filters

| Keyword | Coordinates | Radius |
|---------|-------------|--------|
| **corniche** | `[24.4925, 54.3521]` | 2 km |
| **airport** | `[24.4539, 54.6511]` | 4 km |

Distance filtering uses **Leaflet's `map.distance()`**.

---

### ✔ UI Enhancements
- Zoom controls placed on **top-right**
- Clean suggestion dropdown
- Responsive layout
- Popups showing name + type

---

## 📁 Project Structure

project-folder/
│── index.html
│── script.js
│── abu_dhabi_amenities.geojson
│── README.md


---

## 🚀 How to Run

Browsers block `fetch()` from local files using **file://**,  
so you must run a **local server**.

### Option 1 — VS Code (Recommended)
1. Install **Live Server**  
2. Right-click `index.html` → **Open with Live Server**  
3. Browser opens at:

## 🔎 Search System

### 1️⃣ Autocomplete
Searches by **Name** and shows matching suggestions.

### 2️⃣ Natural Language Parsing
Detects:
- park / parks  
- hospital / hospitals  
- library / libraries  
- corniche  
- airport  

### 3️⃣ Distance Filtering
If query contains "near corniche" or "near airport":
1. Compute distance  
2. Filter results within radius  
3. Zoom to the first match  

---

## 🧰 Dependencies
- **Leaflet.js** (via CDN)

---

## 📜 License
Free to use for educational and development purposes.
