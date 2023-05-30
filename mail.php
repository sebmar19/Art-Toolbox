<?php
$destinatario = "streetmarkdesign@gmail.com";
$asunto = "Mensaje enviado desde la web";
$cuerpo = '
<html>
<head>
   <title>Envío de correo</title>
</head>
<body>' . PHP_EOL;
$cuerpo .= "Nombre: " . $_POST['nombre'] . "<br />";
$cuerpo .= "Correo: " . $_POST['mail'] ."<br />";
$cuerpo .= "Teléfono: " .$_POST['telefono']."<br />";
$cuerpo .= "Ciudad: " .$_POST['ciudad']."<br />";
$cuerpo .= "Mensaje: " . nl2br($_POST['mensaje']) . "<br />";
$cuerpo .= '</body> 
</html>' . PHP_EOL;

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=UTF-8\r\n";
$headers .= "From:" . $_POST['mail'] . "\r\n";

mail($destinatario,$asunto,$cuerpo,$headers);

header( 'Location: index.html' );
