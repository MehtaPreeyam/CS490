<?php

$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);
$username = $data['username']
$password = $data['password']

$arr = array('username' => $username, 'password' => $password); 

$ch = curl_init();

curl_setopt_array($ch, array(
	CURLOPT_RETURNTRANSFER => 1,
	CURLOPT_URL => "https://web.njit.edu/~sk972/alpha.php",
	CURLOPT_USERAGENT => "POST Request from middle",
	CURLOPT_POST => 1,
	CURLOPT_POSTFIELDS => json_encode($arr)
));

$response = json_decode(curl_exec($ch), true);

curl_close($ch);
echo json_encode($response);
?>