



// geocoding api
// create add event listener
var searchBtn = document.getElementById("search-button");
searchBtn.addEventListener('click', searchCity);
// searchcity function
function searchCity() {
    var cityName = document.querySelector('.search-input').value;
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
         
// update content with api data
          if (data.length > 0) {
          var cityData = data[0];
          var Latitude = cityData.lat;
          var longitude = cityData.lon;
          //weather api
          var weatherUrl =`https://api.openweathermap.org/data/2.5/forecast?lat=${Latitude}&lon=${longitude}&appid=${apiKey}`;
          console.log(`city: ${cityData.name}, Latitude: ${cityData.lat}, longitude: ${cityData.lon}`);
         fetch(weatherUrl)
         .then(response => response.json())  
        .then(weatherData => {
             // handle weather api response and update content container
        var content1 = document.getElementById('content-container1');
        var content2 = document.getElementById('content-container2');
       
        content2.createElement()
        // update content with weather data
        console.log(weatherData);
        var firstForecast = weatherData.list[0];
        var temperature = firstForecast.main.temp;
        var description = firstForecast.weather[0].description;
        
        console.log('Description:', description);
         temperatureFarenheight = (temperature - 273.15) * 1.8 + 32
         console.log('Temperature:', temperatureFarenheight);
        })
        .catch(error => {
            console.error("Error:", error);
        });

           } else {
           throw new Error('No results found.');
       }
    })
       .catch(error => {
        console.error("Error:", error);

         });
         
       
  }

       

     

      