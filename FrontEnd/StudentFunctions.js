function getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
function loadScore() {
    'use strict';
    var username = getUrlParameter('username'),
        user = Object.create(null),
        http = new XMLHttpRequest(),
        text = "<table><tr><th>Grade</th><th>Comments</th></tr>";
    user.username = username;
    console.log(user);
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            if(json.Publish === "True"){
              text+= "<tr><td>"+json.Grade+"</td><td>"+json.Comments+"</td></tr>";
              text += "</table>";
              document.body.innerHTML += text;
            }
            else {
              alert("Teacher has not published your score yet!");
              window.location.href = "Student.html?username="+username;
            }
            return false;    
        }
    };
    http.open('POST', 'php/getScore.php', true);
    http.send(JSON.stringify(user));
}
function loadTest() {
    'use strict';
    var http = new XMLHttpRequest(),
        count = 1;
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            for (var row in json) {
              if(count === 1){
                document.getElementById("Q1Description").innerHTML += json[row].Question;
                document.getElementById("Q1Topic").innerHTML += json[row].Topic;
                document.getElementById("Q1Restraint").innerHTML += json[row].Restraint;
                document.getElementById("Q1Points").innerHTML += json[row].Points;
              }
              if(count === 2){
                document.getElementById("Q2Description").innerHTML += json[row].Question;
                document.getElementById("Q2Topic").innerHTML += json[row].Topic;
                document.getElementById("Q2Restraint").innerHTML += json[row].Restraint;
                document.getElementById("Q2Points").innerHTML += json[row].Points;
              }
              if(count === 3){
                document.getElementById("Q3Description").innerHTML += json[row].Question;
                document.getElementById("Q3Topic").innerHTML += json[row].Topic;
                document.getElementById("Q3Restraint").innerHTML += json[row].Restraint;
                document.getElementById("Q3Points").innerHTML += json[row].Points;
              }
              count++;
            }
            return false;    
        }
    };
    http.open('GET', 'php/loadTest.php', true);
    http.send();  
}
function TakeTest() {
    'use strict';
    var Q1 = document.getElementById("Q1").value,
        Q2 = document.getElementById("Q2").value,
        Q3 = document.getElementById("Q3").value,
        username = getUrlParameter('username'),
        test = Object.create(null),
        http = new XMLHttpRequest();
    test.Q1 = Q1;
    test.Q2 = Q2;
    test.Q3 = Q3;
    test.username = username;
    console.log(test);
    
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            if(json.valid === 'valid'){
              alert("Test Successfully Completed!");
              window.location.href = "Student.html?username="+username;
            }    
        }
        return false;
    };
    
    http.open('POST', 'php/TakeTest.php', true);
    http.send(JSON.stringify(test));
    
    
    return false;
}