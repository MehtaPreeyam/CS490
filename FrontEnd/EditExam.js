/*jslint devel: true */

function loadScores() {
    var http = new XMLHttpRequest(),
        text = "<table><tr><th>UCID</th><th>Grade</th><th>Comments</th><th>Publish</th></tr>";
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);   
            for(row in json){
              text+= "<tr><td>"+json[row].User+"</td><td>"+json[row].Grade+"</td><td>"+json[row].Comments+"</td><td>"+json[row].Publish+"</td></tr>";
            }
            text += "</table>";
            document.getElementById("grades").innerHTML += text;
        }
    };
    http.open('GET', 'php/loadScores.php', true);
    http.send();
}

function publishScore() {
    document.getElementById("publish").style.display = "none";
    var http = new XMLHttpRequest(),
        ucid = document.getElementById("UCIDPublish").value,
        post = Object.create(null);
    post.ucid = ucid;
    console.log(post);
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);   
            if(json.valid === 'valid') {
              alert("Student's grade has been published");
            }
        }
    };
    http.open('POST', 'php/publishScore.php', true);
    http.send(JSON.stringify(post));
}

function changeGrade() {
  document.getElementById("myForm").style.display = "none";
  var ucid = document.getElementById("UCID").value,
      grade = document.getElementById("grade").value,
      comment = document.getElementById("Comment").value;
      post = Object.create(null),
      http = new XMLHttpRequest();
  post.ucid = ucid;
  post.grade = grade;
  post.comment = comment;
  console.log(post);
  
  http.onreadystatechange = function () {
        console.log(this.responseText);
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            if(json.valid === 'valid'){
              alert('Success!');
              window.location.href = 'Teacher.html';
            }
            //return false;    
        }
        return false;
    };
  
  
  http.open('POST', 'php/changeGrade.php', true);
  http.send(JSON.stringify(post));

}