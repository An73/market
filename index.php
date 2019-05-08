<?php
	//session_start();
	// require_once("DbHelper.php");
	// $test = new DbHelper();
	// echo $test->insertNewUser("admain", "admin", "admin");
	// $db_user = 'root';
	// $db_passwd = '';
	// $db_table_name = "rush00";
	// try {
	// 	$dbh = new PDO("mysql:host=localhost;dbname:$db_table_name", $db_user, $db_passwd);
	// } catch (PDOException $e) {
	// 	print "Couldn't connect to the database: " . $e->getMessage();
	// }
	// $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
?>

<!DOCTYPE html>

<html>
	<head>
		<meta charset="utf-8">
		<title>Title</title>
		<link rel="stylesheet" href="style.css">

		<script src="./js/jquery-3.4.0.js"></script>
		<script src="./js/jquery.form.js"></script>
		<script src="./js/main.js"></script>
	</head>
	<!-- <div id="signup_form_container">
	</div> -->

	<body>
		<div id="modalSignup" class="signupModal">
			<div id="success-signup">You successful sign up</div>
			<div id="error-signin">You entered your username or password incorrectly</div>
			<div class="modal-content">
				<div id="errors-signup"></div>
				<form id="form-signUp-id" class="form-signUp-modal">
					<!-- <input required type="text" name="firstName" class="input-signUp-modal" placeholder="First Name">
					<input required type="text" name="lastName" class="input-signUp-modal" placeholder="Last Name"> -->
					<input required type="text" name="newLogin" class="input-signUp-modal" placeholder="Login">
					<input required type="text" name="email" class="input-signUp-modal" placeholder="Email">
					<input required type="password" name="passwd1" class="input-signUp-modal" placeholder="Password">
					<input required type="password" name="passwd2" class="input-signUp-modal" placeholder="Password">
					<input required type="submit" name="submit" class="submit-signUp-modal" value="Sign Up">
				</form>
				<!-- <span class="closeBtn">
					&times;
				</span> -->
			</div>
		</div>
		<header>
			<div class="header-div1">

			</div>
			<div class="header-div2">
				<nav>
				<ul id="topmenu">
					<li class="running">
						<a href="running">
							<i class="icon icon-running"></i>
							<br>
							Running
						</a>
					</li>
					<li class="training">
						<a href="training">
							<i class="icon icon-training"></i>
							<br>
							Training
						</a>
					</li>
					<li class="lifestyle">
						<a href="lifestyle">
							<i class="icon icon-lifestyle"></i>
							<br>
							Lifestyle
						</a>
					</li>
				</ul>
			</nav>
			</div>
			<div class="header-div3">
				<div id="sign-in-div3">
					<div id="header-user"></div>
					<button name="personal-cabinet" id="personal-cabinet" class="button_header">Personal Cabinet</button>
					<button name="logout-btn-header" id="logout-btn-header" class="button_header">Logout</button>
				</div>
				<div class="form-div3">
					<form id="sign_in">
						<input type="text" name="login" class="sign_in_input" placeholder="Login">
						<input type="password" name="passwd" class="sign_in_input" placeholder="Password">
						<input type="submit" name="submit" class="button_header" value="Sign In">
					</form>
					<button name="sign_up" id="signUpBtn" class="button_header">Sign Up</button>
				</div>
			</div>
		</header>
		<aside>
			<div class="block">
				<div class="brand_block">
					<label class="header">Brand</label>
					<input type="checkbox" id="adidas" name="brand">
					<label class="l_checkbox" for="adidas">Adidas</label>
					<input type="checkbox" id="nike" name="brand">
					<label class="l_checkbox" for="nike">Nike</label>
					<input type="checkbox" id="reebok" name="brand">
					<label class="l_checkbox" for="reebok">Reebok</label>
					<input type="checkbox" id="puma" name="brand">
					<label class="l_checkbox" for="puma">Puma</label>
					<!-- <label class="l_checkbox"><input type="checkbox" id="2" name="brand"> Some option</label>
					<label class="l_checkbox"><input type="checkbox" id="3" name="brand"> Some option</label> -->
					<!-- <ul class="brand">
						<li class="header">Brand</li>
						<li class="leaf"><input type="checkbox" name="vehicle" value="Bike"> I have a bike</li>
						<li class="leaf">example</li>
						<li class="leaf">example</li>
						<li class="leaf">example</li>
						<li class="leaf">example</li>
					</ul> -->
				</div>
			</div>
		</aside>
		<div id="product-place">
			<div id="product">
				<div id="product-img">
					<img src="test.jpg">
				</div>
				<div id="product-text">
					<div id="product-name">Puma California Casual Sneakers</div>
					<div id="product-cost">150 $</div>
					<button id="product-to-basket" value="">In basket</button>
				</div>
			</div>

			<div id="product">
			</div>
			<div id="product">
			</div>
			<div id="product">
			</div>
			<div id="product">
			</div>
			<div id="product">
			</div>
		</div>
		<!-- <div class="search">
			<form>
				<input type="text" name="search" placeholder="Search">
				<input type="submit" name="submit_s" value="Go">
			</form>
		</div> -->

		<footer>
			
		</footer>
	</body>
</html>