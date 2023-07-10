



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
       
        
        // update content with weather data 
        console.log(weatherData);
        
        
       
        // make first forecast variable into a variable the contains first 7 json object temperatures to be able to get an average per day
        // adding average wind need to know if speed + gust = wind mph!
        var addedWind = weatherData.list[0].wind.speed + weatherData.list[1].wind.speed + weatherData.list[2].wind.speed + weatherData.list[3].wind.speed + weatherData.list[4].wind.speed + weatherData.list[5].wind.speed + weatherData.list[6].wind.speed + weatherData.list[7].wind.speed
        averagewind = ( addedWind/8);
        console.log(averagewind);

        //adding temperature from weather api
         var addedTemp1 = weatherData.list[0].main.temp + weatherData.list[1].main.temp + weatherData.list[2].main.temp + weatherData.list[3].main.temp + weatherData.list[4].main.temp + weatherData.list[5].main.temp + weatherData.list[6].main.temp + weatherData.list[7].main.temp
         var averageTempKelvin = (addedTemp1/8)
         temperatureFarenheight = (averageTempKelvin - 273.15) * 1.8 + 32
         console.log('Day-2 (avg-temp):', temperatureFarenheight);
         // adding humidity for day 2
         var addedHumidity = weatherData.list[0].main.humidity + weatherData.list[1].main.humidity + weatherData.list[2].main.humidity + weatherData.list[3].main.humidity + weatherData.list[4].main.humidity + weatherData.list[5].main.humidity + weatherData.list[6].main.humidity + weatherData.list[7].main.humidity
          var averageHumidity = (addedHumidity / 8)
         console.log('day-2 (avg- humidity):', averageHumidity)

         // geting 3rd day average temp
         var addedTemp2 = weatherData.list[8].main.temp + weatherData.list[9].main.temp + weatherData.list[10].main.temp + weatherData.list[11].main.temp + weatherData.list[12].main.temp + weatherData.list[13].main.temp + weatherData.list[14].main.temp + weatherData.list[15].main.temp
         var averageTempKelvin2 = (addedTemp2/8)
         temperatureFarenheight2 = (averageTempKelvin2 - 273.15) * 1.8 + 32
         console.log('Day-3 (avg-temp):', temperatureFarenheight2);
          // adding humidity for day 3
          var addedHumidity1 = weatherData.list[8].main.humidity + weatherData.list[9].main.humidity + weatherData.list[10].main.humidity + weatherData.list[11].main.humidity + weatherData.list[12].main.humidity + weatherData.list[13].main.humidity + weatherData.list[14].main.humidity + weatherData.list[15].main.humidity
           var averageHumidity1 = (addedHumidity1 / 8)
          console.log('day-3 (avg- humidity):', averageHumidity1)

         // geting 4rd day average temp
         var addedTemp3 = weatherData.list[16].main.temp + weatherData.list[17].main.temp + weatherData.list[18].main.temp + weatherData.list[19].main.temp + weatherData.list[20].main.temp + weatherData.list[21].main.temp + weatherData.list[22].main.temp + weatherData.list[23].main.temp
         var averageTempKelvin3 = (addedTemp3/8)
         temperatureFarenheight3 = (averageTempKelvin3 - 273.15) * 1.8 + 32
         console.log('Day-4 (avg-temp):', temperatureFarenheight3);
          // adding humidity for day 4
          var addedHumidity2 = weatherData.list[16].main.humidity + weatherData.list[17].main.humidity + weatherData.list[18].main.humidity + weatherData.list[19].main.humidity + weatherData.list[20].main.humidity + weatherData.list[21].main.humidity + weatherData.list[22].main.humidity + weatherData.list[23].main.humidity
           var averageHumidity2 = (addedHumidity2 / 8)
          console.log('day-4 (avg- humidity):', averageHumidity2)

         // geting 5th day average temp
         var addedTemp4 = weatherData.list[24].main.temp + weatherData.list[25].main.temp + weatherData.list[26].main.temp + weatherData.list[27].main.temp + weatherData.list[28].main.temp + weatherData.list[29].main.temp + weatherData.list[30].main.temp + weatherData.list[31].main.temp
         var averageTempKelvin4 = (addedTemp4/8)
         temperatureFarenheight4 = (averageTempKelvin4 - 273.15) * 1.8 + 32
         console.log('Day-5 (avg-temp):', temperatureFarenheight4);
         // adding humidity for day 5
         var addedHumidity3 = weatherData.list[24].main.humidity + weatherData.list[25].main.humidity + weatherData.list[26].main.humidity + weatherData.list[27].main.humidity + weatherData.list[28].main.humidity + weatherData.list[29].main.humidity + weatherData.list[30].main.humidity + weatherData.list[31].main.humidity
         var averageHumidity3 = (addedHumidity3 / 8)
        console.log('day-5 (avg- humidity):', averageHumidity3)
        
         // geting 6th day average temp
         var addedTemp5 = weatherData.list[32].main.temp + weatherData.list[33].main.temp + weatherData.list[34].main.temp + weatherData.list[35].main.temp + weatherData.list[36].main.temp + weatherData.list[37].main.temp + weatherData.list[38].main.temp + weatherData.list[39].main.temp
         var averageTempKelvin5 = (addedTemp5/8)
         temperatureFarenheight5 = (averageTempKelvin5 - 273.15) * 1.8 + 32
         console.log('Day-6 (avg-temp):', temperatureFarenheight5);
         // adding humidity for day 6
         var addedHumidity4 = weatherData.list[32].main.humidity + weatherData.list[33].main.humidity + weatherData.list[34].main.humidity + weatherData.list[35].main.humidity + weatherData.list[36].main.humidity + weatherData.list[37].main.humidity + weatherData.list[38].main.humidity + weatherData.list[39].main.humidity
         var averageHumidity4 = (addedHumidity4 / 8)
        console.log('day-6 (avg- humidity):', averageHumidity4)
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

       

     // make first forecast variable into a variable the contains first 7 json object temperatures to be able to get an average per day

      