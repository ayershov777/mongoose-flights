$('td.redirect').on('click', (e)=>{
    let id = e.target.getAttribute('data-id');
    location.href = `/flights/${id}`;
});