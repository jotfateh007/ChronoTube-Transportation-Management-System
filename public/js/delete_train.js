function deleteTrain(trainID) {
    let link = '/delete-train-ajax/';
    let data = {
        id: trainID
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
            console.error("Error deleting train:", error);
        }
    });
}