const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
// create an empty array
  const cities = [];
//use fetch api
  fetch(endpoint)
          .then(blob=> blob.json())
          .then(data => cities.push(...data));

//run a function that will take in the massive array from the fetch api then filter it
// down into a subset and you can then listen for it

  function findMatches(wordToMatch, cities){
    return cities.filter((place)=>{
      //here we need to figure out if the city or state matches what was searched
      const regex = new RegExp(wordToMatch, "gi");
      return place.city.match(regex) || place.state.match(regex);
    });
  }
//put in commas
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

  function displayMatches() {
   const matchArray = findMatches(this.value, cities);
  const html = matchArray.map((place)=>{
    const regex = new RegExp(this.value,'gi');
    const cityName =  place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);

    return`
    <li>
    <span class="class">${cityName}, ${stateName}</span>
    <span class="class">${numberWithCommas(place.population)}</span>
</li>
     `;
   }).join('');
   suggestions.innerHTML=html;
   //console.log(matchArray);
  }


  const inputSearch = document.querySelector(".search");
  const suggestions= document.querySelector(".suggestions");

  inputSearch.addEventListener("change", displayMatches);
inputSearch.addEventListener("keyup", displayMatches);
