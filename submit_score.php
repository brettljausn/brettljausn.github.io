<?php
$servername = "localhost";
$username = "id6996143_brettljausn";
$password = "JawovGicukAsJu1";
$dbname = "id6996143_quiz";

$name = $_POST["name"];
$score = $_POST["score"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql = "INSERT INTO scores (name, score, timestamp)
VALUES ('$name', '$score', now())";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
