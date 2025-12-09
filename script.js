// -----------------------------
// Initialize Map
// -----------------------------
const map = L.map('map').setView([24.4539, 54.3773], 12);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);

let allFeatures = [];
let layerGroup = L.layerGroup().addTo(map);

// Corniche coordinates (approx.)
const CORNICHE_POINT = [24.4925, 54.3521];
const CORNICHE_RADIUS = 2000; // 2 km


// -----------------------------
// Load GeoJSON from file
// -----------------------------
fetch("abu_dhabi_amenities.geojson")
    .then(res => res.json())
    .then(data => {
        loadAllPoints(data);
        setupSearch();
    });


// -----------------------------
// Display all points on map
// -----------------------------
function loadAllPoints(data) {
    layerGroup.clearLayers();

    allFeatures = data.features.map(f => {
        const [lng, lat] = f.geometry.coordinates;

        const marker = L.marker([lat, lng])
            .bindPopup(`<b>${f.properties.Name}</b><br>Type: ${f.properties.Type}`)
            .addTo(layerGroup);

        return { ...f, marker };
    });
}


// -----------------------------
// Search Suggestions by Name
// -----------------------------
function setupSearch() {
    const searchInput = document.getElementById("searchInput");
    const suggestionsBox = document.getElementById("suggestions");
    const searchBtn = document.getElementById("searchBtn");

    // Autocomplete suggestions
    searchInput.addEventListener("input", () => {
        const text = searchInput.value.toLowerCase();
        suggestionsBox.innerHTML = "";

        if (text.length === 0) {
            suggestionsBox.style.display = "none";
            return;
        }

        const matches = allFeatures.filter(f =>
            f.properties.Name.toLowerCase().includes(text)
        );

        if (matches.length === 0) {
            suggestionsBox.style.display = "none";
            return;
        }

        matches.forEach(f => {
            const item = document.createElement("div");
            item.classList.add("suggestion-item");
            item.textContent = f.properties.Name;

            item.onclick = () => {
                zoomToFeature(f);
                searchInput.value = f.properties.Name;
                suggestionsBox.style.display = "none";
            };

            suggestionsBox.appendChild(item);
        });

        suggestionsBox.style.display = "block";
    });

    // When search button is clicked → parse natural language query
    searchBtn.addEventListener("click", runQuery);
}


// -----------------------------
// Natural Language Query Handler
// -----------------------------
function runQuery() {
    const query = document.getElementById("searchInput").value.toLowerCase();

    let filterType = null;

    // Identify amenity types
    if (query.includes("park")) filterType = "Park";
    if (query.includes("hospital")) filterType = "Hospital";
    if (query.includes("library")) filterType = "Library";

    // Determine if Corniche is included
    const nearCorniche = query.includes("corniche");

    // Filter features
    let results = allFeatures;

    if (filterType) {
        results = results.filter(f => f.properties.Type === filterType);
    }

    // If Corniche is mentioned → filter by distance
    if (nearCorniche) {
        results = results.filter(f => {
            const [lng, lat] = f.geometry.coordinates;
            const dist = map.distance([lat, lng], CORNICHE_POINT);
            return dist <= CORNICHE_RADIUS;
        });
    }

    // Show results on map
    layerGroup.clearLayers();

    if (results.length === 0) {
        alert("No matching locations found.");
        return;
    }

    results.forEach(f => {
        const [lng, lat] = f.geometry.coordinates;
        f.marker.addTo(layerGroup).openPopup();
    });

    // Zoom to first result
    const [lng, lat] = results[0].geometry.coordinates;
    map.setView([lat, lng], 15);
}


// -----------------------------
// Helper: Zoom to a specific feature
// -----------------------------
function zoomToFeature(feature) {
    const [lng, lat] = feature.geometry.coordinates;

    map.setView([lat, lng], 17);
    feature.marker.openPopup();
}
