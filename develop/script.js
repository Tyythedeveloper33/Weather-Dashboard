


// make day.js dates into variables for curent day & 5 day forecast
var currentDay = dayjs().format('M/D/YY');
const tomorrow = dayjs().add(1, 'day').format('M/D/YY');
const afterTomorrow = dayjs().add(2, 'day').format('M/D/YY');
const thirdDayAfterCurrent = dayjs().add(3, 'day').format('M/D/YY');
const forthDayAfterCurrent = dayjs().add(4, 'day').format('M/D/YY');
const fifthDayAfterCurrent = dayjs().add(5, 'day').format('M/D/YY');
// initialize search history in local storage if it doesnt exist
// Lets first check if there is a localStorage KEY
var savedData = localStorage.getItem('searchHistory');
if(!savedData) {
    // Initalize a search History KEY:VALUE --> localStorage
    localStorage.setItem('searchHistory', '[]' )
}


var searchHistory = document.getElementById('history');


// geocoding api
// create add event listener to search button
var searchBtn = document.getElementById("search-button");
searchBtn.addEventListener('click', searchCity);
// searchcity function
function searchCity() {
    var cityName = document.querySelector('.search-input').value;
    // get the saved search history from our localStorage
    var savedCities = localStorage.getItem('searchHistory');
    console.log("Saved Data: ", savedCities);  // --> "[]"
    console.log("Saved Type: ", typeof savedCities);  // --> string type


    // we need to convert the data into something more useful
    var parsedData = JSON.parse(savedCities);  // --> []  | JS object
   if(parsedData.includes(cityName)){
    //exit the function if the city exist
     return; 
     
// add the new city to the search history
    }
    parsedData.push(cityName);  // --> ["syracuse"]


    localStorage.setItem('searchHistory', JSON.stringify(parsedData));

    


//perform api request and update the content with weather data
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


          // make fetch request to get current day by using diffent endpoint , instead of forecast its going to say weather
          var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
          fetch(currentWeatherUrl)
          .then(response => response.json())  
         .then(currentWeatherData => {
            // update content with weather data
            console.log("current day weather:", currentWeatherData);
            console.log("_____________________________________________________________")
            console.log(currentDay)
        console.log("Current-Day-Temp", currentWeatherData.main.temp)
        console.log("Current-Day-humidity", currentWeatherData.main.humidity)
        console.log("Current-Day-wind", currentWeatherData.wind.speed)
        console.log("_____________________________________________________________");
         appendDataCurrent(currentDay, currentWeatherData.main.temp,currentWeatherData.main.humidity,currentWeatherData.wind.speed,cityName, )
         });
       
          //weather api
          var weatherUrl =`https://api.openweathermap.org/data/2.5/forecast?lat=${Latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
          console.log("_____________________________________________________________")
          console.log(`city: ${cityData.name}, Latitude: ${cityData.lat}, longitude: ${cityData.lon}`);
          console.log("_____________________________________________________________")
 
       
         fetch(weatherUrl)
         .then(response => response.json())  
        .then(weatherData => {
           
       
        // update content with weather data
        console.log(weatherData);
       
       
       
        console.log("_____________________________________________________________");
 


        //adding temperature from weather api
         var addedTemp1 = weatherData.list[0].main.temp + weatherData.list[1].main.temp + weatherData.list[2].main.temp + weatherData.list[3].main.temp + weatherData.list[4].main.temp + weatherData.list[5].main.temp + weatherData.list[6].main.temp + weatherData.list[7].main.temp
         var averageTemperature = (addedTemp1/8)
         console.log(tomorrow)
         console.log('Day-2 (avg-temp):', averageTemperature);
         // adding humidity for day 2
         var addedHumidity = weatherData.list[0].main.humidity + weatherData.list[1].main.humidity + weatherData.list[2].main.humidity + weatherData.list[3].main.humidity + weatherData.list[4].main.humidity + weatherData.list[5].main.humidity + weatherData.list[6].main.humidity + weatherData.list[7].main.humidity
          var averageHumidity = (addedHumidity / 8)
         console.log('day-2 (avg- humidity):', averageHumidity)
       
         // make first forecast variable into a variable the contains first 7 json object temperatures to be able to get an average per day
        // adding average wind need to know if speed
        var addedWind = weatherData.list[0].wind.speed + weatherData.list[1].wind.speed + weatherData.list[2].wind.speed + weatherData.list[3].wind.speed + weatherData.list[4].wind.speed + weatherData.list[5].wind.speed + weatherData.list[6].wind.speed + weatherData.list[7].wind.speed
         var averagewind = ( addedWind/8);
        console.log(" Day-2 wind(MPH)" , averagewind);
        console.log("_____________________________________________________________")
 
         // geting 3rd day average temp
         var addedTemp2 = weatherData.list[8].main.temp + weatherData.list[9].main.temp + weatherData.list[10].main.temp + weatherData.list[11].main.temp + weatherData.list[12].main.temp + weatherData.list[13].main.temp + weatherData.list[14].main.temp + weatherData.list[15].main.temp
         var averageTemperature1 = (addedTemp2/8)
          console.log(afterTomorrow)
         console.log('Day-3 (avg-temp):', averageTemperature1);
          // adding humidity for day 3
          var addedHumidity1 = weatherData.list[8].main.humidity + weatherData.list[9].main.humidity + weatherData.list[10].main.humidity + weatherData.list[11].main.humidity + weatherData.list[12].main.humidity + weatherData.list[13].main.humidity + weatherData.list[14].main.humidity + weatherData.list[15].main.humidity
           var averageHumidity1 = (addedHumidity1 / 8)
          console.log('day-3 (avg- humidity):', averageHumidity1)


            // adding average wind need to know if speed
        var addedWind1 = weatherData.list[8].wind.speed + weatherData.list[9].wind.speed + weatherData.list[10].wind.speed + weatherData.list[11].wind.speed + weatherData.list[12].wind.speed + weatherData.list[13].wind.speed + weatherData.list[14].wind.speed + weatherData.list[15].wind.speed
        var averagewind1 = ( addedWind1/8);
        console.log(" Day-3 wind(MPH)" , averagewind1);
        console.log("_____________________________________________________________")
 
         // geting 4rd day average temp
         var addedTemp3 = weatherData.list[16].main.temp + weatherData.list[17].main.temp + weatherData.list[18].main.temp + weatherData.list[19].main.temp + weatherData.list[20].main.temp + weatherData.list[21].main.temp + weatherData.list[22].main.temp + weatherData.list[23].main.temp
         var averageTemperature2 = (addedTemp3/8)
         console.log(thirdDayAfterCurrent)
         console.log('Day-4 (avg-temp):', averageTemperature2);
          // adding humidity for day 4
          var addedHumidity2 = weatherData.list[16].main.humidity + weatherData.list[17].main.humidity + weatherData.list[18].main.humidity + weatherData.list[19].main.humidity + weatherData.list[20].main.humidity + weatherData.list[21].main.humidity + weatherData.list[22].main.humidity + weatherData.list[23].main.humidity
           var averageHumidity2 = (addedHumidity2 / 8)
          console.log('day-4 (avg- humidity):', averageHumidity2)


            // adding average wind need to know if speed
        var addedWind2 = weatherData.list[16].wind.speed + weatherData.list[17].wind.speed + weatherData.list[18].wind.speed + weatherData.list[19].wind.speed + weatherData.list[20].wind.speed + weatherData.list[21].wind.speed + weatherData.list[22].wind.speed + weatherData.list[23].wind.speed
       var averagewind2 = ( addedWind2/8);
        console.log(" Day-4 wind(MPH)" , averagewind2);
        console.log("_____________________________________________________________")
 
         // geting 5th day average temp
         var addedTemp4 = weatherData.list[24].main.temp + weatherData.list[25].main.temp + weatherData.list[26].main.temp + weatherData.list[27].main.temp + weatherData.list[28].main.temp + weatherData.list[29].main.temp + weatherData.list[30].main.temp + weatherData.list[31].main.temp
         var averageTemperature3 = (addedTemp4/8)
         console.log(forthDayAfterCurrent)
         console.log('Day-5 (avg-temp):', averageTemperature3);
         // adding humidity for day 5
         var addedHumidity3 = weatherData.list[24].main.humidity + weatherData.list[25].main.humidity + weatherData.list[26].main.humidity + weatherData.list[27].main.humidity + weatherData.list[28].main.humidity + weatherData.list[29].main.humidity + weatherData.list[30].main.humidity + weatherData.list[31].main.humidity
         var averageHumidity3 = (addedHumidity3 / 8)
        console.log('day-5 (avg- humidity):', averageHumidity3)
       
       
            // adding average wind need to know if speed
            var addedWind3 = weatherData.list[24].wind.speed + weatherData.list[25].wind.speed + weatherData.list[26].wind.speed + weatherData.list[27].wind.speed + weatherData.list[28].wind.speed + weatherData.list[29].wind.speed + weatherData.list[30].wind.speed + weatherData.list[31].wind.speed
            var averagewind3 = ( addedWind3/8);
             console.log(" Day-5 wind(MPH)" , averagewind3);
             console.log("_____________________________________________________________")
 
         // geting 6th day average temp
         var addedTemp5 = weatherData.list[32].main.temp + weatherData.list[33].main.temp + weatherData.list[34].main.temp + weatherData.list[35].main.temp + weatherData.list[36].main.temp + weatherData.list[37].main.temp + weatherData.list[38].main.temp + weatherData.list[39].main.temp
         var averageTemperature4 = (addedTemp5/8)
         console.log(fifthDayAfterCurrent)
         console.log('Day-6 (avg-temp):', averageTemperature4);
         // adding humidity for day 6
         var addedHumidity4 = weatherData.list[32].main.humidity + weatherData.list[33].main.humidity + weatherData.list[34].main.humidity + weatherData.list[35].main.humidity + weatherData.list[36].main.humidity + weatherData.list[37].main.humidity + weatherData.list[38].main.humidity + weatherData.list[39].main.humidity
         var averageHumidity4 = (addedHumidity4 / 8)
        console.log('day-6 (avg- humidity):', averageHumidity4)


         // adding average wind need to know if speed
         var addedWind4 = weatherData.list[32].wind.speed + weatherData.list[33].wind.speed + weatherData.list[34].wind.speed + weatherData.list[35].wind.speed + weatherData.list[36].wind.speed + weatherData.list[37].wind.speed + weatherData.list[38].wind.speed + weatherData.list[39].wind.speed
         var averagewind4 = ( addedWind4/8);
          console.log(" Day-6 wind(MPH)" , averagewind4);
         
        appendDataForecast(tomorrow, averageTemperature, averageHumidity, averagewind, afterTomorrow,averageTemperature1,averageHumidity1, averagewind1, thirdDayAfterCurrent, averageTemperature2, averageHumidity2, averagewind2, forthDayAfterCurrent, averageTemperature3, averageHumidity3, averagewind3, fifthDayAfterCurrent, averageTemperature4, averageHumidity4, averagewind4);
          //code for for processing and displaying forecast data
          showHistory();
        // refresh the search history display
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
//function to display the search history
  function showHistory(stateCode,countryCode,limit,apiKey) {


    // We should CLEAR the existing data in our HISTORY CONTAINER
    
    // 1) we should grab the CURRENT history data
    var history = localStorage.getItem('searchHistory');


    // 2) convert it to should useful  --> JS ARRAY []
    var historyArr = JSON.parse(history);


    // 3) Loop thorugh the array  to create city bttns
    for(let i = 0; i < historyArr.length; i++) {
        var cityName = historyArr[i];
        // check if the button for city exist already
        if(! document.getElementById(cityName)) {
        // we should dynamically create a new HTML element (BUTTON)
        let newButton = document.createElement("button");
        // we need to add the TEXT CONTENT to the element
        newButton.textContent = cityName
        // (maybe) we need id or class attribute added
        newButton.id = cityName;
        // We want to listen for a CLICK event (addEventlistener -> each button))
        newButton.addEventListener('click', function(e) {
            var cityName = newButton.id ;
           e.preventDefault()
           buttonCity(cityName)
            
        })
        // 4) we APPEND or add it to the DOM
        searchHistory.append(newButton);
      }  
      
    }


}
showHistory()

function buttonCity(cityName){
   
    var stateCodee = '';
    var countryCodee = '';
    var limitt = 1;
    var apiKeyy = '7294cd9f83d12475284a0873d57ce046'

    var geocodingUrll = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCodee},${countryCodee}&limit=${limitt}&appid=${apiKeyy}`;
 
     // make api request
     fetch(geocodingUrll)
     .then(response => response.json())
     .then(Geodata => {

    if (Geodata.length > 0){
     // update content with api data
      
      var cityDataa = Geodata[0];
      var Latitudee = cityDataa.lat;
      var longitudee = cityDataa.lon;

    }

 
      // make fetch request to get current day by using diffent endpoint , instead of forecast its going to say weather
      var currentWeatherUrll = `https://api.openweathermap.org/data/2.5/weather?lat=${Latitudee}&lon=${longitudee}&units=imperial&appid=${apiKeyy}`;
      fetch(currentWeatherUrll)
      .then(response => response.json())  
     .then(ccurrentWeatherData => {
        // update content with weather data
        console.log("current day weather:", ccurrentWeatherData);
        console.log("_____________________________________________________________")
        console.log(currentDay)
    console.log("Current-Day-Temp", ccurrentWeatherData.main.temp)
    console.log("Current-Day-humidity", ccurrentWeatherData.main.humidity)
    console.log("Current-Day-wind", ccurrentWeatherData.wind.speed)
    console.log("_____________________________________________________________")

})
 //weather api
 var weatherUrll =`https://api.openweathermap.org/data/2.5/forecast?lat=${Latitudee}&lon=${longitudee}&units=imperial&appid=${apiKeyy}`;
 console.log("_____________________________________________________________")
 console.log(`city: ${cityDataa.name}, Latitude: ${cityDataa.lat}, longitude: ${cityDataa.lon}`);
 console.log("_____________________________________________________________")
 
 fetch(weatherUrll)
 .then(response => response.json())  
.then(weatherDataa => {
   

// update content with weather data
console.log(weatherDataa);



console.log("_____________________________________________________________");

        //adding temperature from weather api
        var addedTemp1 = weatherDataa.list[0].main.temp + weatherDataa.list[1].main.temp + weatherDataa.list[2].main.temp + weatherDataa.list[3].main.temp + weatherDataa.list[4].main.temp + weatherDataa.list[5].main.temp + weatherDataa.list[6].main.temp + weatherDataa.list[7].main.temp
        var averageTemperature = (addedTemp1/8)
        console.log(tomorrow)
        console.log('Day-2 (avg-temp):', averageTemperature);
        // adding humidity for day 2
        var addedHumidity = weatherDataa.list[0].main.humidity + weatherDataa.list[1].main.humidity + weatherDataa.list[2].main.humidity + weatherDataa.list[3].main.humidity + weatherDataa.list[4].main.humidity + weatherDataa.list[5].main.humidity + weatherDataa.list[6].main.humidity + weatherDataa.list[7].main.humidity
         var averageHumidity = (addedHumidity / 8)
        console.log('day-2 (avg- humidity):', averageHumidity)
      
        // make first forecast variable into a variable the contains first 7 json object temperatures to be able to get an average per day
       // adding average wind need to know if speed
       var addedWind = weatherDataa.list[0].wind.speed + weatherDataa.list[1].wind.speed + weatherDataa.list[2].wind.speed + weatherDataa.list[3].wind.speed + weatherDataa.list[4].wind.speed + weatherDataa.list[5].wind.speed + weatherDataa.list[6].wind.speed + weatherDataa.list[7].wind.speed
        var averagewind = ( addedWind/8);
       console.log(" Day-2 wind(MPH)" , averagewind);
       console.log("_____________________________________________________________")
  // geting 3rd day average temp
        var addedTemp2 = weatherDataa.list[8].main.temp + weatherDataa.list[9].main.temp + weatherDataa.list[10].main.temp + weatherDataa.list[11].main.temp + weatherDataa.list[12].main.temp + weatherDataa.list[13].main.temp + weatherDataa.list[14].main.temp + weatherDataa.list[15].main.temp
        var averageTemperature1 = (addedTemp2/8)
        console.log(afterTomorrow)
        console.log('Day-3 (avg-temp):', averageTemperature1);
   // adding humidity for day 3
        var addedHumidity1 = weatherDataa.list[8].main.humidity + weatherDataa.list[9].main.humidity + weatherDataa.list[10].main.humidity + weatherDataa.list[11].main.humidity + weatherDataa.list[12].main.humidity + weatherDataa.list[13].main.humidity + weatherDataa.list[14].main.humidity + weatherDataa.list[15].main.humidity
            var averageHumidity1 = (addedHumidity1 / 8)
        console.log('day-3 (avg- humidity):', averageHumidity1)


     // adding average wind need to know if speed
        var addedWind1 = weatherDataa.list[8].wind.speed + weatherDataa.list[9].wind.speed + weatherDataa.list[10].wind.speed + weatherDataa.list[11].wind.speed + weatherDataa.list[12].wind.speed + weatherDataa.list[13].wind.speed + weatherDataa.list[14].wind.speed + weatherDataa.list[15].wind.speed
        var averagewind1 = ( addedWind1/8);
        console.log(" Day-3 wind(MPH)" , averagewind1);
        console.log("_____________________________________________________________")
        // geting 4rd day average temp
        var addedTemp3 = weatherDataa.list[16].main.temp + weatherDataa.list[17].main.temp + weatherDataa.list[18].main.temp + weatherDataa.list[19].main.temp + weatherDataa.list[20].main.temp + weatherDataa.list[21].main.temp + weatherDataa.list[22].main.temp + weatherDataa.list[23].main.temp
        var averageTemperature2 = (addedTemp3/8)
        console.log(thirdDayAfterCurrent)
        console.log('Day-4 (avg-temp):', averageTemperature2);
        // adding humidity for day 4
        var addedHumidity2 = weatherDataa.list[16].main.humidity + weatherDataa.list[17].main.humidity + weatherDataa.list[18].main.humidity + weatherDataa.list[19].main.humidity + weatherDataa.list[20].main.humidity + weatherDataa.list[21].main.humidity + weatherDataa.list[22].main.humidity + weatherDataa.list[23].main.humidity
            var averageHumidity2 = (addedHumidity2 / 8)
        console.log('day-4 (avg- humidity):', averageHumidity2)


            // adding average wind need to know if speed
        var addedWind2 = weatherDataa.list[16].wind.speed + weatherDataa.list[17].wind.speed + weatherDataa.list[18].wind.speed + weatherDataa.list[19].wind.speed + weatherDataa.list[20].wind.speed + weatherDataa.list[21].wind.speed + weatherDataa.list[22].wind.speed + weatherDataa.list[23].wind.speed
        var averagewind2 = ( addedWind2/8);
        console.log(" Day-4 wind(MPH)" , averagewind2);
        console.log("_____________________________________________________________")
            // geting 5th day average temp
            var addedTemp4 = weatherDataa.list[24].main.temp + weatherDataa.list[25].main.temp + weatherDataa.list[26].main.temp + weatherDataa.list[27].main.temp + weatherDataa.list[28].main.temp + weatherDataa.list[29].main.temp + weatherDataa.list[30].main.temp + weatherDataa.list[31].main.temp
            var averageTemperature3 = (addedTemp4/8)
            console.log(forthDayAfterCurrent)
            console.log('Day-5 (avg-temp):', averageTemperature3);
            // adding humidity for day 5
            var addedHumidity3 = weatherDataa.list[24].main.humidity + weatherDataa.list[25].main.humidity + weatherDataa.list[26].main.humidity + weatherDataa.list[27].main.humidity + weatherDataa.list[28].main.humidity + weatherDataa.list[29].main.humidity + weatherDataa.list[30].main.humidity + weatherDataa.list[31].main.humidity
            var averageHumidity3 = (addedHumidity3 / 8)
            console.log('day-5 (avg- humidity):', averageHumidity3)


                // adding average wind need to know if speed
                var addedWind3 = weatherDataa.list[24].wind.speed + weatherDataa.list[25].wind.speed + weatherDataa.list[26].wind.speed + weatherDataa.list[27].wind.speed + weatherDataa.list[28].wind.speed + weatherDataa.list[29].wind.speed + weatherDataa.list[30].wind.speed + weatherDataa.list[31].wind.speed
                var averagewind3 = ( addedWind3/8);
                console.log(" Day-5 wind(MPH)" , averagewind3);
                console.log("_____________________________________________________________")
                        
                // geting 6th day average temp
                var addedTemp5 = weatherDataa.list[32].main.temp + weatherDataa.list[33].main.temp + weatherDataa.list[34].main.temp + weatherDataa.list[35].main.temp + weatherDataa.list[36].main.temp + weatherDataa.list[37].main.temp + weatherDataa.list[38].main.temp + weatherDataa.list[39].main.temp
                var averageTemperature4 = (addedTemp5/8)
                console.log(fifthDayAfterCurrent)
                console.log('Day-6 (avg-temp):', averageTemperature4);
                // adding humidity for day 6
                var addedHumidity4 = weatherDataa.list[32].main.humidity + weatherDataa.list[33].main.humidity + weatherDataa.list[34].main.humidity + weatherDataa.list[35].main.humidity + weatherDataa.list[36].main.humidity + weatherDataa.list[37].main.humidity + weatherDataa.list[38].main.humidity + weatherDataa.list[39].main.humidity
                var averageHumidity4 = (addedHumidity4 / 8)
                console.log('day-6 (avg- humidity):', averageHumidity4)


                // adding average wind need to know if speed
                var addedWind4 = weatherDataa.list[32].wind.speed + weatherDataa.list[33].wind.speed + weatherDataa.list[34].wind.speed + weatherDataa.list[35].wind.speed + weatherDataa.list[36].wind.speed + weatherDataa.list[37].wind.speed + weatherDataa.list[38].wind.speed + weatherDataa.list[39].wind.speed
                var averagewind4 = ( addedWind4/8);
                console.log(" Day-6 wind(MPH)" , averagewind4);


     })
 
     
     })
    }






 function appendDataCurrent(currentDay, averageTemperature,averageHumidity,averagewind, cityName) {
// select content containers
var containerTop = document.getElementById("search-container1");

//create elements for displaying data (current day)
 var displayDate = document.createElement('h1');
 var displayTemp = document.createElement('p');
 var displayHumidity = document.createElement('p');
 var displaywind = document.createElement('p');
 // set text content for each element
 displayDate.textContent = cityName + ':' + '('+currentDay + ')';
 displayTemp.textContent = 'Temp:'+ averageTemperature;
 displayHumidity.textContent = 'Humidity:'+ averageHumidity;
 displaywind.textContent = 'Wind:(mph):'+ averagewind;

//Append texte content   (current day)
containerTop.appendChild(displayDate);
displayDate.appendChild(displayTemp);
displayTemp.appendChild(displayHumidity);
displayHumidity.appendChild(displaywind);
 displayDate.className = displayDate;
 displayTemp.className = displayTemp;
 displayHumidity.className = displayHumidity;
 displaywind.className = displaywind;
 
 }

 function appendDataForecast(tomorrow, averageTemperature, averageHumidity, averagewind, afterTomorrow,averageTemperature1,averageHumidity1, averagewind1,thirdDayAfterCurrent, averageTemperature2, averageHumidity2, averagewind2,  forthDayAfterCurrent, averageTemperature3, averageHumidity3, averagewind3, fifthDayAfterCurrent, averageTemperature4, averageHumidity4, averagewind4){
    // select content containers
    var bottomBox1 = document.getElementById("box-1");
// appending 2nd day in bottom container box-1
 // makeing date element
 var displayDate = document.createElement('h1');
 displayDate.textContent = '(' + tomorrow + ')';
//making temperature el
 var displayTemp1 = document.createElement('p');
 displayTemp1.textContent = 'Temp:' + averageTemperature ;
 // making humidity el
 var displayHumidity = document.createElement('p');
 displayHumidity.textContent = 'Humidity:'+ averageHumidity;
 //making wind element
 var displaywind = document.createElement('p');
 displaywind.textContent = 'Wind:(mph):'+ averagewind;
 // append text content for day-2 box-1 forecast
 bottomBox1.appendChild(displayDate);
 displayDate.appendChild(displayTemp1);
 displayTemp1.appendChild(displayHumidity);
 displayHumidity.appendChild(displaywind);
  displayDate.className = displayDate;
  displayTemp1.className = displayTemp1;
  displayHumidity.className = displayHumidity;
  displaywind.className = displaywind;
  // box 2 appending data 
  var bottomBox2 = document.getElementById("box-2");
  // appending 2nd day in bottom container box-1
   // makeing date element
   var displayDate1 = document.createElement('h1');
   displayDate1.textContent = '(' + afterTomorrow + ')';
  //making temperature el
   var displayTemp2 = document.createElement('p');
   displayTemp2.textContent = 'Temp:' + averageTemperature1 ;
   // making humidity el
   var displayHumidity1 = document.createElement('p');
   displayHumidity1.textContent = 'Humidity:'+ averageHumidity1;
   //making wind element
   var displaywind1 = document.createElement('p');
   displaywind1.textContent = 'Wind:(mph):'+ averagewind1;
   // append text content for day-2 box-1 forecast
   bottomBox2.appendChild(displayDate1);
   displayDate1.appendChild(displayTemp2);
   displayTemp2.appendChild(displayHumidity1);
   displayHumidity1.appendChild(displaywind1);
    displayDate1.className = displayDate;
    displayTemp2.className = displayTemp1;
    displayHumidity1.className = displayHumidity;
    displaywind1.className = displaywind;
     // box 3 appending data 
  var bottomBox3 = document.getElementById("box-3");
  // appending 2nd day in bottom container box-1
   // makeing date element
   var displayDate2 = document.createElement('h1');
   displayDate2.textContent = '(' + thirdDayAfterCurrent + ')';
  //making temperature el
   var displayTemp3 = document.createElement('p');
   displayTemp3.textContent = 'Temp:' + averageTemperature2 ;
   // making humidity el
   var displayHumidity2 = document.createElement('p');
   displayHumidity2.textContent = 'Humidity:'+ averageHumidity2;
   //making wind element
   var displaywind2 = document.createElement('p');
   displaywind2.textContent = 'Wind:(mph):'+ averagewind2;
   // append text content for day-2 box-1 forecast
   bottomBox3.appendChild(displayDate2);
   displayDate2.appendChild(displayTemp3);
   displayTemp3.appendChild(displayHumidity2);
   displayHumidity2.appendChild(displaywind2);
    displayDate2.className = displayDate;
    displayTemp3.className = displayTemp1;
    displayHumidity2.className = displayHumidity;
    displaywind2.className = displaywind;
     // box 4 appending data 
  var bottomBox4 = document.getElementById("box-4");
  // appending 2nd day in bottom container box-1
   // makeing date element
   var displayDate3 = document.createElement('h1');
   displayDate3.textContent = '(' + forthDayAfterCurrent + ')';
  //making temperature el
   var displayTemp4 = document.createElement('p');
   displayTemp4.textContent = 'Temp:' + averageTemperature3 ;
   // making humidity el
   var displayHumidity3 = document.createElement('p');
   displayHumidity3.textContent = 'Humidity:'+ averageHumidity3;
   //making wind element
   var displaywind3 = document.createElement('p');
   displaywind3.textContent = 'Wind:(mph):'+ averagewind3;
   // append text content for day-2 box-1 forecast
   bottomBox4.appendChild(displayDate3);
   displayDate3.appendChild(displayTemp4);
   displayTemp4.appendChild(displayHumidity3);
   displayHumidity3.appendChild(displaywind3);
    displayDate3.className = displayDate;
    displayTemp4.className = displayTemp1;
    displayHumidity3.className = displayHumidity;
    displaywind3.className = displaywind;
      // box 5 appending data 
  var bottomBox5 = document.getElementById("box-5");
  // appending 2nd day in bottom container box-1
   // makeing date element
   var displayDate4 = document.createElement('h1');
   displayDate4.textContent = '(' + fifthDayAfterCurrent + ')';
  //making temperature el
   var displayTemp5 = document.createElement('p');
   displayTemp5.textContent = 'Temp:' + averageTemperature4 ;
   // making humidity el
   var displayHumidity4 = document.createElement('p');
   displayHumidity4.textContent = 'Humidity:'+ averageHumidity4;
   //making wind element
   var displaywind4 = document.createElement('p');
   displaywind4.textContent = 'Wind:(mph):'+ averagewind4;
   // append text content for day-2 box-1 forecast
   bottomBox5.appendChild(displayDate4);
   displayDate4.appendChild(displayTemp5);
   displayTemp5.appendChild(displayHumidity4);
   displayHumidity4.appendChild(displaywind4);
    displayDate4.className = displayDate;
    displayTemp5.className = displayTemp1;
    displayHumidity4.className = displayHumidity;
    displaywind4.className = displaywind;
 }
 
 //if(content1.innerHTML !== ''){
  //  content1.innerHTML = '';
  //  content2.innerHTML = '';
 //} else {
  //  if(content1.innerHTML === ''){
    // create list to hold the data


//var content1 = document.getElementById('content-container1');
// var content2 = document.getElementById('content-container2');


//var list = document.createElement('ul')
 //var currentDayItem = document.createElement('li')
 //currentDayItem.innerHTML = currentDay;
// list.appendChild(currentDayItem)
// content1.appendChild(list)




 //}
// }
 //}
 //appendData()
