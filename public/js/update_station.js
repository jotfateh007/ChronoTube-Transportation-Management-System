updateStationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputStationId = document.getElementById("updateStationId");
    let newStationName = document.getElementById("newStationName");
    let newAddress = document.getElementById("newAddress");
    let newCity = document.getElementById("newCity");
    let newState = document.getElementById("newState");
    let newCountry = document.getElementById("newCountry");

    let stationIdValue = inputStationId.value;
    let stationNameValue = newStationName.value;
    let addressValue = newAddress.value;
    let cityValue = newCity.value;
    let stateValue = newState.value;
    let countryValue = newCountry.value;

    if (!stationIdValue) {
        console.log("Please select a station to update.");
        return;
    }

    let data = {
        stationId: stationIdValue,
        stationName: stationNameValue,
        address: addressValue,
        city: cityValue,
        state: stateValue,
        country: countryValue
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-station-ajax", true);
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
