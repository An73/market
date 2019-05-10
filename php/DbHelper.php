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
                CREATE TABLE IF NOT EXISTS $this->table_products 
                    (ID INT(10) AUTO_INCREMENT PRIMARY KEY, 
                    Brand ENUM('adidas', 'nike', 'reebok', 'puma') NOT NULL,
                    Name VARCHAR(40) NOT NULL,
                    Size SET('4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '14', '15', '16', '17', '18') NOT NULL,
                    Sex ENUM('W', 'M') NOT NULL,
                    Cost INT NOT NULL,
                    Link_image VARCHAR(200) NOT NULL,
                    Type ENUM('Running', 'Training', 'Lifestyle'));
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

    function isAdmin($User_login) {
        $stmt = $this->pdo->query("SELECT User_admin
                                    FROM $this->table_user
                                    Where User_login='$User_login';");
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