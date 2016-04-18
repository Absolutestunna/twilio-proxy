var express = require('express');
var request = require('request');
var app = express();
var cors = require('cors');

app.use(cors()); //allows overriding cross origin policy (use npm install if needed)



app.get('/sendSMS', function(req, res){ // listens for request on /food route
  var term = req.query.term; // grabs lat and lng queries from the request object
  var location = req.query.location;
  var radius = req.query.radius_filter;
  var category_filter = req.query.category_filter;
  yelp.search({
     term: term,
     location: location,
     radius_filter: radius,
     category_filter: category_filter
  })
  .then(function (data) {
    var chance = new Chance();
    var total = data.total;
    if(total <= 30){
      total = total - 1;
    }else{
      total = total / 2;
    }
    var offset = chance.natural({min: 0, max: total});
    // yelp.search w/ limit 1 and offset = random # - 1
    yelp.search({
       term: term,
       location: location,
       radius_filter: radius,
       limit: 1,
       offset: offset
    })
    .then(function (data) {
      res.send(data);
    })
    .catch(function (err) {
      console.error(err);
    });
  })
  .catch(function (err) {
    console.error(err);
  });

});



app.get('/test', function(req, res){ // listens for request on /api route
 console.log('working!');
 res.send('working!'); // if no errors, send the body of data back to front end
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Server running on port 3000');



// app.get('/api', function(req, res){ // listens for request on /api route
//   var lat = req.query.lat; // grabs lat and lng queries from the request object
//   var lng = req.query.lng;
//   request('https://api.brewerydb.com/v2/search/geo/point?lat=' + lat + '&lng=' + lng + '&type=beer&hasImages=Y&key=72a751214ab8b53056ac0a6d8376dc2d', function (error, response, body) { // api url
//     if (!error && response.statusCode === 200) {
//       console.log('beer');
//       res.send(body); // if no errors, send the body of data back to front end
//     }
//    });
// });
