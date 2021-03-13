

/* eslint-disable max-len */
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

async function dataHandler(mapFromLeaflet) {
  const form = document.querySelector('#search-form');
  const search = document.querySelector('#search');
  const targetList = document.querySelector('.target-list');

  const request = await fetch('/api');
  const data = await request.json();

  form.addEventListener('submit', async (event) => {

    event.preventDefault();
    console.log('form submitted');

    const filtered = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
    console.table(filtered);

    let count = 0;
    filtered.forEach((item) => {
      if (count < 5) {
        const longLat = item.geocoded_column_1.coordinates;
        console.log('markerLongLat', longLat[0], longLat[1]);
        const marker = L.marker([longLat[1], longLat[0]]).addTo(mapFromLeaflet);
        count++;
      }

      const appendItem = document.createElement('li');
      appendItem.classList.add('block');
      appendItem.classList.add('list-item');
      appendItem.innerHTML = '<div class = "list-header is-size-5">${item.name}</div><address class = "is-size-6">${item.adress_line_1}</address>';

      console.log(appendItem);
      displayMatches(filtered.slice(0, 5));
    });
  });
}

const suggestions = document.querySelector('.suggestions');

function displayMatches(matchArray) {
  console.log(this.value);
  const html = matchArray.map(restaurants => {
    const regex = new RegExp(this.value, 'gi');
    return `
        <li>
            <span class= "title">${restaurants.name}</span>
            <span class= "address">${restaurants.address_line_1}</span>
        </li>
        `;
  }).join('');
  suggestions.innerHTML = html;
}



async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

/*
Can't get the markers to disappear when a new search fires or get an empty string when the user search is empty

const searchInput = document.querySelector('.search');

searchInput.addEventListener('input', '');
*/

window.onload = windowActions;