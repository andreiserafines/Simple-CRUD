<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$conn = $database->getConnection();

// Get the posted data
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->id)) {
    $query = "UPDATE crud_tbl SET name = :name, email = :email, address = :address, age = :age WHERE id = :id";

    $stmt = $conn->prepare($query);

    // Bind parameters
    $stmt->bindParam(':id', $data->id);
    $stmt->bindParam(':name', $data->name);
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':address', $data->address);
    $stmt->bindParam(':age', $data->age);

    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(["message" => "Record updated successfully."]);
    } else {
        echo json_encode(["message" => "Unable to update record."]);
    }
} else {
    echo json_encode(["message" => "Invalid input."]);
}
?>
