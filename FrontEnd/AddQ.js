/*jslint devel: true */
function ret() {
  window.location.href = "teacher.html";
}
function AddQ() {
    var Description = document.getElementById("Description").value,
        Points = document.getElementById("pts").value,
        Difficulty = document.getElementById("Difficulty").value,
        Topic = document.getElementById("Topic").value,
        Restraints = document.getElementById("Restraints").value,
        TestCase1Input = document.getElementById("TestCase1Input").value,
        TestCase1Output = document.getElementById("TestCase1Output").value,
        TestCase2Input = document.getElementById("TestCase2Input").value,
        TestCase2Output = document.getElementById("TestCase2Output").value,
        test = Object.create(null),
        http = new XMLHttpRequest();
    test.TestCase1Input = TestCase1Input;
    test.TestCase1Output = TestCase1Output;
    test.TestCase2Input = TestCase2Input;
    test.TestCase2Output = TestCase2Output;
    test.Description = Description;
    test.Points = Points;
    test.Difficulty = Difficulty;
    test.Topic = Topic;
    test.Restraints = Restraints;
    console.log(test);
    http.onreadystatechange = function () {
        console.log(this.responseText);
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            if(json.valid === 'valid'){
              alert('Question Successfully Added!');
              window.location.reload(true);
            }
            //return false;    
        }
        return false;
    };
    
    http.open('POST', 'php/AddQ.php', true);
    http.send(JSON.stringify(test));
}
function getQuestions() {
  var http = new XMLHttpRequest()
      text = "<table><tr><th>Question</th><th>Difficulty</th><th>Topic</th><th>Restraint</th><th>Points</th></tr>";
   http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            for(var row in json) {
             text+= "<tr><td>"+json[row].Question+"</td><td>"+json[row].Difficulty+"</td><td>"+json[row].Topic+"</td><td>"+json[row].Restraint+"</td><td>"+json[row].Points+"</td></tr>";
            }
            text += "</table>";
            document.getElementById("AllQuestions").innerHTML += text;
        }
        return false;
    };
  http.open('GET', 'php/getQuestions.php', true);
  http.send();
}