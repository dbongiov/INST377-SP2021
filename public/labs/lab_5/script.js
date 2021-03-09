function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  return map;
}

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