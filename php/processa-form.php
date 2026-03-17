<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    // Email dove inviare i messaggi
    $to = "matrimoniodrive@gmail.com";
    $subject = "Nuovo messaggio dal sito MLC";
    $body = "Nome: $name\nEmail: $email\nTelefono: $phone\nMessaggio: $message";
    $headers = "From: $email";

    if(mail($to, $subject, $body, $headers)) {
        echo "Messaggio inviato con successo!";
    } else {
        echo "Errore durante l'invio del messaggio.";
    }
}
?>
