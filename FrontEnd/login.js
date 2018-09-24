/*jslint devel: true */
var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.

function validate() {
    'use strict';
    var username = document.getElementById("username").value,
        password = document.getElementById("password").value,
        userPass = Object.create(null),
        http = new XMLHttpRequest();
    userPass.username = username;
    userPass.password = password;
    console.log(userPass);
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var json = JSON.parse(this.responseText);
            console.log(json);
            alert(json.username);
            if (json.username === 'ppm24') {
                alert(json.password);
                window.location = "success.html"; // Redirecting to other page.
                return false;
            } else {
                attempt -= 1;// Decrementing by one
                //alert("You have left " + attempt + " attempts left!");
                // Disabling fields after 3 attempts.
                if (attempt === 0) {
                    document.getElementById("username").disabled = true;
                    document.getElementById("password").disabled = true;
                    document.getElementById("submit").disabled = true;
                    return false;
                }
            }
                
        }
    };

    http.open('POST', 'login.php', true);
    http.send(JSON.stringify(userPass));
    
//    if (username === "Formget" && password === "formget#123") {
//        alert("Login successfully");
//        window.location = "success.html"; // Redirecting to other page.
//        return false;
//    } else {
//        attempt -= 1;// Decrementing by one.
//        alert("You have left " + attempt + " attempts left!");
//        // Disabling fields after 3 attempts.
//        if (attempt === 0) {
//            document.getElementById("username").disabled = true;
//            document.getElementById("password").disabled = true;
//            document.getElementById("submit").disabled = true;
//            return false;
//        }
//    }
}