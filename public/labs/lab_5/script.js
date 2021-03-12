
function mapInit() {
  const mymap = L.map('mapid').setView([38.9897, -76.9378], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiZGJvbmdpb3YiLCJhIjoiY2ttNTc4bDY4MGJqeTJ3czM0YmYxanVtOCJ9.njZ_Y7Spnukzhs_vYvIRXA'
}).addTo(mymap);

  return mymap;
}

// define global constants
// fetch data from api and parse it as a json value
// add an eventListener on from waitng for submit button to be hit
// filter suggestions
// limit results (slice function) and put markers on map for only top 5 results
async function dataFilter() {
  const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json";

  const names = [];

  // 2 lines for async function

  const blob = await fetch('/api');
  const data = await request.json();

  /*
  fetch(endpoint).then(blob => console.log(blob))
  const prom = fetch(endpoint)
    .then((blob) => blob.json())
    .then((data) => names.push(...data));
  */

  function findMatches(wordToMatch, names) {
    return names.filter(restaurants => {
      const regex = new RegExp(wordToMatch, 'gi');
      return restaurants.name.match(regex);
    });
  }

  function displayMatches() {
    console.log(this.value);
    const matchArray = findMatches(this.value, names);
    const html = matchArray.map(restaurants => {
      const regex = new RegExp(this.value, 'gi');
      const restoName = restaurants.name.replace(regex, `<span class="hl">${this.value}</span>`);
      return `
        <li>
            <span class= "title">${restoName}</span>
            <span class= "address">${restaurants.address_line_1}</span>
            <span class= "city">${restaurants.city}</span>
            <span class= "category">${restaurants.category}</span>
        </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  const submitButton = document.querySelector('#submit');
  const search = document.querySelector('#zip');

  submitButton.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('submit fired', search.value);
    // eslint-disable-next-line max-len
    const filtered = data.filter((restaurants) => restaurants.zip.toUpperCase() === search.value.toUpperCase());
  });
}


window.onload = mapInit();