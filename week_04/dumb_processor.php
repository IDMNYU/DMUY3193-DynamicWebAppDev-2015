<?php
usleep(200000);
$status_text = $_POST['status'];
if ($status_text == 1) {
	$status_text = 'vetted';
} else if ($status_text == 2) {
	$status_text = 'flagged';
} else if ($status_text == 3) {
	$status_text = 'new';
} else {
	$status_text = 'unknown';
}
header('Content-type:application/json');
echo json_encode(array('status_text' => $status_text));
