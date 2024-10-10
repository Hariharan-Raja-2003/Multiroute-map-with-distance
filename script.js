mapboxgl.accessToken = 'pk.eyJ1Ijoic3ViaGFtcHJlZXQiLCJhIjoiY2toY2IwejF1MDdodzJxbWRuZHAweDV6aiJ9.Ys8MP5kVTk5P9V2TDvnuDg';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [78.9629, 20.5937],
  zoom: 4
});

let routeLayers = [];
let markers = [];

map.addControl(new mapboxgl.NavigationControl(), 'top-left');
map.addControl(new mapboxgl.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }));
//function of adding input container
document.getElementById('add-more').addEventListener('click', function() {
const inputContainer = document.createElement('div');
inputContainer.classList.add('input-container');
inputContainer.innerHTML = `
<label>From :</label>
<input type="text" class="from" placeholder="Starting">
<label>To :</label>
<input type="text" class="to" placeholder="Destination">
`;
document.getElementById('input-fields').appendChild(inputContainer);
});
//calculate function
async function calculateRoute(fromCoords, toCoords, color, i) {
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${fromCoords[0]},${fromCoords[1]};${toCoords[0]},${toCoords[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.routes.length > 0) {
    const route = data.routes[0];
    const distance = route.distance / 1000;
    const routeCoordinates = route.geometry.coordinates;

    const layerId = `route-${i}`;
    map.addLayer({
      id: layerId,
      type: 'line',
      source: { type: 'geojson', data: { type: 'Feature', geometry: { type: 'LineString', coordinates: routeCoordinates } } },
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: { 'line-color': color, 'line-width': 6 }
    });

    routeLayers.push(layerId);

    const startMarker = new mapboxgl.Marker({ color: color }).setLngLat(fromCoords).addTo(map);
    const endMarker = new mapboxgl.Marker({ color: color }).setLngLat(toCoords).addTo(map);

    markers.push(startMarker, endMarker);

    return { distance, color };
  } else {
    return { distance: null, color };
  }
}

async function getCoordinates(input) {
    // Check if the input is a number (pincode) or a lat,lng or an address
    if (input.match(/^\d+$/)) {
      // Input is a pincode, treat it as a place and find the coordinates
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json?access_token=${mapboxgl.accessToken}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.features.length > 0) {
        return data.features[0].center; // Return coordinates for the pincode
      } else {
        return null; // Return null if no valid result is found
      }
    } else if (input.includes(',')) {
      // Input is a lat,lng pair
      const [lat, lng] = input.split(',').map(Number);
      return [lng, lat];
    } else {
      // Otherwise, treat input as a normal address or location
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json?access_token=${mapboxgl.accessToken}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.features.length > 0) return data.features[0].center;
      else return null;
    }
  }
  

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}

// Function to parse CSV file
function parseCSV(content) {
  const lines = content.trim().split("\n");
  const locations = [];
  for (const line of lines) {
    const [from, to] = line.split(",");
    if (from && to) locations.push({ from: from.trim(), to: to.trim() });
  }
  return locations;
}

// Function to parse JSON file
function parseJSON(content) {
  return JSON.parse(content);
}
// Function to parse Excel file and skip the first row
function parseExcel(content) {
const workbook = XLSX.read(content, { type: 'binary' });
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
const locations = [];

// Start the loop from index 1 to skip the first row (headers)
for (let i = 1; i < data.length; i++) {
const [from, to] = data[i];
if (from && to) {
  locations.push({ from: from.trim(), to: to.trim() });
}
}
return locations;
}


