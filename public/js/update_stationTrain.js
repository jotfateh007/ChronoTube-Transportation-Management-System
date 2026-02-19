updateStationTrainForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputStationServedId = document.getElementById("updateStationTrainId");
    let newStationId = document.getElementById("updateStationId");
    let newTrainId = document.getElementById("updateTrainId");

    let stationServedIdValue = inputStationServedId.value;
    let stationIdValue = newStationId.value;
    let trainIdValue = newTrainId.value;

    if (!stationServedIdValue) {
        console.log("Please select a station served to update.");
        return;
    }

    let data = {
        stationServedId: stationServedIdValue,
        stationId: stationIdValue,
        trainId: trainIdValue,
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-stationTrain-ajax", true);
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
