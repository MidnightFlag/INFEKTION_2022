<?php
include('vendor/autoload.php');

if(!isset($_GET['path']))
    $_GET['path'] = "/";
if(!isset($_GET['ip']))
    $_GET['ip'] = "Unknown";

if(isset($_GET['team']) && isset($_GET['path']) && isset($_GET['ip'])) {
    try {
        $team = (string) $_GET['team'];
        $path = (string) $_GET['path'];
        $ip = (string) $_GET['ip'];
        $date = (new \DateTime('', new \DateTimeZone('Europe/Paris')));
        $mongoDate = new MongoDB\BSON\UTCDateTime($date->format('U') * 1000);

        $MongoClient = new MongoDB\Client('mongodb://admin:uybR37VWgQyGZ3nRWKGXtdtVJKic82dm@midnight.atlas453.com:27017/orga?authSource=admin');
        $action = $MongoClient->orga->actions->findOne(["team" => $team, "date" => ['$gte' => $mongoDate]]);
        if($action !== null) {
            $message = str_replace("\"", "\\\"", $action->message);
            die('die("'.$message.'");');
        }
        
        $request = [
            'ip' => $ip,
            'team' => $team,
            'path' => $path,
            'date' => $mongoDate
        ];
        $MongoClient = new MongoDB\Client('mongodb://admin:uybR37VWgQyGZ3nRWKGXtdtVJKic82dm@midnight.atlas453.com:27017/orga?authSource=admin');
        $MongoClient->orga->requests->insertOne($request);
    } catch(Exception $ex) { var_dump($ex);}
}

die("");

?>