function mapInit() {
    const mymap = L.map('mapid').setView([51.505, -0.09], 13);
  
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
  
  
  /*
  async function maps {
    console.log(windowloaded);
    constant m = mapScript();
    await dataFilter(m);
  }
  */
  
  
  
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
  
    const zips = [];
  
    /*
    async function fetchEndpoint() {
      let response = await fetch(endpoint);
  
      let myBlob = await response.blob();
    }
  */
  
    fetch(endpoint).then(blob => console.log(blob))
    const prom = fetch(endpoint)
      .then((blob) => blob.json())
      .then((data) => zips.push(...data));
  
    function findMatches(wordToMatch, zips) {
      return zips.filter(restaurants => {
        const regex = new RegExp(wordToMatch, 'gi');
        return restaurants.zip.match(regex);
      });
    }
  
    function displayMatches() {
      console.log(this.value);
      const matchArray = findMatches(this.value, zips);
      const html = matchArray.map(restaurants => {
        const regex = new RegExp(this.value, 'gi') ;
        const restoZip = restaurants.zip.replace(regex, `<span class="hl">${this.value}</span>`);
        return  `
          <li>
              <span class= "title">${restoZip}</span>
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
    //do I sort and filter the suggestions I get?? Then reduce them??
  
    /* zips.sort();
       */
  
    /* My idea... Once I get the map working. When a zipcode 
    is typed in, on line 115 I should change it so an event listener only fires
    if someone clicks submit. Then I take the suggestions on line 104 and sort and filter 
    them for the correct zipcode and reduce them? Then 
    add a marker to each location? Not really sure how to do that though */
  
    //would I change one of these to submit???
    searchInput.addEventListener('submit', async(event) => {
      console.log('form submitted');
      const filtered = data.filter((restaurant) => restaurant.zip.includes(search.value) && restaurant.geocoded_column_1);
      console.table(filtered);
    })
  }
  
  async function windowActions() {
    const map = mapInit();
    await dataHandler(map);
  }
  
  window.onload = windowActions;