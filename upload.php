<?php
header('Content-Type: application/json');

// Pastikan folder /images/ sudah ada
$target_dir = "images/";
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['katFile'])) {
    $file = $_FILES['katFile'];
    $file_extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    
    // Buat nama file unik agar tidak saling menimpa
    $new_filename = 'gazebo_' . time() . '.' . $file_extension;
    $target_file = $target_dir . $new_filename;

    if (move_uploaded_file($file['tmp_name'], $target_file)) {
        echo json_encode([
            'status' => 'success',
            'file_url' => $target_file,
            'message' => 'File berhasil disimpan di folder /images/'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Gagal mengunggah file'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Tidak ada file yang diunggah'
    ]);
}
?>