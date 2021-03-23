<?php


/**
 * 
 * Code that queries database for contacts or organizations. 
 * Data can match a string provided through the post method
 * 
 */


// data retrieving sql statements
$selectAllContactsSQL = 'SELECT * from persons';
$selectAllOrgsSQL = 'SELECT * from organizations';
$selectMatchingContactsSQL = 'SELECT * FROM persons  where first_name like ? or last_name like ? ';
$selectMatchingOrgsSQL = "SELECT * from organizations where name like ?";



$user = 'root';


try {
    
    $dbh = new PDO('mysql:host=localhost;dbname=test', $user);
    
    }
    
 catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}


if(isset($_POST)){


// string to match persons and organizations against. can occur anywhere in a person's first name or last name or an organization's name.
$string = "%".$_POST['string']."%";

switch ($_POST['operation']) {

    // case all contacts must be queried
    case 'allC':
        $sth = $dbh->prepare($selectAllContactsSQL);
        $sth->execute();
        break;
        
    // case all organizations must be queried
    case 'allO':
        $sth = $dbh->prepare($selectAllOrgsSQL);
        $sth->execute();
        break;

    // case contacts whose name or last name contain $string must be queried
    case 'matchC':
        $sth = $dbh->prepare($selectMatchingContactsSQL);
        $sth->execute(array($string,$string));
        break;

    // case organizations whose name or last name contain $string must be queried
    case 'matchO':
        $sth = $dbh->prepare($selectMatchingOrgsSQL);
        $sth->execute(array($string));
        break;
    default:
    die();
        return;

}
    
    $result = $sth->fetchAll();

    //jsonify result
    $json = json_encode($result);
    print_r($json);
die();
return;


}













