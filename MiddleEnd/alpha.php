<?php

$json_data = file_get_contents("php://input");
$data = $json_data;
$username = $data['username']
$password = $data['password']

$arr = array('username' => $username, 'password' => $password); 

$ch = curl_init();

curl_setopt_array($ch, array(
	CURLOPT_RETURNTRANSFER => 1,
	CURLOPT_URL => "https://web.njit.edu/~sk972/alpha.php",
	CURLOPT_USERAGENT => "POST Request from middle",
	CURLOPT_POST => 1,
	CURLOPT_POSTFIELDS => $arr
));

$response = curl_exec($ch);

curl_close($ch);
echo $response;
?>