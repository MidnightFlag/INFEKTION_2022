<?php 
session_start();
header("Content-Security-Policy: default-src 'self'; script-src 'unsafe-hashes' 'strict-dynamic' 'nonce-casebypassezmaisbon4889498sgf78dsf' 'self'; style-src 'unsafe-inline' 'self' https://fonts.googleapis.com; object-src 'none';base-uri 'self'; connect-src 'self' ws://midnight.atlas453.com:4490; font-src 'self' https://fonts.gstatic.com; frame-src 'self'; img-src 'self'; manifest-src 'self'; media-src 'self'; worker-src 'none';");

if(!isset($_SESSION['nickname']))
	if(!(isset($_GET['nickname'], $_GET['secret']) && strlen((string)$_GET['nickname']) > 0 && $_GET['secret'] === "CocoSemite") > 0) {
		die("OUH OH");
	} else {
		$_SESSION['nickname'] = $_GET['nickname'];
	}
?>


<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>MEDUS'OM | ORGA</title>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="" />
	<meta name="author" content="" />
	
	<!-- ================== BEGIN core-css ================== -->
	<link href="/assets/css/vendor.min.css" rel="stylesheet" />
	<link href="/assets/css/app.min.css" rel="stylesheet" />
	<!-- ================== END core-css ================== -->
	
	<!-- ================== BEGIN page-css ================== -->
	<link href="/assets/plugins/jvectormap-next/jquery-jvectormap.css" rel="stylesheet" />
	<!-- ================== END page-css ================== -->

