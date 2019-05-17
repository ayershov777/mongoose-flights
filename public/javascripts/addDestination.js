const $button = $('#add-destination');
const $table = $('#destinations')

const rowTemplate = `
<tr id="add-row">
    <form id="add-form" action="/flights/${$table.attr('data-id')}/destinations" method="POST">
        <td>       
            <select name="airport" form="add-form">
                <option value="AUS">AUS</option>
                <option value="DAL">DAL</option>
                <option value="LAX">LAX</option>
                <option value="SEA">SEA</option>
            </select>
            <input type="submit" value="add" form="add-form">
            <button id="cancel">cancel</button>
        </td>
        <td><input name="date" type="date" required form="add-form"></td>
        <td><input name="time" type="time" required form="add-form"></td>
    </form>
</tr>
`

$button.on('click', function() {
    const row = $(rowTemplate)[0];
    $table.append(row);
    $button.hide();
    $('#cancel').on('click', function() {
        $('#add-row').remove();
        $button.show();
    });
});
