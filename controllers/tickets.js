const Ticket = require('../models/ticket');

module.exports = {
    addToFlight
};

function addToFlight(req, res) {
    req.body.price = 0;
    req.body.flight = req.params.id;
    console.log(req.body);
    ticket = new Ticket(req.body);
    ticket.save(function(err) {
        if(err) console.log(err);
        res.redirect(`/flights/${req.params.id}`);
    });
}