<?php

/*

Code that adds a person into the persons table

*/


header('Location:index.html');

if(!isset($_POST)){

    return;
}

$firstName= $_POST['first-name-input'];
$lastName= $_POST['last-name-input'];
$telephoneNumber= $_POST['telephone-number-input'];
$address= $_POST['address-input'];
$organization= $_POST['organization-input'];
$email = $_POST['email-input'];



if(!empty($firstName) || !empty($lastName) || !empty($telephoneNumber) || !empty($address) || !empty($organization) || !empty($email) ){

    $user = 'root';


    try {
        
        $dbh = new PDO('mysql:host=localhost;dbname=test', $user);
        
        }
        
     catch (PDOException $e) {
        print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }



    $insertUser = 'Insert into persons values (0,?,?,?,?,?,?);';
    $sth = $dbh->prepare($insertUser);
    $sth->execute(array($firstName,$lastName,$email,$telephoneNumber,$address,$organization));

}