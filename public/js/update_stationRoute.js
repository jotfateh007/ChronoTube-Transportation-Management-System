updateStationRouteForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputPathId = document.getElementById("updateStationRouteId");
    let newStartStationId = document.getElementById("updateStartStationId");
    let newEndStationId = document.getElementById("updateEndStationId");
    let newRouteId = document.getElementById("updateRouteId");

    let pathIdValue = inputPathId.value;
    let startStationIdValue = newStartStationId.value;
    let endStationIdValue = newEndStationId.value;
    let routeIdValue = newRouteId.value;

    if (!pathIdValue) {
        console.log("Please select a path to update.");
        return;
    }

    let data = {
        pathId: pathIdValue,
        startStationId: startStationIdValue,
        endStationId: endStationIdValue,
        routeId: routeIdValue
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-stationRoute-ajax", true);
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
