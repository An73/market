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
		<title>Market</title>
		<link rel="stylesheet" href="css/style.css">
		<link rel="stylesheet" href="css/jquery-ui.css">

		<script src="./js/jquery-3.4.0.js"></script>
		<script src="./js/jquery.form.js"></script>
		<script src="./js/main.js"></script>
		<script src="./js/jquery-ui.min.js"></script>
		<script src="./js/jquery.ui.touch-punch.min.js"></script>
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
				<div class="filter-block">
					<label class="header">Price</label>
					<span id="result-polzunok"></span>
					<div id="filter-slider" class="filter-slider">

					</div>
				</div>
			</div>
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
				</div>
			</div>
			<div class="block">
				<div id="form-size" class="filter-block">
					<label class="header">Size</label>
					<!-- <div class="checkbox-size-block"> -->
                        <input type="checkbox" name="size" value="4" id="es4">
                        <label class="l-checkbox-size" value="4" for="es4"></label>
                        <input type="checkbox" name="size" value="4.5" id="es4.5">
                        <label class="l-checkbox-size"  for="es4.5" value="4.5" ></label>
                        <input type="checkbox" name="size" value="5" id="es5">
                        <label class="l-checkbox-size " for="es5" value="5" ></label>
                        <input type="checkbox" name="size" value="5.5" id="es5.5">
                        <label class="l-checkbox-size"  for="es5.5" value="5.5" ></label>
                        <input type="checkbox" name="size" value="6" id="es6">
                        <label class="l-checkbox-size " for="es6" value="6" ></label>
                        <input type="checkbox" name="size" value="6.5" id="es6.5">
                        <label class="l-checkbox-size"  for="es6.5" value="6.5" ></label>
                        <input type="checkbox" name="size" value="7" id="es7">
                        <label class="l-checkbox-size " for="es7" value="7" ></label>
                        <input type="checkbox" name="size" value="7.5" id="es7.5">
                        <label class="l-checkbox-size"  for="es7.5" value="7.5" ></label>
                        <input type="checkbox" name="size" value="8" id="es8">
                        <label class="l-checkbox-size " for="es8" value="8" ></label>
                        <input type="checkbox" name="size" value="8.5" id="es8.5">
                        <label class="l-checkbox-size"  for="es8.5" value="8.5" ></label>
                        <input type="checkbox" name="size" value="9" id="es9">
                        <label class="l-checkbox-size " for="es9" value="9" ></label>
                        <input type="checkbox" name="size" value="9.5" id="es9.5">
                        <label class="l-checkbox-size"  for="es9.5" value="9.5" ></label>
                        <input type="checkbox" name="size" value="10" id="es10">
                        <label class="l-checkbox-size"  for="es10" value="10" ></label>
                        <input type="checkbox" name="size" value="10.5" id="es10.5">
                        <label class="l-checkbox-size" for="es10.5" value="10.5" ></label>
                        <input type="checkbox" name="size" value="11" id="es11">
                        <label class="l-checkbox-size"  for="es11" value="11" ></label>
                        <input type="checkbox" name="size" value="11.5" id="es11.5">
                        <label class="l-checkbox-size" for="es11.5" value="11.5" ></label>
                        <input type="checkbox" name="size" value="12" id="es12">
                        <label class="l-checkbox-size"  for="es12" value="12" ></label>
                        <input type="checkbox" name="size" value="12.5" id="es12.5">
                        <label class="l-checkbox-size" for="es12.5" value="12.5" ></label>
                        <input type="checkbox" name="size" value="13" id="es13">
                        <label class="l-checkbox-size"  for="es13" value="13" ></label>
                        <input type="checkbox" name="size" value="14" id="es14">
                        <label class="l-checkbox-size"  for="es14" value="14" ></label>
                        <input type="checkbox" name="size" value="15" id="es15">
                        <label class="l-checkbox-size"  for="es15" value="15" ></label>
                        <input type="checkbox" name="size" value="16" id="es16">
                        <label class="l-checkbox-size"  for="es16" value="16" ></label>
                        <input type="checkbox" name="size" value="17" id="es17">
                        <label class="l-checkbox-size"  for="es17" value="17" ></label>
                        <input type="checkbox" name="size" value="18" id="es18">
						<label class="l-checkbox-size"  for="es18" value="18" ></label>
					<!-- </div> -->
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
					<button id="product-to-basket-btn" value="">ADD TO CART</button>
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