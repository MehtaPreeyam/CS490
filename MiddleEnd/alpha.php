<?php

function njit_login($user, $pass){
	// user=UCID&pass=pass&uuid=0xACA021
	$ch = curl_init();
	$ar = array(
	 	"user" => $user,
	 	"pass" => $pass,
	 	"uuid" => "0xACA021"
	);
	
	curl_setopt_array($ch, array(
		CURLOPT_URL => "https://cp4.njit.edu/cp/home/login",
		CURLOPT_POSTFIELDS => http_build_query($ar),
		CURLOPT_RETURNTRANSFER => 1
	));
	
	$result = curl_exec($ch);
	curl_close($ch);
	// Logout to kill any sessions
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "http://cp4.njit.edu/up/Logout?uP_tparam=frm&frm=");
	curl_exec($ch);
	curl_close($ch);
	// Return validation bool
	return strpos($result, "loginok.html") !== false;
}


$json_data = json_decode(file_get_contents("php://input"));
$data = $json_data;
$username = $data['username']
$password = $data['password']
if(njit_login($username, $password))
	echo '{ "valid":"valid"}';
else{
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
}
?>