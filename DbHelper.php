<?php

class DbHelper {
    private $db_user;
	private $db_passwd;
    private $db_name;
    private $pdo;
    private $table_user;
    private $table_products;

    function __construct() {
        $this->db_user = "root";
        $this->db_passwd = "648941";
        $this->db_name = "rush";
        $this->table_user = "users";
        $this->table_products = "products";
        try {
            $this->pdo = new PDO("mysql:host=localhost;dbname=$this->db_name", $this->db_user, $this->db_passwd);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
        } catch (PDOException $e) {
            echo "Couldn't connect to the database: " . $e->getMessage();
            die($e->getMessage());
        }

        $passAdm = hash('SHA256', 'admin');
        $sql = "CREATE TABLE IF NOT EXISTS $this->table_user 
                    (ID INT(10) AUTO_INCREMENT PRIMARY KEY, 
                    User_login VARCHAR(30) NOT NULL,
                    Email VARCHAR(320) NOT NULL,
                    Passwd VARCHAR(70) NOT NULL,
                    User_admin BOOLEAN DEFAULT '0');
                INSERT IGNORE INTO $this->table_user (ID, User_login, Email, Passwd, User_admin)
                        VALUE ('1', 'admin', 'admin@admin.com', '$passAdm', '1'); ";
        $this->pdo->exec($sql);
    }

    function insertNewUser($User_login, $Email, $Passwd) {

        $stmt = $this->pdo->query("SELECT User_login
                                    FROM $this->table_user
                                    WHERE User_login='$User_login' OR Email='$Email';");
        if ($stmt->fetch()) {
            return "Such login or email exists";
        }
        $stmt = $this->pdo->prepare("INSERT INTO users (User_login, Email, Passwd) VALUES (?,?,?)");
        $stmt->execute([$User_login, $Email, $Passwd]);
        return "Success";
        // var_dump($stmt->fetch(PDO::FETCH_ASSOC)); 
    }

    function getUser($User_login, $Passwd) {
        $stmt = $this->pdo->query("SELECT User_login, Passwd
                                    FROM $this->table_user
                                    WHERE User_login='$User_login' AND Passwd='$Passwd';");
        return $stmt->fetch();
    }

    function getProduct() {
        $stmt = $this->pdo->query("SELECT * 
                                    FROM $this->table_products;");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    

    function __destruct() {
        try {
            $this->pdo = null;
        } catch (PDOException $e) {
            echo "Couldn't disconnect to the database: " . $e->getMessage();
            die($e->getMessage());
        }
    }
}