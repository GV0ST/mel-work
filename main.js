'use strict';
mapboxgl.accessToken = 'pk.eyJ1IjoibW1uZWlzbmVyIiwiYSI6ImNqdW83ZXp2ZjA5dDU0M2xqdXU0MXppbDAifQ.cFQxy45uArJw8aJfOLIQcw';

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${key}=${params[key]}`);
  return queryItems.join('&');
}
function displayBeerResults(responseJson) {
    // Clearing previous results
    $('#js-error-message').empty();
    $('.beerList').empty();
    // Looping through the response and formatting results
    for (let i = 0; i < responseJson.length; i++) {
        if (responseJson[i].brewery_type != 'planning') {
          console.log(responseJson[i])
          $('.beerList').append(`
                <li>
                  <h3>
                    <a href="${responseJson[i].website_url}" target="_blank">${responseJson[i].name}</a>
                  </h3>
                  <p>${responseJson[i].brewery_type}</p>
                  <p>${responseJson[i].city}</p>
                </li>`
           );
        }
    }
}

function getBeer (searchUrl, fullName) {
    // Setting up parameters
    const params = {
        by_city: fullName
    }
    // Creating url string
    const queryString = formatQueryParams(params);
    const url = searchUrl + '?' + queryString;
    // Fetch information, if there's an error display a message
    fetch(url)
    .then(response => {

        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => {
      displayBeerResults(responseJson)
    })
    .catch(err => {
        $('.js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

$('.getBeer').on('click', function(event) {
  event.preventDefault();
  //$('#second').removeClass('hidden');
  $('html,body').animate({
       scrollTop: $(".second").offset().top},
        'slow');
  let fullName = $('#searchBeer').val(); //.split?
  let searchURL = 'https://api.openbrewerydb.org/breweries';
  getBeer(searchURL, fullName);
  //load map goes here!!
});


//var map = new mapboxgl.Map({
  //  container: 'mapBox',
    //style: //'mapbox://styles/mmneisner/cjuoba9ua0p6k1flc33sds3o8'
//});
