<?php

/*

Code that deletes a record from the organizations table

*/


if(!isset($_POST)){

    return;
}

$id = $_POST['id'];



if(!empty($id)){

    $user = 'root';


    try {
        
        $dbh = new PDO('mysql:host=localhost;dbname=test', $user);
        
        }
        
     catch (PDOException $e) {
        print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }



    $deleteOrg = 'delete from organizations where id = ?';
    $sth = $dbh->prepare($deleteOrg);
    $sth->execute(array($id));

}