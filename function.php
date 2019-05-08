<?php
require_once("DbHelper.php");
session_start();
$dbh = new DbHelper();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
        //echo "JSON";
    if ($_SERVER["CONTENT_TYPE"] == 'application/json'){
        $data = json_decode( file_get_contents('php://input'), true);
        $errs = array();
        if ($data['action'] == "signup") {
            $errs = validate_form($data);
            if (!empty($errs)) {
                echo json_encode(array('errors' => $errs[0]));
                exit;
            }
            $ret = $dbh->insertNewUser($data['newLogin'], $data['email'], hash('SHA256', $data['passwd1']));
            if ($ret != 'Success') {
                echo json_encode(array('errors' => $ret));
                exit;
            }
            echo json_encode(array('success' => $ret));
            exit;
        }
        else if ($data['action'] == "signin") {
            $ret = $dbh->getUser($data['login'], hash('SHA256', $data['passwd']));
            if ($ret) {
                $_SESSION['User'] = $ret['User_login'];
                //var_dump($_SESSION);
                echo "1";
                exit;
            }
            echo "0";
            exit;
        }
        else if ($data['action'] == 'check_session') {
            if (!isset($_SESSION['User'])) {
                echo json_encode(array('User' => 'none'));
                exit;
            }
            echo json_encode(array('User' => $_SESSION['User']));
            exit;
        }
        else if ($data['action'] == 'logout') {
            unset($_SESSION['User']);
        }
        // echo json_encode(array('foo' => 'bar'));
        //echo json_encode($errs);
        //echo "JSON";
        //echo $data;
        //exit;
    }
}

function validate_form($data) {
    $errors = array();
    if (strlen($data['newLogin']) < 3) {
        $errors[] = 'Your login must be at least 3 letters long.';
    }
    if ($data['passwd1'] != $data['passwd2']) {
        $errors[] = 'Please check that you have entered or correctly entered your password!';
    }
    return $errors;
}

function signUpForm() {
    header('Content-Type: application/json');
    echo json_encode(array('foo' => 'bar'));
    exit;
}
//     return;
//     if (isset($_POST['function']) && ($_POST['function'] == 'form_signup')) {
//         show_form(array());
//     }
//     else {
//         form_signup();
//     }
// }

// function form_signup() {
//     $errors = array();
//     if ($errors = validate_form()) {
//         show_form($errors);
//         return;
//     }
//     else {
//         print 'Succses';
//     }
//     show_form($errors);
// //     else {
// //         print <<<_HTML_
// //         <form method="POST" action="" class="form-signUp-modal">
// //            <input required type="text" name="firstName" class="input-signUp-modal" placeholder="First Name">
// //            <input required type="text" name="lastName" class="input-signUp-modal" placeholder="Last Name">
// //            <input required type="email" name="email" class="input-signUp-modal" placeholder="Email">
// //            <input required type="text" name="newLogin" class="input-signUp-modal" placeholder="Login">
// //            <input required type="password" name="passwd1" class="input-signUp-modal" placeholder="Password">
// //            <input required type="password" name="passwd2" class="input-signUp-modal" placeholder="Password">
// //            <input required type="submit" name="submit" class="submit-signUp-modal" value="Sign Up">
// //        </form>
// // _HTML_;
// //    }
// }

// function validate_form() {
//     $errors = array();

//     if (strlen($_POST['firstName'] < 3 && $_POST['lastName'] < 3))
//         $errors[] = 'Your First Name and Last Name must be at least 3 letters long.';
//     if ($_POST['passwd1'] != $_POST['passwd2'])
//         $errors[] = 'Please check that you have entered or correctly entered your password!';

//     return $errors;
// }

// function show_form($errors) {
//     print '<div id="modalSignup" class="signupModal">';
//     print '<div class="modal-content">';
//     print '<form method="POST" action="" id="form-signUp-id" class="form-signUp-modal">';
//     if ($errors) {
//         foreach ($errors as $err) {
//             print '<div class="error_signup">';
//             print $err;
//             print '</div>';
//         }
//     }
//     print <<<_HTML_
//     <input required type="text" name="firstName" class="input-signUp-modal" placeholder="First Name">
//     <input required type="text" name="lastName" class="input-signUp-modal" placeholder="Last Name">
//     <input required type="email" name="email" class="input-signUp-modal" placeholder="Email">
//     <input required type="text" name="newLogin" class="input-signUp-modal" placeholder="Login">
//     <input required type="password" name="passwd1" class="input-signUp-modal" placeholder="Password">
//     <input required type="password" name="passwd2" class="input-signUp-modal" placeholder="Password">
//     <input required type="submit" name="submit" class="submit-signUp-modal" value="Sign Up">
// </form>
// </div>
// </div>
// _HTML_;

// }