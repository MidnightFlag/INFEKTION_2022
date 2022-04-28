<?php
include('vendor/autoload.php');

session_start();
if(!isset($_SESSION['nickname'])) {
	die("OUH OH");
}

$MongoClient = new MongoDB\Client('mongodb://admin:uybR37VWgQyGZ3nRWKGXtdtVJKic82dm@midnight.atlas453.com:27017/orga?authSource=admin');

if(isset($_GET['team'], $_GET['action'])) {
	$team = (string)$_GET['team'];
	$action = (string)$_GET['action'];
	
	if($action === "BAN") {
		$time = (int) $_GET['time'];
		$msg = (string) $_GET['msg'];
		$end = (new \DateTime('', new \DateTimeZone('Europe/Paris')))->modify('+99 years');
		if($time > 0) {
			$end = (new \DateTime('', new \DateTimeZone('Europe/Paris')))->modify('+ '.$time.' minutes');
		}
        $request = [
            'team' => $team,
            'message' => $msg,
            'date' => new MongoDB\BSON\UTCDateTime($end->format('U') * 1000)
        ];
        $MongoClient->orga->actions->insertOne($request);
	} else if($action === "UNBAN") {
        $MongoClient->orga->actions->deleteMany(["team" => $team]);
	}
} else {
	$res = [];
	$teams = $MongoClient->orga->requests->distinct("team");
	$now = (new \DateTime('', new \DateTimeZone('Europe/Paris')))->modify('-60 minutes');
	$minDate = new MongoDB\BSON\UTCDateTime(($now)->format('U') * 1000);
	$date = (new \DateTime('', new \DateTimeZone('Europe/Paris')));
	$mongoDate = new MongoDB\BSON\UTCDateTime($date->format('U') * 1000);
	foreach($teams as $teamId) {
		$ips = $MongoClient->orga->requests->distinct("ip", ["team" => $teamId, "date" => ['$gte' => $minDate]]);
		$requests = $MongoClient->orga->requests->count(["team" => $teamId, "date" => ['$gte' => $minDate]]);
		$banned = $MongoClient->orga->actions->findOne(["team" => $teamId, "date" => ['$gte' => $mongoDate]]);
		$data = new stdClass();
		$data->requests = $requests;
		$data->ips = $ips;
		$data->banned = $banned !== null;
		$res[$teamId] = $data;
	}
	die(json_encode($res));
}