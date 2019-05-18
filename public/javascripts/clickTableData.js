$('td.redirect').on('click', (e)=>{
    let id = e.target.getAttribute('data-id');
    location.href = `/flights/${id}`;
});

function createHandler(e) {
    const flightId = $(e.target).attr('data-flight-id');
    const seat = $(e.target).attr('data-value');
    var input = prompt(`What is the price of seat ${seat}?`);
    if(input) {
        input = input.match(/\d+.?\d{0,2}/);
        input = input ? parseFloat(input[0]) : false;
        if(input) {
            data = {
                flight: flightId,
                seat,
                price: input
            };
            $.post(`/flights/${flightId}/tickets`, data, function(response) {
                if(response.status === 'success'){
                    $div = $(e.target);
                    $div.removeClass('vacant');
                    $div.addClass('occupied');
                    $div.attr('data-ticket-id', response.ticketId);
                    $div.attr('title', `$${response.price}`);
                    $div.off('click', createHandler);
                    $div.on('click', deleteHandler);
                } else {
                    alert('invalid input!');
                }
            });
        } else {
            alert('invalid input');
        }
    }
}

function deleteHandler(e) {
    const ticketId = $(e.target).attr('data-ticket-id');
    $.post(`/tickets/${ticketId}?_method=DELETE`, (response)=>{
        $div = $(e.target);
        $div.removeClass('occupied');
        $div.addClass('vacant');
        $div.attr('data-ticket-id',null);
        $div.attr('title', null);
        $div.off('click', deleteHandler);
        $div.on('click', createHandler);
    });
}

$('.vacant').on('click', createHandler);
$('.occupied').on('click', deleteHandler);
