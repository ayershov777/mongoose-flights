const Flight = require('../models/flight');
const Ticket = require('../models/ticket');
const moment = require('moment');

module.exports = {
    index,
    new: newFlight,
    create: createFlight,
    show: showFlight,
    delete: deleteFlight
}

function index(req, res) {
    Flight.find({}).sort('departs').exec(function(err, flights) {
        if(err) console.log(err);
        res.render('flights/index', {
            title: 'Flights list',
            flights,
            moment,
            timeNow: new Date(moment())
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
            return res.redirect('/flights/new');
        res.redirect('/flights');
    });
}

function showFlight(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            var ticketTable = {};
            tickets.forEach(function(ticket) {
                ticketTable[`${ticket.seat}`] = ticket;
            });
            res.render('flights/show', {
                title: `${flight.airline} Flight #${flight.flightNo}`,
                flight,
                moment,
                tickets: ticketTable
            });
        });
    });
}

function deleteFlight(req, res) {
    Flight.deleteOne({_id: req.params.id}, function(err) {
        if(err) console.log(err);
    });
    res.redirect('/flights');
}