var Themeparks = require("themeparks");
const cors = require('cors');
const express = require('express');
let app = express();
app.use(cors());
app.options('*', cors());
const PORT = 3000;

var cacheManager = require('cache-manager');
Themeparks.Settings.Cache = cacheManager.caching({
    store: require('cache-manager-fs-binary'),
    options: {
        reviveBuffers: false,
        binaryAsStream: true,
        ttl: 60 * 60,
        maxsize: 1000 * 1000 * 1000,
        path: 'diskcache',
        preventfill: false
    }
});

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
    }).catch(err => { console.log(err.message) });
})

app.get('/getRides/:parkId', function (req, res) {
    var park = new Themeparks.Parks[req.params.parkId]();
    park.GetWaitTimes().then(function (rides) {
        res.send(rides);
    }).catch(err => { console.log(err) });
})

app.listen(PORT, function () {
    console.log('🎢 Anti-Queue is running on port ' + PORT)
})