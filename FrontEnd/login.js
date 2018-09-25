/*jslint devel: true */
var attempt = 3; 

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
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            if (json.valid === 'valid') {
                document.body.innerHTML = 'Success!'; 
                return false;
            } else {
                attempt -= 1;// Decrementing by one
                alert("You have left " + attempt + " attempts left!");
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
}