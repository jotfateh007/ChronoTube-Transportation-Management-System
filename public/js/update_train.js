updateTrainForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputTrainId = document.getElementById("updateTrainId");
    let inputRouteId = document.getElementById("updateRouteId")
    let newTrainName = document.getElementById("newTrainName");
    let newTrainType = document.getElementById("newTrainType");
    let newCapacity = document.getElementById("newCapacity");
    
    console.log(inputRouteId.value)

    let trainIdValue = inputTrainId.value;
    let routeIdValue = inputRouteId.value;
    let trainNameValue = newTrainName.value;
    let trainTypeValue = newTrainType.value;
    let capacityValue = newCapacity.value;
    console.log(trainIdValue, routeIdValue, trainNameValue, trainTypeValue, capacityValue)

    // Check for empty fields
    if (!trainIdValue || !routeIdValue || !trainNameValue || !trainTypeValue || !capacityValue) {
        console.log("All fields must be filled.");
        return;
    }

    // Ensure that RouteId and Capacity are valid numbers
    routeIdValue = parseInt(routeIdValue, 10);
    capacityValue = parseInt(capacityValue, 10);

    if (isNaN(routeIdValue) || isNaN(capacityValue)) {
        return;
    }

    // Prepare data object
    let data = {
        trainId: trainIdValue,
        routeId: routeIdValue,
        trainName: trainNameValue,
        trainType: trainTypeValue,
        capacity: capacityValue
    };

    console.log("Sending data:", data);  // Log the data being sent

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-train-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Check the server's response
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                console.log("Update successful, refreshing page...");
                window.location.reload(); // 🔄 Full Page Refresh
            } else {
                console.error("Error with input. Status: ", xhttp.status);
                console.error("Response text: ", xhttp.responseText);  // Log error message from the server
            }
        }
    };
    // Send the data as JSON
    xhttp.send(JSON.stringify(data));
});