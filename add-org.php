<?php

/*

Code that adds an organization into the organizations table

*/

header('Location:index.html');



if(!isset($_POST)){

    return;
}


$orgName= $_POST['organization-name-input'];

$telephoneNumber= $_POST['organization-telephone-number-input'];
$address= $_POST['organization-address-input'];

$email = $_POST['organization-email-input'];



if(!empty($orgName) || !empty($telephoneNumber) || !empty($address) || !empty($email)){ 

    $user = 'root';


    try {
        
        $dbh = new PDO('mysql:host=localhost;dbname=test', $user);
        
        }
        
     catch (PDOException $e) {
        print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }



    $insertUser = 'Insert into organizations values (0,?,?,?,?);'; 
    $sth = $dbh->prepare($insertUser);
    $sth->execute(array($orgName,$address,$email,$telephoneNumber));

}