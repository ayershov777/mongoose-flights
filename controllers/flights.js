const Flight = require('../models/flight');

module.exports = {
    index,
    new: newFlight,
    create: createFlight
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        if(err) console.log(err);
        res.render('flights/index', {
            title: 'Flights list',
            flights
        });
    });
}

function newFlight(req, res) {
    res.render('flights/new', {
        title: 'new flight'
    });
}

function createFlight(req, res) {
    if(req.body.flightNo)
        req.body.flightNo = parseInt(req.body.flightNo);
    if(req.body.departs)
        req.body.departs = new Date(req.body.departs);

    for(let key in req.body) {
        if(req.body[key] === '')
            delete req.body[key];
    }

    var flight = new Flight(req.body);
    flight.save(function(err) {
        if(err)
            return res.redirect('flights/new');
        res.redirect('flights');
    });
}