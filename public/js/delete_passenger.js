function deletePassenger(passengerID) {
    let link = '/delete-passenger-ajax';
    let data = {
        id: passengerID
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        processData: false,
        success: function(result) {
            window.location.reload();
        },
        error: function(xhr, status, error) {
            console.error("Error deleting Passenger:", error);
        }
    });
}
