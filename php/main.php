<?php
require_once("DbHelper.php");
session_start();
$dbh = new DbHelper();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    if ($_SERVER["CONTENT_TYPE"] == 'application/json'){
        $data = json_decode( file_get_contents('php://input'), true);
        $errs = array();
        call_method($data['object'], $data['method'], $data['params'], $dbh);
    }
}

function call_method($object_name, $method_name, $params, $dbh) {
    include_once $object_name . '.php';
    $object = new $object_name($dbh);
    echo json_encode($object->$method_name($params));
}