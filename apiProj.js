'use strict';
window.onload = window.scrollTo(0, 0)

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
          $('.second').css('opacity', '1')
          $('.beerList').append(`
          <li>
              <h3 class="name">
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
