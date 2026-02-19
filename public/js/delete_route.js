function deleteRoute(routeID) {
    let link = '/delete-route-ajax';
    let data = {
        id: routeID
    };

    $.ajax({
        url: link,
        type: 'DELETE',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: function(result) {
            window.location.reload();
        },
        error: function(xhr, status, error) {
            console.error("Error deleting Route:", error);
        }
    });
}
