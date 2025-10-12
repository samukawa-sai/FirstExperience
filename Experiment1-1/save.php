<?php
// POSTで受け取ったデータ（CSV）をresult.csvに追記保存
$data = file_get_contents('php://input');
file_put_contents('result.csv', $data . "\n", FILE_APPEND);
?>