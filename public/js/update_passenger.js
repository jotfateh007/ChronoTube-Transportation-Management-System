updatePassengerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputPassengerId = document.getElementById("updatePassengerId");
    let newFirstName = document.getElementById("newFirstName");
    let newLastName = document.getElementById("newLastName");
    let newEmail = document.getElementById("newEmail");
    let newPhone = document.getElementById("newPhone");
    let newDateOfBirth = document.getElementById("newDateOfBirth");

    let passengerIdValue = inputPassengerId.value;
    let firstNameValue = newFirstName.value;
    let lastNameValue = newLastName.value;
    let emailValue = newEmail.value;
    let phoneValue = newPhone.value;
    let dateOfBirthValue = newDateOfBirth.value;

    if (!passengerIdValue) {
        console.log("Please select a passenger to update.");
        return;
    }

    let data = {
        passengerId: passengerIdValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        phone: phoneValue,
        dateOfBirth: dateOfBirthValue
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-passenger-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            console.log("Update successful, refreshing page...");
            window.location.reload(); // Full Page Refresh
        } else if (xhttp.readyState === 4 && xhttp.status !== 200) {
            console.log("There was an error with the update.");
        }
    };

    xhttp.send(JSON.stringify(data));
});
