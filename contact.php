<?php
/*
-----------------------------------------
Simple Contact Backend
-----------------------------------------
Features:
- input validation
- spam protection (honeypot + rate limit)
- SQLite storage
- SMTP email sending
-----------------------------------------
*/

header("Content-Type: application/json");

$config = [
    "to_email" => "ceylonwoodexpots@gmail.com",

    // SMTP settings
    "smtp_host" => "smtp.yourprovider.com",
    "smtp_port" => 587,
    "smtp_user" => "Daniel",
    "smtp_pass" => "Deny234",

    "db_file" => __DIR__ . "/contacts.db",
    "rate_limit_seconds" => 60
];

// --- SMTP odesílání pomocí PHPMailer ---
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';
require_once __DIR__ . '/PHPMailer/Exception.php';


function send_mail_smtp($config, $subject, $body) {
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = $config['smtp_host'];
        $mail->SMTPAuth = true;
        $mail->Username = $config['smtp_user'];
        $mail->Password = $config['smtp_pass'];
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $config['smtp_port'];

        $mail->setFrom('website@pureceyloncinnamon.com', 'Website');
        $mail->addAddress($config['to_email']);

        $mail->Subject = $subject;
        $mail->Body    = $body;

        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}


/* --------------------------------
Security: Rate limit
-------------------------------- */

session_start();

if (isset($_SESSION['last_submit'])) {
    if (time() - $_SESSION['last_submit'] < $config['rate_limit_seconds']) {
        echo json_encode(["status"=>"error","message"=>"Please wait before sending another inquiry."]);
        exit;
    }
}

$_SESSION['last_submit'] = time();


/* --------------------------------
Honeypot spam protection
-------------------------------- */

if (!empty($_POST['website'])) {
    echo json_encode(["status"=>"error","message"=>"Spam detected"]);
    exit;
}


/* --------------------------------
Input validation
-------------------------------- */

function clean($value) {
    return trim(htmlspecialchars($value, ENT_QUOTES, 'UTF-8'));
}

$company = clean($_POST['companyName'] ?? "");
$person = clean($_POST['contactPerson'] ?? "");
$email = clean($_POST['email'] ?? "");
$product = clean($_POST['product'] ?? "");
$quantity = clean($_POST['quantity'] ?? "");
$port = clean($_POST['destinationPort'] ?? "");
$message = clean($_POST['message'] ?? "");

if (!$company || !$person || !$email || !$product) {
    echo json_encode(["status"=>"error","message"=>"Missing required fields"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status"=>"error","message"=>"Invalid email"]);
    exit;
}


/* --------------------------------
SQLite database
-------------------------------- */

try {

$db = new PDO("sqlite:" . $config['db_file']);

$db->exec("
CREATE TABLE IF NOT EXISTS inquiries (
id INTEGER PRIMARY KEY AUTOINCREMENT,
company TEXT,
contact_person TEXT,
email TEXT,
product TEXT,
quantity TEXT,
destination_port TEXT,
message TEXT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
");

$stmt = $db->prepare("
INSERT INTO inquiries
(company, contact_person, email, product, quantity, destination_port, message)
VALUES (?, ?, ?, ?, ?, ?, ?)
");

$stmt->execute([
$company,
$person,
$email,
$product,
$quantity,
$port,
$message
]);

} catch (Exception $e) {

echo json_encode(["status"=>"error","message"=>"Database error"]);
exit;

}


/* --------------------------------
Email sending
-------------------------------- */

$subject = "New Cinnamon Inquiry - $company";

$body = "
New export inquiry

Company: $company
Contact person: $person
Email: $email

Product: $product
Quantity: $quantity
Destination port: $port

Message:
$message
";

$headers = "From: website@pureceyloncinnamon.com";

mail($config["to_email"], $subject, $body, $headers);


/* --------------------------------
Success response
-------------------------------- */

echo json_encode([
"status" => "success",
"message" => "Inquiry sent successfully"
]);

?>