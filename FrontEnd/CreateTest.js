/*jslint devel: true */
function getQuestions() {
  var http = new XMLHttpRequest(),
      text = "<table><tr><th>Question</th><th>Difficulty</th><th>Topic</th><th>Restraint</th><th>Points</th></tr>";
   http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            for(var row in json) {
             text+= "<tr><td>"+json[row].Question+"</td><td>"+json[row].Difficulty+"</td><td>"+json[row].Topic+"</td><td>"+json[row].Restraint+"</td><td>"+json[row].Points+"</td><td><button>add</button></td></tr>";
            }
            text += "</table>";
            document.getElementById("AllQuestions").innerHTML += text;
        }
        return false;
    };
  http.open('GET', 'php/getQuestions.php', true);
  http.send();
}
function CreateTest() {
    var Q1pts = document.getElementById("Q1pts").value,
        Q2pts = document.getElementById("Q2pts").value,
        Q3pts = document.getElementById("Q3pts").value,
        Q1Difficulty = document.getElementById("Q1Difficulty").value,
        Q2Difficulty = document.getElementById("Q2Difficulty").value,
        Q3Difficulty = document.getElementById("Q3Difficulty").value,
        Q1Topic = document.getElementById("Q1Topic").value,
        Q2Topic = document.getElementById("Q2Topic").value,
        Q3Topic = document.getElementById("Q3Topic").value,
        Q1Restraints = document.getElementById("Q1Restraints").value,
        Q2Restraints = document.getElementById("Q2Restraints").value,
        Q3Restraints = document.getElementById("Q3Restraints").value,
        Q1 = Object.create(null),
        Q2 = Object.create(null),
        Q3 = Object.create(null),
        test = Object.create(null),
        http = new XMLHttpRequest();
    Q1.points = Q1pts;
    Q1.Difficulty = Q1Difficulty;
    Q1.Topic = Q1Topic;
    Q1.Restraints = Q1Restraints;
    console.log(Q1);
    Q2.points = Q2pts;
    Q2.Difficulty = Q2Difficulty;
    Q2.Topic = Q2Topic;
    Q2.Restraints = Q2Restraints;
    console.log(Q2);
    Q3.points = Q3pts;
    Q3.Difficulty = Q3Difficulty;
    Q3.Topic = Q3Topic;
    Q3.Restraints = Q3Restraints;
    console.log(Q3);
    test.Q1 = Q1;
    test.Q2 = Q2;
    test.Q3 = Q3;
    console.log(test);
    
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            if(json.valid === "valid"){
              alert("Test Created Successfully!");
              window.location.href = 'teacher.html';
            }
        }
        return false;
    };
    
    http.open('POST', 'php/CreateTest.php', true);
    http.send(JSON.stringify(test));
}