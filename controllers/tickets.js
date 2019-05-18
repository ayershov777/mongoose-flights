const Ticket = require('../models/ticket');

module.exports = {
    create: createTicket,
    delete: deleteTicket
};

function createTicket(req, res) {
    Ticket.create(req.body, (err, ticket)=>{
        if(err) res.send({
            status: 'failure'
        })
        else res.send({
            status: 'success',
            ticketId: ticket._id,
            price: ticket.price
        });
    });
}

function deleteTicket(req, res) {
    Ticket.deleteOne({_id: req.params.id}, (err)=>{
        if(err) res.send('error')
        else res.send('success');
    });
}