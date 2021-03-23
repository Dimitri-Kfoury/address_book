<?php


/*

Code that deletes a record from the persons table

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



    $deletePerson = 'delete from persons where id = ?';
    $sth = $dbh->prepare($deletePerson);
    $sth->execute(array($id));

}