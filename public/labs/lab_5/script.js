

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
  const suggestions = document.querySelector('.suggestions');
  const request = await fetch('/api');
  const data = await request.json();

  form.addEventListener('submit', async (event) => {
    let marker;
    suggestions.innerText = '';
    marker = '';
    event.preventDefault();
    console.log('form submitted');

    const filtered = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
    const topFive = filtered.slice(0, 5);
    console.table(topFive);
   
    topFive.forEach((item) => {
      const longLat = item.geocoded_column_1.coordinates;
      console.log('markerLongLat', longLat[0], longLat[1]);
      marker = L.marker([longLat[1], longLat[0]]).addTo(mapFromLeaflet);

      const appendItem = document.createElement('li');
      appendItem.classList.add('block');
      appendItem.classList.add('list-item');
      appendItem.innerHTML = `<div class = "list-header is-size-5">
          <span class= "title">${item.name}</span>
          <span class= "address">${item.address_line_1}</span>
      </div>`;

      suggestions.append(appendItem);

      console.log(appendItem);
    });
  });
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;