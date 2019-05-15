

$(document).ready(function(){

    // $("#filter-slider").slider({
    //     animate: "slow",
    //     range: true,
    //     values: [0, 150],
    //     slide: function(event, ui) {
    //         $("#result-start").text(ui.values[0]);
    //         $("#result-end").text(ui.values[1]);
    //     }
    // });

    check_session();
    product_place();
    slider();
    let modalSignUp = document.getElementById('modalSignup');
    let btnSignUp = document.getElementById('signUpBtn');
    let form_signup = document.getElementById('errors-signup');

    btnSignUp.addEventListener('click', openModalSignup);
    function openModalSignup() {
        modalSignUp.style.display = 'block';
    }

    function slider() {
        $.ajax({
            type:"POST",
            url: "php/main.php",
            contentType: "application/json",
            data: JSON.stringify({'action': 'range_price'}),
            success: function(msg) {
                msg = JSON.parse(msg);
                msg['min_price'] = parseInt(msg['min_price'], 10);
                msg['max_price'] = parseInt(msg['max_price'], 10);

                console.log(msg);

                $("#result-start").text(msg['min_price']);
                $("#result-end").text(msg['max_price']);

                $("#filter-slider").slider({
                    animate: "slow",
                    min: msg['min_price'],
                    max: msg['max_price'],
                    range: true,
                    values: [msg['min_price'], msg['max_price']],
                    slide: function(event, ui) {
                        $("#result-start").text(ui.values[0]);
                        $("#result-end").text(ui.values[1]);
                    }
                });
            }
        })
    }

    function check_session() {
        $.ajax({
            type:"POST",
            url: "php/main.php",
            contentType: "application/json",
            data: JSON.stringify({'action':'check_session'}),
            success: function(msg) {
                msg = JSON.parse(msg);
                console.log(msg);
                if (msg['User'] == 'none') {
                    $("#sign-in-div3").css("display", "none");
                    $(".form-div3").css("display", "flex");
                }
                else {
                    $(".form-div3").css("display", "none");
                    $("#sign-in-div3").css("display", "flex");
                    $("#header-user").html("Hello, " + msg['User']);
                }
            }
        });
    }

    function product_place() {
        let filter = {'action':'product_place'}
        $.ajax({
            type: "POST",
            url: "php/main.php",
            contentType: "application/json",
            data: JSON.stringify(filter),
            success: function(msg) {
                msg = JSON.parse(msg);
                product_view(msg);
            }
        });
    }

    function product_view(msg) {
        console.log(msg);
        if (Array.isArray(msg)){
            msg.forEach(col => {
                $("#product-place").append(
                    '<div id="product">\
                        <div id="product-img">\
                            <img src="' + col['Link_image'] +'">\
                        </div>\
                        <div id="product-text">\
                            <div id="product-name">' + col['Name'] +'</div>\
                            <div id="product-cost">' + col['Cost'] + ' $' + '</div>\
                            <button id="product-to-basket-btn" value="">ADD TO CART</button>\
                        </div>\
                    </div>');
            });
        }
        else {
            $("#product-place").append(
            '<div id="product">\
                <div id="product-img">\
                    <img src="' + msg['Link_image'] +'">\
                </div>\
                <div id="product-text">\
                    <div id="product-name">' + msg['Name'] +'</div>\
                    <div id="product-cost">' + msg['Cost'] + '$' + '</div>\
                    <button id="product-to-basket-btn" value="">ADD TO CART</button>\
                </div>\
            </div>');
        }
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
        let data = {};
        $(this_form).each(function(index, obj){
            data[obj.name] = obj.value;
        });
        data['action'] = 'signin';
        data = JSON.stringify(data);
        $.ajax({
            type:"POST",
            url: "php/main.php",
            contentType: "application/json",
            data: data,
            success: function(msg) {
                console.log(msg);
                if (msg == '1') {
                    check_session();
                }
                else {
                    $("#modalSignup").css('display', 'block');
                    $("#error-signin").css('display', 'block');
                    $(".modal-content").css('display', 'none');
                }

            }
        });
    });

    $("#form-signUp-id").submit(function(event){
        $(".submit-signUp-modal").blur();
        let this_form = $(this).serializeArray();
        let data = {};
        $(this_form).each(function(index, obj){
            data[obj.name] = obj.value;
        });
        data['action'] = "signup";
        console.log(data);

        data = JSON.stringify(data);
        console.log(data);

        event.preventDefault();
        $.ajax({
            type:"POST",
            url: "php/main.php",
            contentType: "application/json",
            data: data,
            success: function(msg) {
                console.log(msg);
                msg = JSON.parse(msg);
                if ('errors' in msg) {
                    $('#errors-signup').empty();
                    $('#errors-signup').append(msg.errors);
                }
                else {
                    $(".modal-content").css('display', 'none');
                    $("#success-signup").css('display', 'block');
                }
                

                console.log(msg);
                // $('#signup_form_container').html(msg);
            },
            failure: function(errMsg) {
                alert(errMsg);
            },
            error: function(xml, error) {
                console.log(error);
              }
        });
    });

    $("#logout-btn-header").click(function() {
        
        let data = {'action':'logout'};
        data = JSON.stringify(data);
        $.ajax({
            type:"POST",
            url: "php/main.php",
            contentType: "application/json",
            data: data,
            success: function() {
                check_session();
            } 
        });
    });

    $("#personal-cabinet").click(function() {
        let data = {'action' : 'check_admin'};
        data = JSON.stringify(data);
        $.ajax({
            type:"POST",
            url: "php/main.php",
            contentType: "application/json",
            data: data,
            success: function(msg) {
                if (msg == '1') {
                    $(location).attr('href', 'admin.html')
                }
                console.log(msg);
            }
        });
    });

    
});


    // $(".form-signUp-modal").ajaxForm({
    //     type:"POST",
    //     url: "php/main.php",
    //     success: function(msg) {
    //         alert(msg);
    //         $('#signup_form_container').html(msg);
    //     }
    // });