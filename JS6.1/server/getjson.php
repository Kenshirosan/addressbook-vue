<?php

function sendResponse() {
    $response = [
            'results' =>
                [
                    'status' => true,
                    'prenom' => $_GET['nom']
                ]
            ];


    return json_encode( $response );
}

if (isset($_GET['nom'])) {
    header("Content-type: application/json; charset=utf-8");
    echo sendResponse();
}
