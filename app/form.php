<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Спортивная Россия</title>
    <style>@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700&subset=cyrillic');</style>
    <style>
        html,
        body {
            height: 100%;
        }

        body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        a {
            font-family: 'Roboto Condensed', sans-serif;
            font-size: 2rem;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
<?php
   $back = "<p><a href=\"javascript: history.back()\">Вернуться назад</a></p>";
 
   if(!empty($_POST['userName']) and !empty($_POST['userEmail']) 
   and !empty($_POST['userMessage'])){
      $name = trim(strip_tags($_POST['userName']));
      $mail = trim(strip_tags($_POST['userMail']));
      $message = trim(strip_tags($_POST['userMessage']));
 
      mail('dima.groot.04@gmail.com', 'Письмо с sportirussia.ru', 
      'Вам написал: '.$name.'<br />Его почта: '.$mail.'<br />
      Его сообщение: '.$message,"Content-type:text/html;charset=utf-8");
 
      echo "Ваше сообщение успешно отправлено!<Br> Вы получите ответ в 
      ближайшее время<Br> $back";
 
      exit;
   } 
   else {
      echo "Для отправки сообщения заполните все поля! $back";
      exit;
   }
?>
</body>
</html>