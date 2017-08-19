var Themeparks = require("themeparks");
const cors = require('cors');
const express = require('express');
let app = express();
app.use(cors());
app.options('*', cors());

var allParks = {};
for (var park in Themeparks.Parks) {
    var p = {};
    var parkObj = new Themeparks.Parks[park]();
    p.name = parkObj.Name;
    p.timezone = parkObj.Timezone;
    p.location = parkObj.Location.toString();
    allParks[park] = p; 
}

app.get('/getParks', function (req, res) {
    res.send(allParks);
})

app.get('/getParkOpeningTimes/:parkId', function (req, res) {
    var park = new Themeparks.Parks[req.params.parkId]();
    park.GetOpeningTimes().then(function (times) {
        res.send(times);
    }, console.error);
})

app.get('/getRides/:parkId', function (req, res) {
    var park = new Themeparks.Parks[req.params.parkId]();
    park.GetWaitTimes().then(function (rides) {
        res.send(rides);
    }, console.error);
})

app.listen(3000, function () {
  console.log('app listening on port 3000!')
})