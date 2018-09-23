<?php
$user = $_POST['username'];
$pass = $_POST['password'];
$arr = array('username' => $user, 'password' => $pass); 
console.log($arr);
$url = 'web.njit.edu/~nrv26/alpha.php';
$ch = curl_init($url);

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(arr));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
echo($response);
curl_close($ch);
?>
