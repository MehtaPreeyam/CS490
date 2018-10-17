/*jslint devel: true */
var attempt = 3; 
var username = "";

function validate() {
    'use strict';
    var password = document.getElementById("password").value,
        userPass = Object.create(null),
        http = new XMLHttpRequest();
    username = document.getElementById("username").value
    userPass.username = username;
    userPass.password = password;
    console.log(userPass);
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            if (json.valid === 'valid') {
                if (json.Type === 'student') {
                  window.location.href = 'Student.html?username='+username; 
                }
                else {
                  window.location.href = 'teacher.html';
                }
            }
            return false;    
        }
    };
    http.open('POST', 'php/login.php', true);
    http.send(JSON.stringify(userPass));
}