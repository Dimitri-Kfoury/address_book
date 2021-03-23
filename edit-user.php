<?php

/*

Code that updates a record from the persons table

*/

if(!isset($_POST)){

    return;
}

$id= $_POST['id'];
$firstName= $_POST['firstName'];
$lastName= $_POST['lastName'];
$email= $_POST['email'];
$tel= $_POST['tel'];
$address= $_POST['address'];
$org = $_POST['org'];




if(!empty($firstName) || !empty($id) || !empty($email) || !empty($address) || !empty($tel) || !empty($lastName) || !empty($org) ){

    $user = 'root';


    try {
        
        $dbh = new PDO('mysql:host=localhost;dbname=test', $user);
        
        }
        
     catch (PDOException $e) {
        print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }



    $updateUser = 'update persons set first_name = ?, last_name =?,email = ?,telephone_number = ?,address = ?,organization_name = ? where id = ?;';
    $sth = $dbh->prepare($updateUser);
    $sth->execute(array($firstName,$lastName,$email,$tel,$address,$org,$id));

}