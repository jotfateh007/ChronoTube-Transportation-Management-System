document.addEventListener("DOMContentLoaded", function () {
    const updateRouteForm = document.getElementById("updateRouteForm");

    updateRouteForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get form elements by their IDs
        let inputRouteId = document.getElementById("updateRouteId");
        let newRouteName = document.getElementById("newRouteName");
        let newRouteDistance = document.getElementById("newRouteDistance");
        let estimatedTravelTime = document.getElementById("newEstimatedTravelTime");

        // Retrieve values from the form
        let routeIdValue = inputRouteId.value.trim();
        let routeNameValue = newRouteName.value.trim();
        let routeDistanceValue = newRouteDistance.value.trim();
        let travelTimeValue = estimatedTravelTime.value.trim();

        // Ensure a route is selected
        if (!routeIdValue) {
            console.log("Please select a route to update.");
            return;
        }

        // Build the data object to send
        let data = {
            routeId: routeIdValue,
            routeName: routeNameValue || null, // Set to null if empty
            routeDistance: routeDistanceValue || null,
            estimatedTravelTime: travelTimeValue || null
        };

        // Create and send the AJAX request
        let xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/put-route-ajax", true);
        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4) {
                if (xhttp.status === 200) {
                    console.log("Update successful, refreshing page...");
                    window.location.reload();
                } else {
                    console.log("Error updating route:", xhttp.responseText);
                }
            }
        };

        xhttp.send(JSON.stringify(data));
    });
});