// Handle file upload
document.getElementById('upload-button').addEventListener('click', async function() {
  const fileInput = document.getElementById('file-upload');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = async function(event) {
      let locations = [];

      if (file.name.endsWith('.csv')) {
        locations = parseCSV(event.target.result);
      } else if (file.name.endsWith('.json')) {
        locations = parseJSON(event.target.result);
      } else if (file.name.endsWith('.xlsx')) {
        locations = parseExcel(event.target.result);
      }

      document.getElementById('results').innerHTML = '';
      resultsData = [];
      for (let i = 0; i < locations.length; i++) {
        const fromCoords = await getCoordinates(locations[i].from);
        const toCoords = await getCoordinates(locations[i].to);
        if (fromCoords && toCoords) {
          const color = getRandomColor();
          const result = await calculateRoute(fromCoords, toCoords, color, i);
          document.getElementById('results').innerHTML += `
            <div class="route-info" style="border-left: 5px solid ${result.color};">
              Distance from <strong>${locations[i].from}</strong> to <strong>${locations[i].to}</strong>: ${result.distance ? result.distance.toFixed(2) : 'N/A'} km
            </div>`;
          resultsData.push([locations[i].from, locations[i].to, result.distance ? result.distance.toFixed(2) : 'N/A']);
        }
      }
    };
    reader.readAsBinaryString(file);
  }
});
// Download the template Excel file
document.getElementById('download-template').addEventListener('click', function() {
const worksheetData = [
['From location(Name or Lat,Lng)', 'To location(Name or Lat,Lng)'], 
];

// Create a worksheet from the array
const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

// Create a workbook and add the worksheet
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

// Export the Excel file
XLSX.writeFile(workbook, 'location_template.xlsx');
});

// Clear the map and results
document.getElementById('clear-button').addEventListener('click', function() {
  for (let i = 0; i < routeLayers.length; i++) {
    if (map.getLayer(routeLayers[i])) {
      map.removeLayer(routeLayers[i]);
      map.removeSource(routeLayers[i]);
    }
  }
  routeLayers = [];
  markers.forEach(marker => marker.remove());
  markers = [];
  document.getElementById('results').innerHTML = '';
  resultsData = [];
   // Clear the uploaded file input
document.getElementById('file-upload').value = '';
});
document.getElementById('clear-button').addEventListener('click', function() {
// Remove all route layers from the map
for (let i = 0; i < routeLayers.length; i++) {
if (map.getLayer(routeLayers[i])) {
  map.removeLayer(routeLayers[i]);
  map.removeSource(routeLayers[i]);
}
}
routeLayers = [];

// Remove all markers from the map
markers.forEach(marker => marker.remove());
markers = [];

// Clear results section
document.getElementById('results').innerHTML = '';
resultsData = [];

// Clear the uploaded file input
document.getElementById('file-upload').value = '';

// Clear all added input fields except the first one
const inputFields = document.getElementById('input-fields');
const containers = inputFields.getElementsByClassName('input-container');

// Keep the first set of input fields and clear their values
const fromInputs = inputFields.querySelectorAll('.from');
const toInputs = inputFields.querySelectorAll('.to');

fromInputs[0].value = '';
toInputs[0].value = '';

// Remove all additional sets of input fields (i.e., ones beyond the first)
while (containers.length > 1) { 
inputFields.removeChild(containers[containers.length - 1]);
}
});


document.getElementById('calculate-route').addEventListener('click', async function() {
  const fromInputs = document.querySelectorAll('.from');
  const toInputs = document.querySelectorAll('.to');
  document.getElementById('results').innerHTML = '';
  resultsData = [];

  for (let i = 0; i < fromInputs.length; i++) {
    const fromCoords = await getCoordinates(fromInputs[i].value);
    const toCoords = await getCoordinates(toInputs[i].value);
    if (fromCoords && toCoords) {
      const color = getRandomColor();
      const result = await calculateRoute(fromCoords, toCoords, color, i);
      document.getElementById('results').innerHTML += `
        <div class="route-info" style="border-left: 5px solid ${result.color};">
          Distance from <strong>${fromInputs[i].value}</strong> to <strong>${toInputs[i].value}</strong>: ${result.distance ? result.distance.toFixed(2) : 'N/A'} km
        </div>`;
      resultsData.push([fromInputs[i].value, toInputs[i].value, result.distance ? result.distance.toFixed(2) : 'N/A']);
    }
  }
});
// Download results as Excel
document.getElementById('download-results').addEventListener('click', function() {
  if (resultsData.length === 0) {
    alert('No results to download!');
    return;
  }
  const worksheet = XLSX.utils.aoa_to_sheet([['From', 'To', 'Distance (km)'], ...resultsData]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Routes');
  XLSX.writeFile(workbook, 'route_distances.xlsx');
});
