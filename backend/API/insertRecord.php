<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/Database.php';

$database = new Database();
$conn = $database->getConnection();

// Get the posted data
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->email) && !empty($data->address) && !empty($data->age)) {
    // Prepare the SQL statement
    $query = "INSERT INTO crud_tbl (name, email, address, age) VALUES (:name, :email, :address, :age)";

    $stmt = $conn->prepare($query);

    // Bind parameters
    $stmt->bindParam(':name', $data->name);
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':address', $data->address);
    $stmt->bindParam(':age', $data->age);

    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(["message" => "Record inserted successfully."]);
    } else {
        echo json_encode(["message" => "Unable to insert record."]);
    }
} else {
    echo json_encode(["message" => "Incomplete data."]);
}
?>