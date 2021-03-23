<?php


/*

Code that updates a record from the organizations table

*/

if(!isset($_POST)){

    return;
}

$id= $_POST['id'];
$name= $_POST['name'];
$email= $_POST['email'];
$tel= $_POST['tel'];
$address= $_POST['address'];




if(!empty($name) || !empty($id) || !empty($email) || !empty($address) || !empty($tel) ){

    $user = 'root';


    try {
        
        $dbh = new PDO('mysql:host=localhost;dbname=test', $user);
        
        }
        
     catch (PDOException $e) {
        print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }



    $updateOrg = 'update organizations set name = ?,email = ?,telephone_number = ?,address = ? where id = ?;';
    $sth = $dbh->prepare($updateOrg);
    $sth->execute(array($name,$email,$tel,$address,$id));

}