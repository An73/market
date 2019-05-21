

$(document).ready(function(){


    check_session();
    product_place();
    basket_count();
    slider();
    let type = "";
    let modalSignUp = document.getElementById('modalSignup');
    let btnSignUp = document.getElementById('signUpBtn');
    let form_signup = document.getElementById('errors-signup');

    btnSignUp.addEventListener('click', openModalSignup);
    function openModalSignup() {
        modalSignUp.style.display = 'block';
    }

    function slider() {
        let promise = getPromise('ProductControl', 'rangePrice', '');
        promise.done(function(msg){
            msg = JSON.parse(msg);
            msg['min_price'] = parseInt(msg['min_price'], 10);
            msg['max_price'] = parseInt(msg['max_price'], 10);

            $("#result-start").text(msg['min_price']);
            $("#result-end").text(msg['max_price']);

            $("#filter-slider").slider({
                animate: "fast",
                min: msg['min_price'],
                max: msg['max_price'],
                range: true,
                values: [msg['min_price'], msg['max_price']],
                slide: function(event, ui) {
                    $("#result-start").text(ui.values[0]);
                    $("#result-end").text(ui.values[1]);
                }
            });
        })
    }

    function check_session() {
        let promise = getPromise('UserControl', 'checkSession', '');
        promise.done(function(msg) {
            msg = JSON.parse(msg)
            if (msg['User'] == 'none') {
                $("#sign-in-div3").css("display", "none");
                $(".form-div3").css("display", "flex");
            }
            else {
                $(".form-div3").css("display", "none");
                $("#sign-in-div3").css("display", "flex");
                $("#header-user").html("Hello, " + msg['User']);
            }
        });
    }

    function product_place() {
        let promise = getPromise('ProductControl', 'productPlace', '');
        promise.done(function(msg){
            msg = JSON.parse(msg);
            product_view(msg);
        });
    }

    function basket_count() {
        let promise = getPromise('ProductControl', 'basketCount', '');
        promise.done(function(msg){
            $(".count-basket").html('');
            $(".count-basket").append(msg);
        });
    }

    function patternProduct(Link_image, Name, Cost, ID) {
        $("#product-place").append(
            '<div id="product">\
                <div id="product-img">\
                    <img src="' + Link_image +'">\
                </div>\
                <div id="product-text">\
                    <div id="product-name">' + Name +'</div>\
                    <div id="product-cost">' + Cost + ' $' + '</div>\
                    <button class="product-to-basket-btn" value="' + ID + '">ADD TO CART</button>\
                </div>\
            </div>');
    }

    function product_view(msg) {
        console.log(msg);
        $("#product-place").html('');
        if (Array.isArray(msg)){
            msg.forEach(col => {
                patternProduct(col['Link_image'], col['Name'], col['Cost'], col['ID']);
            });
        }
        else
            patternProduct(msg['Link_image'], msg['Name'], msg['Cost'], msg['ID']);
        
        $(".product-to-basket-btn").click(function(){
            $(this).blur();
            let data = {'id' : $(this).attr('value')};
            let promise = getPromise('ProductControl', 'addToCart', data);
            promise.done(function(msg){
                basket_count();
            });
        });
    }

    $("#modalSignup").mouseup(function (e) {
        let container = $(".modal-content");
        if (container.has(e.target).length === 0){
            modalSignUp.style.display = 'none';
            
            $(".modal-content").css('display', 'block');
            $("#success-signup").css('display', 'none');
            $("#error-signin").css('display', 'none');
        }
    });

    $("#sign_in").submit(function(event){
        event.preventDefault();

        let this_form = $(this).serializeArray();
        let params = {};
        $(this_form).each(function(index, obj){
            params[obj.name] = obj.value;
        });

        let promise = getPromise('UserControl', 'signIn', params);
        promise.done(function(msg){
            msg = JSON.parse(msg);
            if (msg == "1") {
                check_session();
            }
            else {
                $("#modalSignup").css('display', 'block');
                $("#error-signin").css('display', 'block');
                $(".modal-content").css('display', 'none');
            }
        });
    });

    $(".basket-div").click(function() {
        $(location).attr('href', 'cart.html');
    });

    $("#form-signUp-id").submit(function(event){
        event.preventDefault();
        $(".submit-signUp-modal").blur();
        let this_form = $(this).serializeArray();
        let data = {};
        let params = {};
        $(this_form).each(function(index, obj){
            params[obj.name] = obj.value;
        });

        let promise = getPromise('UserControl', 'signUp', params);
        promise.done(function(msg){
            if ('errors' in msg) {
                $('#errors-signup').empty();
                $('#errors-signup').append(msg.errors);
            }
            else {
                $(".modal-content").css('display', 'none');
                $("#success-signup").css('display', 'block');
            }
        });
    });

    $("#filter-form").submit(function(event){
        event.preventDefault();
        $(".button-filter-submit").blur();
        let this_form = $(this).serializeArray();
        let size = "";
        let brand = "";
        let sex = "";
        let data = {"brand": brand, "size": size, "sex": sex};
        $(this_form).each(function(index, obj){
            if (obj.name == "brand") {
                if (brand === "")
                    brand = "'" + obj.value + "'";
                else 
                    brand = brand + ",'" + obj.value + "'";
            }
            else if (obj.name == "sex") {
                if (sex === "")
                    sex = "'" + obj.value + "'";
                else 
                    sex = sex + ",'" + obj.value + "'";
            }
            else if (obj.name == "size") {
                if (size === "")
                    size = "'" + obj.value  + "'";
                else 
                    size = size + ",'" + obj.value + "'";
            }
        });
        data['type'] = type;
        data['min_price'] = $("#result-start").text();
        data['max_price'] = $("#result-end").text();
        data['size'] = size;
        data['brand'] = brand;
        data['sex'] = sex;
        data['price_min'] = $("#result-start").text();
        data['price_max'] = $("#result-end").text();

        let promise = getPromise('ProductControl', 'filter', data);
        promise.done(function(msg){
            msg = JSON.parse(msg);
            product_view(msg);
        });
    });

    $("#logout-btn-header").click(function() {
        let promise = getPromise('UserControl', 'logOut', '');
        promise.done(function(){
            check_session();
        });
    });

    $("#personal-cabinet").click(function() {
        let promise = getPromise('UserControl', 'checkAdmin', '');
        promise.done(function(msg) {
            msg = JSON.parse(msg);
            if (msg == '1') {
                $(location).attr('href', 'admin.html')
            }
        });
    });

    $(".running").click(function(event){
        event.preventDefault();
        type = "'Running'";
        $("#filter-form").submit();
    });
    $(".training").click(function(event){
        event.preventDefault();
        type = "'Training'";
        $("#filter-form").submit();
    });
    $(".lifestyle").click(function(event){
        event.preventDefault();
        type = "'Lifestyle'";
        $("#filter-form").submit();
    });
});

function getPromise(object, method, params) {
    let data = {};
    let promise;
    data['object'] = object;
    data['method'] = method;
    data['params'] = params;
    data = JSON.stringify(data);
    promise = ajaxPattern(data);
    return promise; 
}

function ajaxPattern(data) {
    return $.ajax({
        type:"POST",
        url: "php/main.php",
        contentType: "application/json",
        data: data
    });
}