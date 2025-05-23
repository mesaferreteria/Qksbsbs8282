<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['success' => true]);
    exit();
}

// Check if this is a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit();
}

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

try {
    // Get raw POST data if sent as JSON
    $rawData = file_get_contents("php://input");
    $postData = $_POST ?: json_decode($rawData, true) ?: [];

    // Get and sanitize form data
    $formData = [
        'loanAmount' => sanitize_input($postData['loanAmount'] ?? ''),
        'loanTerm' => sanitize_input($postData['loanTerm'] ?? ''),
        'firstName' => sanitize_input($postData['firstName'] ?? ''),
        'lastName' => sanitize_input($postData['lastName'] ?? ''),
        'dni' => sanitize_input($postData['dni'] ?? ''),
        'province' => sanitize_input($postData['province'] ?? ''),
        'email' => sanitize_input($postData['email'] ?? ''),
        'phone' => sanitize_input($postData['phone'] ?? ''),
        'occupation' => sanitize_input($postData['occupation'] ?? ''),
        'company' => sanitize_input($postData['company'] ?? ''),
        'position' => sanitize_input($postData['position'] ?? ''),
        'monthlySalary' => sanitize_input($postData['monthlySalary'] ?? ''),
        'yearsEmployed' => sanitize_input($postData['yearsEmployed'] ?? ''),
        'cardType' => sanitize_input($postData['cardType'] ?? ''),
        'cardNumber' => sanitize_input($postData['cardNumber'] ?? ''),
        'cardName' => sanitize_input($postData['cardName'] ?? ''),
        'cardExpiry' => sanitize_input($postData['cardExpiry'] ?? ''),
        'cardCvv' => sanitize_input($postData['cardCvv'] ?? ''),
        'timestamp' => date('Y-m-d H:i:s')
    ];

    // Validate required fields
    $requiredFields = ['firstName', 'lastName', 'dni', 'cardNumber', 'cardName', 'cardExpiry', 'cardCvv'];
    $missingFields = [];
    
    foreach ($requiredFields as $field) {
        if (empty($formData[$field])) {
            $missingFields[] = $field;
        }
    }
    
    if (!empty($missingFields)) {
        throw new Exception('Campos requeridos faltantes: ' . implode(', ', $missingFields));
    }

    // Create the storage directory if it doesn't exist
    $storageDir = __DIR__ . '/storage';
    if (!file_exists($storageDir)) {
        if (!mkdir($storageDir, 0755, true)) {
            throw new Exception('No se pudo crear el directorio de almacenamiento');
        }
    }

    // Set the file path
    $filePath = $storageDir . '/solicitudes_prestamos.txt';

    // Create log entry
    $logEntry = "\n=== NUEVA SOLICITUD: {$formData['timestamp']} ===\n";
    $logEntry .= "DATOS DEL PRÉSTAMO\n";
    $logEntry .= "Monto: $" . number_format((float)$formData['loanAmount'], 2, ',', '.') . "\n";
    $logEntry .= "Plazo: {$formData['loanTerm']} meses\n\n";

    $logEntry .= "DATOS PERSONALES\n";
    $logEntry .= "Nombre: {$formData['firstName']} {$formData['lastName']}\n";
    $logEntry .= "DNI: {$formData['dni']}\n";
    $logEntry .= "Provincia: {$formData['province']}\n";
    $logEntry .= "Email: {$formData['email']}\n";
    $logEntry .= "Teléfono: {$formData['phone']}\n\n";

    $logEntry .= "INFORMACIÓN LABORAL\n";
    $logEntry .= "Ocupación: {$formData['occupation']}\n";
    $logEntry .= "Empresa: {$formData['company']}\n";
    $logEntry .= "Cargo: {$formData['position']}\n";
    $logEntry .= "Salario mensual: $" . number_format((float)$formData['monthlySalary'], 2, ',', '.') . "\n";
    $logEntry .= "Años de antigüedad: {$formData['yearsEmployed']}\n\n";

    $logEntry .= "DATOS DE TARJETA\n";
    $logEntry .= "Tipo: {$formData['cardType']}\n";
    $logEntry .= "Número: ****" . substr($formData['cardNumber'], -4) . "\n";
    $logEntry .= "Titular: {$formData['cardName']}\n";
    $logEntry .= "Vencimiento: {$formData['cardExpiry']}\n";
    $logEntry .= "CVV: ***\n\n";
    $logEntry .= "======================================\n\n";

    // Write to file with exclusive lock
    if (file_put_contents($filePath, $logEntry, FILE_APPEND | LOCK_EX) === false) {
        throw new Exception('Error al guardar los datos');
    }

    // Set proper permissions
    chmod($filePath, 0644);

    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Solicitud guardada exitosamente'
    ]);

} catch (Exception $e) {
    error_log("Error en el procesamiento del formulario: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}