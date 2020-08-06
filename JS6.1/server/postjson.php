<?php

function sendPostResponse() {
    $contact['nom'] = $_POST['nom'];
    $contact['prenom'] = $_POST['prenom'];

    $response = [
        'results' =>
            [
                'status' => 'Data received',
                'contact' => $contact
            ]
        ];
    return json_encode( $response );
}

if (isset($_POST['nom'])) {
    header("Content-type: application/json; charset=utf-8");
    echo sendPostResponse();
}
