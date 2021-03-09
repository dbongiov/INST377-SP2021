function mapInit() {
  const mymap = L.map('mapid').setView([51.505, -0.09], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

const marker = L.marker([51.5, -0.09]).addTo(mymap);

//filter the data, eventlistener, 
//async function that filter data and have an eventlistener for when they type. Top5 search results function. Put first 5 into an array


  return mymap;
}



async function maps {
  console.log(windowloaded);
  constant m = mapScript();
  await dataFilter(m);
}




/*
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

let popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(mymap);

    function onMapClick(e) {
      alert("You clicked the map at " + e.latlng);
  }
  
  mymap.on('click', onMapClick);

  let popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

*/





async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers

  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const names = [];
  fetch(endpoint).then(blob => console.log(blob))
  const prom = fetch(endpoint)
    .then((blob) => blob.json())
    .then((data) => names.push(...data));

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
      const regex = new RegExp(this.value, 'gi') ;
      const restoName = restaurants.name.replace(regex, `<span class="hl">${this.value}</span>`);
      return  `
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

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;