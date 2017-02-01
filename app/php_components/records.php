<?php
    include 'connection.php';
    $data = json_decode(file_get_contents("php://input"));


    if(!empty($_GET['action']) && $_GET['action']=='addRecord'){
        
        $customer_id = mysqli_real_escape_string($link, $data->id);
        $account_number = mysqli_real_escape_string($link, $data->acnum);
        $amount = mysqli_real_escape_string($link, $data->amount);
        $roi = mysqli_real_escape_string($link, $data->roi);
        $depositDate = mysqli_real_escape_string($link, $data->depositDate);
        $maturityDate = mysqli_real_escape_string($link, $data->maturityDate);
        $period = mysqli_real_escape_string($link, $data->period);
        $maturityAmount = mysqli_real_escape_string($link, $data->maturityAmount);
        $name = mysqli_real_escape_string($link, $data->name);
        $panNumber = mysqli_real_escape_string($link, $data->panNumber);
        $branch = mysqli_real_escape_string($link, $data->branch);

        $result_post_job = mysqli_query($link, "INSERT INTO records( customer_id, ac_number, amount, rate_of_interest, deposit_date, maturity_date, period, maturity_amount, name, pan_number, branch, timestamp) 
        VALUES('$customer_id','$account_number', '$amount', '$roi', '$depositDate', '$maturityDate', '$period', '$maturityAmount', '$name', '$panNumber', '$branch',  Now() )");

        $arr = array('response' => 'Record Added');
        $jsn = json_encode($arr);
        print_r($jsn);


    }



    if(!empty($_GET['action']) && $_GET['action']=='updateRecord'){
        
        $id = mysqli_real_escape_string($link, $data->id);
        $customer_id = mysqli_real_escape_string($link, $data->customer_id);
        $account_number = mysqli_real_escape_string($link, $data->ac_number);
        $amount = mysqli_real_escape_string($link, $data->amount);
        $roi = mysqli_real_escape_string($link, $data->rate_of_interest);
        $depositDate = mysqli_real_escape_string($link, $data->deposit_date);
        $maturityDate = mysqli_real_escape_string($link, $data->maturity_date);
        $period = mysqli_real_escape_string($link, $data->period);
        $maturityAmount = mysqli_real_escape_string($link, $data->maturity_amount);
        $name = mysqli_real_escape_string($link, $data->name);
        $panNumber = mysqli_real_escape_string($link, $data->pan_number);
        $branch = mysqli_real_escape_string($link, $data->branch);



        $result_post_job =  mysqli_query($link, "UPDATE `records` SET `customer_id`='".$customer_id."',`ac_number`='".$account_number."', `amount`='".$amount."', `rate_of_interest`='".$roi."', `deposit_date`='".$depositDate."', `maturity_date`='".$maturityDate."', `period`='".$period."', `maturity_amount`='".$maturityAmount."', `name`='".$name."', `pan_number`='".$panNumber."',`branch`='".$branch."' WHERE `id`='".$id."' ");

        $arr = array('response' => 'Record Updated');
        $jsn = json_encode($result_post_job);
        print_r($result_post_job);


    }




    if(!empty($_GET['action']) && $_GET['action']=='todays'){

        $pageSize = $_GET['pageSize'];
        $pageNum =  $_GET['pageNum'];
        $start=$pageSize*($pageNum-1);
        $maturity_date = date("Y-m-d");

        $query_fetch_today_records = mysqli_query($link, "SELECT * FROM records WHERE maturity_date='".$maturity_date."' ");
        $today_records_num = mysqli_num_rows($query_fetch_today_records);

        $query_fetch_today_records_completed = mysqli_query($link, "SELECT * FROM records WHERE maturity_date<='".$maturity_date."' ");
        $records_num_completed = mysqli_num_rows($query_fetch_today_records_completed);

       $query_fetch_todays = mysqli_query($link, "SELECT * FROM records WHERE maturity_date='".$maturity_date."' LIMIT $start,$pageSize ");

        if(mysqli_num_rows($query_fetch_todays) > 0){
            $data = array();
            while ($row = mysqli_fetch_assoc($query_fetch_todays)) {
                $row['isDelete'] = false;
                $data[] = $row;
            }
            $all_data = [];
            $all_data['data'] = $data;
            $all_data['today'] = $today_records_num;
            $all_data['completed_records'] = $records_num_completed;
            print json_encode($all_data);
        }
        else {
                $arr = array('error' => 'Response Error');
                $jsn = json_encode($arr);
        }

    }


    if(!empty($_GET['action']) && $_GET['action']=='threeDays'){

        $pageSize = $_GET['pageSize'];
        $pageNum =  $_GET['pageNum'];
        $start=$pageSize*($pageNum-1);
        $maturity_date_today = date("Y-m-d");
        $maturity_date_threeDays = date("Y-m-d", strtotime('+3 days'));

        $query_fetch_three_records = mysqli_query($link, "SELECT * FROM records WHERE maturity_date>'".$maturity_date_today."'AND maturity_date <= '".$maturity_date_threeDays."' ");
        $three_records_num = mysqli_num_rows($query_fetch_three_records);

        $query_fetch_todays = mysqli_query($link, "SELECT * FROM records WHERE maturity_date>'".$maturity_date_today."'AND maturity_date <= '".$maturity_date_threeDays."' ORDER BY maturity_date ASC  LIMIT $start,$pageSize ");

        if(mysqli_num_rows($query_fetch_todays) > 0){
            $data = array();
            while ($row = mysqli_fetch_assoc($query_fetch_todays)) {
                $row['isDelete'] = false;
                $data[] = $row;
            }
            $all_data = [];
            $all_data['data'] = $data;
            $all_data['total'] = $three_records_num;
            print json_encode($all_data);
        }
        else {
            $arr = array('error' => 'Response Error');
            $jsn = json_encode($arr);
        }

    }



    if(!empty($_GET['action']) && $_GET['action']=='sevenDays'){

        $pageSize = $_GET['pageSize'];
        $pageNum =  $_GET['pageNum'];
        $start=$pageSize*($pageNum-1);
        $maturity_date_today = date("Y-m-d");
        $maturity_date_SevenDays = date("Y-m-d", strtotime('+7 days'));

        $query_fetch_seven_records = mysqli_query($link, "SELECT * FROM records WHERE maturity_date>'".$maturity_date_today."' && maturity_date<='".$maturity_date_SevenDays."' ");
        $seven_records_num = mysqli_num_rows($query_fetch_seven_records);

        $query_fetch_todays = mysqli_query($link, "SELECT * FROM records WHERE maturity_date>'".$maturity_date_today."' && maturity_date<='".$maturity_date_SevenDays."' ORDER BY maturity_date ASC LIMIT $start,$pageSize ");

        if(mysqli_num_rows($query_fetch_todays) > 0){
            $data = array();
            while ($row = mysqli_fetch_assoc($query_fetch_todays)) {
                $row['isDelete'] = false;
                $data[] = $row;
            }
            $all_data = [];
            $all_data['data'] = $data;
            $all_data['total'] = $seven_records_num;
            print json_encode($all_data);
        }
        else {
            $arr = array('error' => 'Response Error');
            $jsn = json_encode($arr);
        }

    }


    if(!empty($_GET['action']) && $_GET['action']=='fifteenDays'){

        $pageSize = $_GET['pageSize'];
        $pageNum =  $_GET['pageNum'];
        $start=$pageSize*($pageNum-1);
        $maturity_date_today = date("Y-m-d");
        $maturity_date_FifteenDays = date("Y-m-d", strtotime('+15 days'));

        $query_fetch_fifteen_records = mysqli_query($link, "SELECT * FROM records WHERE maturity_date>'".$maturity_date_today."' && maturity_date<='".$maturity_date_FifteenDays."' ");
        $fifteen_records_num = mysqli_num_rows($query_fetch_fifteen_records);

        $query_fetch_todays = mysqli_query($link, "SELECT * FROM records WHERE maturity_date>'".$maturity_date_today."' && maturity_date<='".$maturity_date_FifteenDays."' ORDER BY maturity_date ASC LIMIT $start,$pageSize ");

        if(mysqli_num_rows($query_fetch_todays) > 0){
            $data = array();
            while ($row = mysqli_fetch_assoc($query_fetch_todays)) {
                $row['isDelete'] = false;
                $data[] = $row;
            }
            $all_data = [];
            $all_data['data'] = $data;
            $all_data['total'] = $fifteen_records_num;
            print json_encode($all_data);
        }
        else {
            $arr = array('error' => 'Response Error');
            $jsn = json_encode($arr);
        }

    }


    if(!empty($_GET['action']) && $_GET['action']=='all'){

        $pageSize = $_GET['pageSize'];
        $pageNum =  $_GET['pageNum'];
        $start=$pageSize*($pageNum-1);

        $query_fetch_all_records = mysqli_query($link, "SELECT * FROM records");
        $all_records_num = mysqli_num_rows($query_fetch_all_records);


        $query_fetch_all_records_sum = mysqli_query($link, "SELECT SUM(amount) AS TotalSum FROM records;");
        $sum_total =  mysqli_fetch_assoc($query_fetch_all_records_sum);
        $query_fetch_all_records_maturity_sum = mysqli_query($link, "SELECT SUM(maturity_amount) AS TotalSum FROM records;");
        $sum_maturity_total =  mysqli_fetch_assoc($query_fetch_all_records_maturity_sum);

        $query_fetch_todays = mysqli_query($link, "SELECT * FROM records ORDER BY maturity_date ASC LIMIT $start,$pageSize");

        if(mysqli_num_rows($query_fetch_todays) > 0){
            $data = array();
            while ($row = mysqli_fetch_assoc($query_fetch_todays)) {
                $row['isDelete'] = false;
                $data[] = $row;
            }
            $all_data = [];
            $all_data['data'] = $data;
            $all_data['total'] = $all_records_num;
            $all_data['sum_amount'] = $sum_total['TotalSum'];
            $all_data['sum_maturity_amount'] = $sum_maturity_total['TotalSum'];
            print json_encode($all_data);
        }
        else {
            $arr = array('error' => 'Response Error');
            $jsn = json_encode($arr);
        }

    }


    if(!empty($_GET['action']) && $_GET['action']=='search'){

        $query = $_GET['query'];

        $query_fetch_todays = mysqli_query($link, "SELECT * FROM records WHERE customer_id LIKE '".'%'.$query.'%'."' || ac_number LIKE '".'%'.$query.'%'."' || amount  LIKE '".'%'.$query.'%'."' || name  LIKE '".'%'.$query.'%'."' || pan_number LIKE '".'%'.$query.'%'."' || branch  LIKE '".'%'.$query.'%'."' ORDER BY maturity_date");

        if(mysqli_num_rows($query_fetch_todays) > 0){
            $data = array();
            while ($row = mysqli_fetch_assoc($query_fetch_todays)) {
                $row['isDelete'] = false;
                $data[] = $row;
            }
            $all_data = [];
            $all_data['data'] = $data;
            print json_encode($all_data);
        }
        else {
            $arr = array('error' => 'Response Error');
            $jsn = json_encode($arr);
        }

    }

    if(!empty($_GET['action']) && $_GET['action']=='delete'){

        $id = $_GET['id'];

        $query_fetch_deleted = mysqli_query($link, "DELETE FROM records WHERE id='$id'");

        if($query_fetch_deleted > 0){
            $all_data['response'] = "Deleted Successfully";
            print json_encode($all_data);
        }
        else {
            $arr = array('error' => 'Response Error');
            $jsn = json_encode($arr);
        }

    }

    if(!empty($_GET['action']) && $_GET['action']=='single'){

        $id = $_GET['id'];

        $query_fetch_single_record = mysqli_query($link, "SELECT * FROM records WHERE id='".$id."' ");

        if(mysqli_num_rows($query_fetch_single_record) > 0){
            $data = array();
            while ($row = mysqli_fetch_assoc($query_fetch_single_record)) {
                $row['isDelete'] = false;
                $data[] = $row;
            }
            $all_data = [];
            $all_data['data'] = $data;
            print json_encode($all_data);
        }
        else {
            $arr = array('error' => 'Response Error');
            $jsn = json_encode($arr);
        }

    }


?>
