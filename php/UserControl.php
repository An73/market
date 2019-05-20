<?php
class UserControl {
    
    private $dbh;

    function __construct($dbh) {
        $this->dbh = $dbh;
    }
    
    
    function signUp($data) {
        $errs = $this->validate_form($data);
        if (!empty($errs))
            return array('errors' => $errs[0]);
        $ret = $this->dbh->insertNewUser($data['newLogin'], $data['email'], hash('SHA256', $data['passwd1']));
        if ($ret != 'Success') {
            return array('errors' => $ret);
        }
        return array('success' => $ret);
    }

    function signIn($data) {
        $ret = $this->dbh->getUser($data['login'], hash('SHA256', $data['passwd']));
        if ($ret) {
            $_SESSION['User'] = $ret['User_login'];
            return "1";
        }
        return "0";
    }

    function checkSession() {
        if (!isset($_SESSION['User']))
            return array('User' => 'none');
        return array('User' => $_SESSION['User']);
    }

    function logOut() {
        unset($_SESSION['User']);
    }
    
    
    
    
    private function validate_form($data) {
        $errors = array();
        if (strlen($data['newLogin']) < 3) {
            $errors[] = 'Your login must be at least 3 letters long.';
        }
        if ($data['passwd1'] != $data['passwd2']) {
            $errors[] = 'Please check that you have entered or correctly entered your password!';
        }
        return $errors;
    }
}