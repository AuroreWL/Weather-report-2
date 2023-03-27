//hshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
}); 

app.post("/", function(req, res){
    const apiKey = "67501378363b360a83f387512b3c81af"
    const query = req.body.cityName
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey 
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on('data', function(data){
            const weatherData = JSON.parse(data)
            const temperature = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const weatherIcon = weatherData.weather[0].icon 
            const weatherIconURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
            
            res.write("<h1>The weather in " + query +" is " + weatherDescription + "</h1>");
            res.write("<p>and the temperature is " + temperature + "</p>");
            res.write("<img src =" + weatherIconURL + ">");
            res.send();
        })

    })
});




app.listen(3000, function(){
    console.log('server started on port 3000');
} );