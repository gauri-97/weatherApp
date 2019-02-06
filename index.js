var express = require('express');
var app = express();
var path = require('path');
var bodyParser=require('body-parser');
const request = require('request');
const argv = require('yargs').argv;
let http = require('http');
let fs = require('fs');
var cityname;
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.use(bodyParser.urlencoded({
    extended: true
}));

let apiKey = '97e714856ee5160ea8871926b3f51c30';

app.post("/", function (req, res) {
    console.log(req.body.city)
    cityname=req.body.city;
	let city = cityname || 'portland';
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    let weather = JSON.parse(body)
    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    res.send(message);
    console.log(message);
  }
});
});

 var port = 1111;
app.listen(port, function () {
  console.log(`Weather app listening on port ${port}!`);
});








