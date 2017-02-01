<?php
include 'connection.php';
$data = json_decode(file_get_contents("php://input"));


$username = mysqli_real_escape_string($link, $data->name);
$password = mysqli_real_escape_string($link, $data->password);

$query_login_check = mysqli_query($link, "SELECT * FROM users WHERE username='".$username."' AND pass='".$password."'");

$data = array();
$row = mysqli_fetch_assoc($query_login_check);


if(mysqli_num_rows($query_login_check) > 0){
    $id = $row['id'];
    $result_user_updation= mysqli_query($link, "UPDATE `users` SET `last_login` = Now() Where `id`='".$id."' ");

    $data['user_id']= $id;
    $data['msg'] = "Login Successful";
    
    $jsn = json_encode($data);
    print_r($jsn);
}
else {
        $arr = array('error' => 'Invalid Credentials');
        $jsn = json_encode($arr);
        print_r($jsn);
}

?>
