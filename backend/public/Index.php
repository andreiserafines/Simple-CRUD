// backend/public/index.php
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/Database.php';
include_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);
$stmt = $user->read();

$num = $stmt->rowCount();

if ($num > 0) {
    $users_arr = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);
        $user_item = array(
            "id" => $id,
            "name" => $name,
            "email" => $email
        );
        array_push($users_arr, $user_item);
    }
    echo json_encode($users_arr);
} else {
    echo json_encode(array("message" => "No users found."));
}
?>