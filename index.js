const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

//displays index.html of root path
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

//invoked after hitting go in the html form
app.post("/", function(req, res) {
    
    // takes in the latitude and longitude from the html form, display in // console. Takes in as string.
        var lat = String(req.body.lat);
        var lon = String(req.body.lon);
        console.log(req.body.lat);
        console.log(req.body.lon);
    
    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
        const apiKey = "67f6b382921c1e89b39b20d4f9556f22";
        const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + units + "&APPID=" + apiKey;
    
    // this gets the data from Open WeatherPI
    https.get(url, function(response){
        console.log(response.statusCode);
        
        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const max_temp = weatherData.main.temp_max;
            const min_temp = weatherData.main.temp_min;
            const windDirection = weatherData.wind.deg;
            const windSpeed = weatherData.wind.speed;
            const location = weatherData.name; 
        
            
            // displays the output of the results
            res.write("<h1>For " + location +" the Max Temperature is " + max_temp + " Degrees and Min Temp is " + min_temp + " Degrees Fahrenheit <h1>");
            res.write("Wind Direction is " + windDirection + " degrees with wind speed of " + windSpeed+  " miles/hour");
            res.send();
        });
    });
})


//Commented out these lines in Repl
//Uncomment these lines when running on laptop
app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port")
});