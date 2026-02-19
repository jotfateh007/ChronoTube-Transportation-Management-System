updateBoardingRecordForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputBoardingRecordId = document.getElementById("updateBoardingRecordId");
    let newPassengerId = document.getElementById("updatePassengerId");
    let newTrainId = document.getElementById("updateTrainId");
    let newStationId = document.getElementById("updateStationId");
    let newBoardingTime = document.getElementById("newBoardingTime");

    let boardingRecordIdValue = inputBoardingRecordId.value;
    let passengerIdValue = newPassengerId.value;
    let trainIdValue = newTrainId.value;
    let stationIdValue = newStationId.value;
    let boardingTimeValue = newBoardingTime.value;

    if (!boardingRecordIdValue) {
        console.log("Please select a boarding record to update.");
        return;
    }

    let data = {
        boardingRecordId: boardingRecordIdValue,
        passengerId: passengerIdValue,
        trainId: trainIdValue,
        stationId: stationIdValue,
        boardingTime: boardingTimeValue
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-boardingRecord-ajax", true);
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
