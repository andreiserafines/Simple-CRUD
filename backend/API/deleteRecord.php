<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$conn = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    try {
        $query = "DELETE FROM crud_tbl WHERE id = :id";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':id', $data->id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Record deleted successfully"]);
        } else {
            echo json_encode(["message" => "Failed to delete record"]);
        }
    } catch (Exception $e) {
        echo json_encode(["message" => "Error deleting record: " . $e->getMessage()]);
        error_log("Error deleting record: " . $e->getMessage());
    }
} else {
    echo json_encode(["message" => "Invalid ID"]);
}
?>
