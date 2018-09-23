<?php

$json_data = file_get_contents();
$data = json_decode($json_data, TRUE);
$username = $data['username']
$password = $data['password']



$ch = curl_init();

curl_setopt_array($ch, array(
	CURLOPT_RETURNTRANSFER => 1,
	CURLOPT_URL => "https://web.njit.edu/~sk972/alpha.php",
	CURLOPT_USERAGENT => "POST Request from middle",
	CURLOPT_POST => 1,
	CURLOPT_POSTFIELDS => array(
		username => 'username',
		password => 'password'
		)
));

$response = curl_exec($ch);

curl_close($ch);
echo $response;
>