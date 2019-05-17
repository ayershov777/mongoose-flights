const Flight = require('../models/flight');

module.exports = {
    create: createDestination
}

function createDestination(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        flight.destinations.push(req.body);
        flight.save((err) => {
            if(err)
                res.redirect(`${flight._id}`);
            res.redirect(`${flight._id}`);
        });
    });
}