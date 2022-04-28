<?php 

session_start();
if(!isset($_SESSION['nickname'])) {
	die("OUH OH");
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
	<link href="assets/plugins/datatables.net-bs5/css/dataTables.bootstrap5.min.css" rel="stylesheet" />
	<link href="assets/plugins/datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css" rel="stylesheet" />
	<link href="assets/plugins/datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css" rel="stylesheet" />
	<link href="assets/plugins/bootstrap-table/dist/bootstrap-table.min.css" rel="stylesheet" />
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
							
								<!-- BEGIN #datatable -->
								<div id="datatable" class="mb-5">
									<h4>Supervision</h4>
									<div class="card">
										<div class="card-body">
											<table id="datatableDefault" class="table text-nowrap w-100">
												<thead>
													<tr>
														<th>Team ID</th>
														<th>Requests last 60mn.</th>
														<th>IPs last 60mn.</th>
														<th>Ips List</th>
														<th>Action</th>
													</tr>
												</thead>
												<tbody id="table">
												</tbody>
											</table>
										</div>
										<div class="card-arrow">
											<div class="card-arrow-top-left"></div>
											<div class="card-arrow-top-right"></div>
											<div class="card-arrow-bottom-left"></div>
											<div class="card-arrow-bottom-right"></div>
										</div>
									</div>
								</div>
								<!-- END #datatable -->
								
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

	<script src="assets/plugins/@highlightjs/cdn-assets/highlight.min.js"></script>
	<script src="assets/js/demo/highlightjs.demo.js"></script>
	<script src="assets/plugins/datatables.net/js/jquery.dataTables.min.js"></script>
	<script src="assets/plugins/datatables.net-bs5/js/dataTables.bootstrap5.min.js"></script>
	<script src="assets/plugins/datatables.net-buttons/js/dataTables.buttons.min.js"></script>
	<script src="assets/plugins/datatables.net-buttons/js/buttons.colVis.min.js"></script>
	<script src="assets/plugins/datatables.net-buttons/js/buttons.flash.min.js"></script>
	<script src="assets/plugins/datatables.net-buttons/js/buttons.html5.min.js"></script>
	<script src="assets/plugins/datatables.net-buttons/js/buttons.print.min.js"></script>
	<script src="assets/plugins/datatables.net-buttons-bs5/js/buttons.bootstrap5.min.js"></script>
	<script src="assets/plugins/datatables.net-responsive/js/dataTables.responsive.min.js"></script>
	<script src="assets/plugins/datatables.net-responsive-bs5/js/responsive.bootstrap5.min.js"></script>
	<script src="assets/plugins/bootstrap-table/dist/bootstrap-table.min.js"></script>
	<script src="assets/js/demo/sidebar-scrollspy.demo.js"></script>

	<script nonce="casebypassezmaisbon4889498sgf78dsf">
		var table;
		var handleRenderTableData = function() {
			table = $('#datatableDefault').DataTable({
				dom: "<'row mb-3'<'col-md-4 mb-3 mb-md-0'l><'col-md-8 text-right'<'d-flex justify-content-end'fB>>>t<'row align-items-center'<'mr-auto col-md-6 mb-3 mb-md-0 mt-n2 'i><'mb-0 col-md-6'p>>",
				lengthMenu: [ 10, 20, 30, 40, 50 ],
				responsive: true,
				buttons: [
					{ extend: 'print', className: 'btn btn-outline-default btn-sm ms-2' },
					{ extend: 'csv', className: 'btn btn-outline-default btn-sm' }
				]
			});
		};


		/* Controller
		------------------------------------------------ */
		$(document).ready(function() {
			handleRenderTableData();
		});

			$(document).ready(function() {
				refresh();
				setInterval(refresh, 15000);
			});

			function refresh() {
				document.getElementById('table').innerHTML = "";
				fetch('ajax.php',{
					method: 'GET',
  					credentials: 'include'
				}).then(function(response) {
					if(response.ok) {
						res = response.json().then(data => {
							for(row in data) {
								add(row, data[row]);
							}
						});
					} else {
						console.log('Impossible de récupérer les logs.');
					}
				})
				.catch(function(error) {
					console.log('Impossible de récupérer les logs.');
				});
			}

			function ban(id) {
				let time = prompt("Durée en minutes (0 ou négatif = perma)");
				let message = prompt("Message de ban");
				fetch('ajax.php?action=BAN&team='+id+'&time='+time+"&msg="+encodeURIComponent(message),
				{
					method: 'GET',
  					credentials: 'include'
				});
				refresh();
			}

			function unban(id) {
				fetch('ajax.php?action=UNBAN&team='+id,
				{
					method: 'GET',
  					credentials: 'include'
				});
				refresh();
			}
			
			function add(id, infos) {
				let button = '<button onclick="ban(\''+htmlEntities(id)+'\')" class="btn btn-outline-danger mx-2" type="button">Kick</button>';
				if(infos.banned) {
					button = '<button onclick="unban(\''+htmlEntities(id)+'\')" class="btn btn-outline-success mx-2" type="button">Unkick</button>';
				}
				document.getElementById('table').innerHTML += '<tr><td>'+htmlEntities(id)+'</td><td>'+htmlEntities(infos.requests)+'</td><td>'+htmlEntities(infos.ips.length)+'</td><td>'+infos.ips.join('<br>')+'</td><td>'+button+'</td></tr>';
			}
			function htmlEntities(str) {
				return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
			}
	</script>
</body>
</html>