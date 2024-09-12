<?php

// CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $name = $data['name'] ?? "";
    $email = $data['email'] ?? "";
    $message = $data['message'] ?? "";

    if(empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['error' => 'All fields are required']);
        exit;
    }

    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email address']);
        exit;
    }

    // Send the email

    $to = "yourname@example.com";
    $subject = "New Contact Form Submission";
    $body = "Name: $name\nEmail:$email\n\n$message";
    $headers = "From: $email";

    if(mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo json_encode(['message' => 'Email sent successfully']);
    } else{
        http_response_code(500);
        echo json_encode(['error' => 'Failed to send email']);
    }
} else{
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}