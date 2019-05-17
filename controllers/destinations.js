const Flight = require('../models/flight');
const moment = require('moment');

module.exports = {
    create: createDestination
}

function createDestination(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        let date = new moment(req.body.date);
        let time = req.body.time.split(':');
        date.add(time[0], 'hours');
        date.add(time[1], 'minutes');
        req.body.arrival = new Date(date);
        delete req.body.date;
        delete req.body.time;
        flight.destinations.push(req.body);
        flight.save((err) => {
            if(err)
                res.redirect(`/flights/${flight._id}`);
            res.redirect(`/flights/${flight._id}`);
        });
    });
}