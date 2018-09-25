<?php

	//Get values passed from middle and front
	$json_data = json_decode(file_get_contents("php://input"), true);
	$data = $json_data;
	$username = $data['username'];
	$password = $data['password'];

	//hashing password
	$hashpassword = sha1($password);
  
	//connect to the server and select databse
	$host = 'sql2.njit.edu';
	$dbuser = 'sk972';
	$dbpassword = '0w7Tt87N';
	$db = 'sk972';
 
	mysql_connect($host, $dbuser, $dbpassword);
	mysql_select_db($db);
  
	//check database for user 
	$sql = "SELECT * FROM Login WHERE User = '$username' AND Password = '$hashpassword' ";
	$result = mysql_query($sql);
	if (mysql_num_rows($result)!= 0){
		echo '{"valid":"valid"}';
	}
	else{
		echo '{"valid":"notvalid"}';
	}
?> 