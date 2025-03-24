<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    if (
        isset($_POST['nombre']) && isset($_POST['email'])
        && isset($_POST['contrasena'])
    ) {
        $nombre = $_POST['nombre'];
        $email = $_POST['email'];
        $contrasena = $_POST['contrasena'];

        //array de personas
        $arrayPersonas = [


        ];

        //buscar si el nombre ya existe
        foreach ($arrayPersonas as $key => $value) {
            if ($nombre === ['nombre']) {
                header('Location: errorRegistro.php');
            }
            //si no existe, y es el ultimo elemento del array, se añade
            else {
                if ($nombre !== ['nombre']) {
                    $persona = [
                        'nombre' => $nombre,
                        'email' => $email,
                        'contrasena' => $contrasena
                    ];
                    array_push($arrayPersonas, $persona);
                }
            }
        }

    }