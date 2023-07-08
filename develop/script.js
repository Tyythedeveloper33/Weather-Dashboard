//geocoding api


//weather api
`https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=7294cd9f83d12475284a0873d57ce046`
// geocoding api
// create add event listener
var searchBtn = document.getElementById("search-button")
searchBtn.addEventListener('click', searchCity)
function searchCity() {
    var cityName = document.querySelector('.search-input').value
    // statecode & countryCode is replaced with the appropriate state code & countryCode  if applied
    var stateCode = '';
    var countryCode = '';
    var limit = 1;
    var apiKey = '7294cd9f83d12475284a0873d57ce046'
    
    // geocoding url
   var geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`;

    // make api request
    fetch(geocodingUrl)
         .then(response => response.json())
         .then(data => {
            //handle the APi response and update the content containers
var content1 = document.getElementById('content-container1');
var content2 = document.getElementById('content-container2');


// update content with api data
if (data.length > 0) {
    var cityData = data[0];
   console.log(`city: ${cityData.name}, Latitude: ${cityData.lat}, longitude: ${cityData.lon}`);

} else {
    console.log('no results found.');
}

         })
         .catch(error => {
            console.error("Error:", error);
         });
            
}