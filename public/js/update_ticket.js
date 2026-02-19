updateTicketForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputTicketId = document.getElementById("updateTicketId");
    let newPassengerId = document.getElementById("updatePassengerId");
    let newRouteId = document.getElementById("updateRouteId");

    let ticketIdValue = inputTicketId.value;
    let passengerIdValue = newPassengerId.value;
    let routeIdValue = newRouteId.value;

    if (!ticketIdValue) {
        console.log("Please select a ticket to update.");
        return;
    }

    let data = {
        ticketId: ticketIdValue,
        passengerId: passengerIdValue,
        routeId: routeIdValue,
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-ticket-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log("Update successful, refreshing page...");
            window.location.reload(); // 🔄 Full Page Refresh
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    xhttp.send(JSON.stringify(data));
});
