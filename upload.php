<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['image']['tmp_name'];
        $fileName = $_FILES['image']['name'];
        $fileSize = $_FILES['image']['size'];
        $fileType = $_FILES['image']['type'];
        
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));
        
        $allowedExtensions = array('jpg', 'jpeg', 'png', 'webp', 'gif');
        
        if (in_array($fileExtension, $allowedExtensions)) {
            $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
            $uploadFileDir = './uploads/';
            
            if (!is_dir($uploadFileDir)) {
                mkdir($uploadFileDir, 0755, true);
            }
            
            $dest_path = $uploadFileDir . $newFileName;
            
            if (move_uploaded_file($fileTmpPath, $dest_path)) {
                $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
                $host = $_SERVER['HTTP_HOST'];
                $scriptDir = dirname($_SERVER['SCRIPT_NAME']);
                $scriptDir = rtrim($scriptDir, '/\\');
                
                $fullUrl = $protocol . "://" . $host . $scriptDir . "/uploads/" . $newFileName;
                
                echo json_encode([
                    'status' => 'success',
                    'url' => $fullUrl
                ]);
                exit();
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Gagal memindahkan file ke folder uploads']);
                exit();
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Format file tidak diizinkan. Hanya JPG, PNG, WEBP, GIF.']);
            exit();
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'File tidak ditemukan atau terjadi kesalahan saat upload.']);
        exit();
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Metode request tidak valid.']);
    exit();
}
?>