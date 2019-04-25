'use strict';
// window.onload = window.scrollTo(0, 0)

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
                      ${responseJson[i].name}
                    </h3>
                    <p>
                      ${responseJson[i].brewery_type}
                    </p>
                    <address>
                      ${responseJson[i].city}, ${responseJson[i].state} ${responseJson[i].postal_code}</br>
                      ${responseJson[i].street} </br>
                      ${responseJson[i].phone}
                    </address>
                    <a href="${responseJson[i].website_url}" target="_blank">
                      ${responseJson[i].website_url}
                    </a>
                </li>`
           );
        }
    }
}
/*
brewery_type: "brewpub"
city: "Chicago"
country: "United States"
id: 2420
latitude: "41.70388555"
longitude: "-87.6819511632652"
name: "Horse Thief Hollow Brewery"
phone: "7737792739"
postal_code: "60643-2508"
state: "Illinois"
street: "10426 S Western Ave"
tag_list: []
updated_at: "2018-08-24T00:31:16.933Z"
website_url: "http://www.horsethiefbrewing.com"
__proto__: Object

*/
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