</head>
<body>
	<!-- BEGIN #app -->
	<div id="app" class="app">
		<!-- BEGIN #header -->
		<div id="header" class="app-header">
			<!-- BEGIN desktop-toggler -->
			<div class="desktop-toggler">
				<button type="button" class="menu-toggler" data-toggle-class="app-sidebar-collapsed" data-dismiss-class="app-sidebar-toggled" data-toggle-target=".app">
					<span class="bar"></span>
					<span class="bar"></span>
					<span class="bar"></span>
				</button>
			</div>
			<!-- BEGIN desktop-toggler -->
			
			<!-- BEGIN mobile-toggler -->
			<div class="mobile-toggler">
				<button type="button" class="menu-toggler" data-toggle-class="app-sidebar-mobile-toggled" data-toggle-target=".app">
					<span class="bar"></span>
					<span class="bar"></span>
					<span class="bar"></span>
				</button>
			</div>
			<!-- END mobile-toggler -->
			
			<!-- BEGIN brand -->
			<div class="brand">
				<a class="brand-logo">
					<span class="brand-img">
						<span class="brand-img-text text-theme">M</span>
					</span>
					<span class="brand-text">MEDUS'OM 2.0</span>
				</a>
			</div>
			<!-- END brand -->
			
			<!-- BEGIN menu -->
			<div class="menu">
				<div class="menu-item dropdown dropdown-mobile-full">
					<a href="#" data-bs-toggle="dropdown" data-bs-display="static" class="menu-link">
						<div class="menu-img online">
							<img nonce="casebypassezmaisbon4889498sgf78dsf" src="/assets/img/user/user-4.jpg" alt="Profile" height="60" />
						</div>
						<div class="menu-text d-sm-block d-none"><?=htmlentities($_SESSION['nickname']);?></div>
					</a>
					<div class="dropdown-menu dropdown-menu-end me-lg-3 fs-11px mt-1">
						<a class="dropdown-item d-flex align-items-center" href="/medus0m_l0g0u7">LOGOUT <i class="bi bi-toggle-off ms-auto text-theme fs-16px my-n1"></i></a>
					</div>
				</div>
			</div>
			<!-- END menu -->
			
		</div>
		<!-- END #header -->
		
		<!-- BEGIN #sidebar -->
		<div id="sidebar" class="app-sidebar">
			<!-- BEGIN scrollbar -->
			<div class="app-sidebar-content" data-scrollbar="true" data-height="100%">
				<!-- BEGIN menu -->
				<div class="menu">
					<div class="menu-header">Navigation</div>
					<div class="menu-item">
						<a href="/cheat.php" class="menu-link">
							<span class="menu-icon"><i class="bi bi-cpu"></i></span>
							<span class="menu-text">Anti-Cheat</span>
						</a>
					</div>
					<div class="menu-item">
						<a href="/chat.php" class="menu-link">
							<span class="menu-icon"><i class="fa fa-comment-alt"></i></span>
							<span class="menu-text">Chat</span>
						</a>
					</div>
				</div>
			</div>
			<!-- END scrollbar -->
		</div>
		<!-- END #sidebar -->
			
		<!-- BEGIN mobile-sidebar-backdrop -->
		<button class="app-sidebar-mobile-backdrop" data-toggle-target=".app" data-toggle-class="app-sidebar-mobile-toggled"></button>
		<!-- END mobile-sidebar-backdrop -->
		
		<!-- BEGIN #content -->
		<div id="content" class="app-content">
			<!-- BEGIN row -->
			<div class="row justify-content-center">
				<!-- BEGIN col-10 -->
				<div class="col-xl-10">
					<!-- BEGIN row -->
					<div class="row">
						<!-- BEGIN col-9 -->
						<div class="col-xl-12">
							<!-- BEGIN #chatWidget -->
							<div id="chatWidget" class="mb-5">
								<div class="card">
									<div class="card-body">
										<div class="row" id="chats">
										</div>
									</div>
									<div class="card-arrow">
										<div class="card-arrow-top-left"></div>
										<div class="card-arrow-top-right"></div>
										<div class="card-arrow-bottom-left"></div>
										<div class="card-arrow-bottom-right"></div>
									</div>
								</div>
							</div>
							<!-- END #chatWidget -->
							
					</div>
					<!-- END row -->
				</div>
				<!-- END col-10 -->
			</div>
			<!-- END row -->
		</div>
		<!-- END #content -->
		
		<!-- BEGIN btn-scroll-top -->
		<a href="#" data-toggle="scroll-to-top" class="btn-scroll-top fade"><i class="fa fa-arrow-up"></i></a>
		<!-- END btn-scroll-top -->
	</div>
	<!-- END #app -->
	
	<!-- ================== BEGIN core-js ================== -->
	<script nonce="casebypassezmaisbon4889498sgf78dsf" src="/assets/js/vendor.min.js"></script>
	<script nonce="casebypassezmaisbon4889498sgf78dsf" src="/assets/js/app.min.js"></script>
	<!-- ================== END core-js ================== -->
	
	<!-- ================== BEGIN page-js ================== -->
	<script nonce="casebypassezmaisbon4889498sgf78dsf" src="/assets/plugins/jvectormap-next/jquery-jvectormap.min.js"></script>
	<script nonce="casebypassezmaisbon4889498sgf78dsf" src="/assets/plugins/jvectormap-content/world-mill.js"></script>
	<script nonce="casebypassezmaisbon4889498sgf78dsf" src="/assets/plugins/apexcharts/dist/apexcharts.min.js"></script>
	<!-- ================== END page-js ================== -->
	<script nonce="casebypassezmaisbon4889498sgf78dsf">
			var nickname = "<?=$_SESSION['nickname'];?>";
	
			$(document).ready(function() {
				setup();
			});

			var audio = new Audio('notif.mp3');
			teams = []
			var socket;
			var orgaTeam = "0rga_f0r_th3_w1n_bahahah";

			function logout(id) {
				data = JSON.stringify({"team": id, "action": "logout"});
				console.log(data)
				socket.send(data);
				console.log('Team kicked for ' + id);
				document.getElementById('chat'+id).innerHTML = '';
			}

			function bot(id) {
				data = JSON.stringify({"team": id, "action": "bot", "value": document.getElementById('chat'+id).innerHTML});
				socket.send(data);
				console.log('Bot triggered for ' + id);
			}

			function send(id) {
				clearNotif(id);
				data = JSON.stringify({"team": id, "action": "msg", "value": $('#msg'+id)[0].value});
				socket.send(data);
				$('#msg'+id)[0].value = "";
			}

			function setNotif(newId) {
				audio.play();
				$('#card-chat'+newId).attr('class', 'card-body bg-danger bg-opacity-15');
				let ps = new PerfectScrollbar('#card-chat'+newId);
				ps.update();
			}

			function clearNotif(newId) {
				$('#card-chat'+newId).attr('class', 'card-body bg-white bg-opacity-15');
				let ps = new PerfectScrollbar('#card-chat'+newId);
				ps.update();
			}

			function listen() {
				for(team of teams) {
					let newId = team.slice()
					let ps = new PerfectScrollbar('#card-chat'+newId);
        			ps.update();
					document.getElementById("msg"+newId).addEventListener("keyup", function(event) {
						if (event.keyCode === 13) {
							event.preventDefault();
							send(newId);
						}
					});
					document.getElementById("bot"+newId).addEventListener("click", function(event) {
						clearNotif(newId);
						bot(newId)
					});
					document.getElementById("card-chat"+newId).addEventListener("click", function(event) {
						clearNotif(newId);
					});
					document.getElementById("logout"+newId).addEventListener("click", function(event) {
						clearNotif(newId);
						logout(newId)
					});
				}
			}

			function createChat(team) {
				document.getElementById('chats').innerHTML += '<div class="col-xl-4"><div class="card"><div id="header'+team+'" class="card-header bg-none fw-bold d-flex align-items-center">'+team+' <button type="button" id="bot'+team+'" class="btn btn-outline-theme bt-sm mx-2" >BOT</button><button type="button" id="logout'+team+'" class="btn btn-outline-danger btn-sm mx-2">LOGOUT</button><a href="#" class="ms-auto text-muted text-decoration-none" data-toggle="card-expand"><i class="fa fa-expand"></i></a></div><div id="card-chat'+team+'" class="card-body bg-white bg-opacity-15" data-scrollbar="true" style="height:200px;"><div class="widget-chat" id="chat'+team+'"></div></div><div class="card-footer bg-none"><div class="input-group"><input id="msg'+team+'" type="text" class="form-control" placeholder="Text message..."><button onclick="send(\''+team+'\')" class="btn btn-outline-default" type="button"><i class="fa fa-paper-plane text-muted"></i></button></div></div></div></div>';
				listen();
			}
			
			function htmlEntities(str) {
				return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
			}

			function setup() {
				let host = 'ws://midnight.atlas453.com:4490/'+orgaTeam+'/'+nickname;
				socket = new WebSocket(host);
				socket.binaryType = 'arraybuffer';
				if(socket){
					socket.onopen = function(){
						console.log('Communication opened');
					}
					socket.onmessage = function(msg){
						let data = JSON.parse(msg.data);
						if(data.team != orgaTeam) {
							if(!teams.includes(data.team)) {
								teams.push(data.team);
								createChat(data.team);
							}
							if(data["type"] === 1) {
								if(data["nickname"] === nickname)
									document.getElementById('chat'+data.team).innerHTML += '<div class="widget-chat-item reply"><div class="widget-chat-content"><div class="widget-chat-message last">'+data["data"]+'</div></div></div>'
								else {
									setNotif(data.team);
									document.getElementById('chat'+data.team).innerHTML += '<div class="widget-chat-item"><div class="widget-chat-media"><img src="/assets/img/user/user-2.jpg" alt="" /></div><div class="widget-chat-content"><div class="widget-chat-name">'+data["nickname"]+'</div><div class="widget-chat-message last">'+data["data"]+'</div></div></div>'
								}
							} else if(data["type"] === 0) {
								document.getElementById('chat'+data.team).innerHTML += '<div class="widget-chat-date">'+data["data"]+'</div>'
							}

							//let elem = $('#card-chat'+data.team);
							//elem.animate({ scrollTop: elem.prop("scrollHeight")}, 500);
						}
					}
					socket.onclose = function(){
						console.log('Communication lost');
							setTimeout(function() {
							setup();
							}, 2000);
					}
				} else {
					setup();
				}
			}
	</script>
</body>
</html>
