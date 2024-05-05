<?php
// Retrieve quantities of items from the form
$item1Quantity = isset($_POST['item1Quantity']) ? intval($_POST['item1Quantity']) : 0;
$item2Quantity = isset($_POST['item2Quantity']) ? intval($_POST['item2Quantity']) : 0;

// Calculate total amount
$item1Price = 10; // Replace with actual price of Item 1
$item2Price = 15; // Replace with actual price of Item 2
$totalAmount = $item1Quantity * $item1Price + $item2Quantity * $item2Price;

// Redirect to order confirmation page with total amount
header("Location: order-confirmation.php?totalAmount=$totalAmount");
exit();
?>
