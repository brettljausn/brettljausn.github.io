<?php
$servername = "localhost";
$username = "id6996143_brettljausn";
$password = "JawovGicukAsJu1";
$dbname = "id6996143_quiz";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT name, score, timestamp FROM scores ORDER BY score DESC;";
$result = $conn->query($sql);

$data = array();
while($enr = mysqli_fetch_assoc($result)){
    $a = array($enr['name'], $enr['score']);
    array_push($data, $a);
}

echo json_encode($data);

$conn->close();
?>
