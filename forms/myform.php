<?php
// Check if there's POST data
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Access data from the AJAX request
    $name = isset($_POST['name']) ? $_POST['name'] : null;
    $phone = isset($_POST['phone']) ? $_POST['phone'] : null;
    $email = isset($_POST['email']) ? $_POST['email'] : null;

    // Initialize response array
    $response = [];

    // Data validation
    if ($name !== null && $phone !== null && $email != null) {
        // Check if it's the contact form

        if (!empty($_POST)) {
            // Process data for the myModal form
            // Simulate processing (replace with your actual logic)
            $response = [
                'message' => 'Данные успешно получены из формы myModal!',
                'data' => [
                    'name' => $name,
                    'email' => $email,
                    'phone' => $phone,
                ],
            ];
        } else {
            // Handle the case when neither form is submitted
            $response = [
                'error' => 'No form submitted',
            ];
        }
    } else {
        // Handle case when required fields are missing
        $response = [
            'error' => 'Required fields are missing',
        ];
    }

    // Set proper content type for JSON
    header('Content-Type: application/json');

    // Output JSON response
    echo json_encode($response);
} else {
    // Handle case when it's not a POST request
    $response = [
        'error' => 'Invalid request method',
    ];

    // Set proper content type for JSON
    header('Content-Type: application/json');

    // Output JSON response
    echo json_encode($response);
}
?>