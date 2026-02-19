function deleteStationRoute(pathID) {
    let link = '/delete-stationRoute-ajax/';
    let data = {
        id: pathID
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            // A successful deletion will trigger the redirect from the server
            window.location.reload(); // This will force a full-page refresh
        },
        error: function(xhr, status, error) {
            console.error("Error deleting station route:", error);
        }
    });
}