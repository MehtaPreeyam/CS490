<?php
$json_data = (file_get_contents("php://input"));
$ch = curl_init();
curl_setopt_array($ch, array(
	CURLOPT_RETURNTRANSFER => 1,
	CURLOPT_URL => "https://web.njit.edu/~nrv26/alpha.php",
	CURLOPT_POST => 1,
	CURLOPT_POSTFIELDS => $json_data
));
$response = curl_exec($ch);
curl_close($ch);
echo $response;
?>

