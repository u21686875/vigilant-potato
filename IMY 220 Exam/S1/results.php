<?php
    // See all errors and warnings
    error_reporting(E_ALL);

    // replace with your position_surname
    session_start(); // Start the session

    // Check if the logout button has been clicked
    if (isset($_GET['logout'])) {
        // Clear the session variables
        session_unset();
        // Destroy the session
        session_destroy();
        // Redirect to index.php
        header("Location: index.php");
        exit();
    }

    // Check if any form data has been sent
    if ($_SERVER["REQUEST_METHOD"] == "GET" && !isset($_GET['logout'])) {
        // Save the data to session variables
        $_SESSION['fname'] = $_GET['fname'] ?? '';
        $_SESSION['lname'] = $_GET['lname'] ?? '';
        $_SESSION['email'] = $_GET['email'] ?? '';
        $_SESSION['date'] = $_GET['date'] ?? '';
    }

    // Check if the user is logged in by checking if the session variables are set
    if (isset($_SESSION['fname']) && isset($_SESSION['lname']) && isset($_SESSION['email']) && isset($_SESSION['date'])) {
        // Display the details in a paragraph element
        echo "<p>The following details have been entered:<br>";
        echo "First name: " . htmlspecialchars($_SESSION['fname']) . "<br>";
        echo "Last name: " . htmlspecialchars($_SESSION['lname']) . "<br>";
        echo "Email: " . htmlspecialchars($_SESSION['email']) . "<br>";
        echo "Birthday: " . htmlspecialchars($_SESSION['date']) . "<br></p>";
        
        // Display a logout button
        echo "<form method='get'>";
        echo "<button type='submit' name='logout' value='1'>Log out</button>";
        echo "</form>";
    } else {
        // Display a message if the user is not logged in
        echo "<h1>You are not logged in</h1>";
    }
?>

