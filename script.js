const ESP32_IP = "http://192.168.4.1";

let latitude = null;
let longitude = null;

// ----------------------
// Connect to ESP32
// ----------------------
function connectDevice() {

    fetch(ESP32_IP + "/ping")
    .then(response => response.text())
    .then(msg => {

        document.getElementById("status").innerHTML =
        "Connected : " + msg;

    })
    .catch(() => {

        document.getElementById("status").innerHTML =
        "ESP32 Not Found";

    });

}

// ----------------------
// Get current location
// ----------------------
function getLocation() {

    navigator.geolocation.getCurrentPosition(

        (position) => {

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            fetch(ESP32_IP + "/location", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    lat: latitude,
                    lng: longitude
                })

            })
            .then(response => response.text())
            .then(msg => {

                document.getElementById("status").innerHTML =
                "Location Sent";

            })
            .catch(() => {

                document.getElementById("status").innerHTML =
                "Location Send Failed";

            });

        },

        () => {

            alert("Location Permission Denied");

        }

    );

}

// ----------------------
// Save user data
// ----------------------
function saveData() {

    if (latitude === null || longitude === null) {

        alert("Please allow location first.");
        return;

    }

    const data = {

        personalNumber:
        document.getElementById("personalNumber").value,

        sos1:
        document.getElementById("sos1").value,

        sos2:
        document.getElementById("sos2").value,

        sos3:
        document.getElementById("sos3").value,

        ssid:
        document.getElementById("ssid").value,

        password:
        document.getElementById("password").value,

        lat: latitude,

        lng: longitude

    };

    fetch(ESP32_IP + "/save", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    })
    .then(response => response.text())
    .then(msg => {

        document.getElementById("status").innerHTML =
        msg;

    })
    .catch(() => {

        document.getElementById("status").innerHTML =
        "ESP32 Not Connected";

    });

}