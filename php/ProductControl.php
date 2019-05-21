<?php
class ProductControl {
    private $dbh;

    function __construct($dbh) {
        $this->dbh = $dbh;
    }

    function productPlace() {
        return $this->dbh->getProduct();
    }

    function basketCount() {
        if (isset($_SESSION['cart_count']))
            return $_SESSION['cart_count'];
        else
            return 0;
    }

    function getProductsBasket() {
        // return $_SESSION['cart'];
        if (isset($_SESSION['cart']))
            return $this->dbh->getProductsByArray($_SESSION['cart']);
        return null;
    }

    function addToCart($data) {
        if (!isset($_SESSION['cart'])){
            $_SESSION['cart'] = array($data['id']);
            $_SESSION['cart_count'] = count($_SESSION['cart']);
        }
        else {
            $_SESSION['cart'][] = $data['id'];
            $_SESSION['cart_count'] = count($_SESSION['cart']);
        }
        // unset($_SESSION['cart']);
        // unset($_SESSION['cart_count']);
        return $_SESSION['cart_count'];
    }

    function filter($data) {
        return $this->dbh->selectFilter($data);
    }

    function rangePrice(){
        return $this->dbh->getRangePrice();
    }

    function delete($data) {
        return $this->dbh->deleteProduct($data['id']);
    }

    function update($data) {
        return $this->dbh->updateProduct($data);
    }

    function create($data) {
        return $this->dbh->createProduct($data);
    }

    function deleteFromBasket($data) {
        // return gettype($data['id']);
        foreach ($_SESSION['cart'] as $key => $id) {
            if ($id == $data['id']) {
                unset($_SESSION['cart'][$key]);
                $_SESSION['cart_count']--;
            }
        }
    }
}