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

function patternTr(msg) {
    $("table").append(
        '<tr id="tr-' + msg['ID'] + '">\
            <td class="td-name">' + msg['Name'] + '</td>\
            <td class="td-brand">' + msg['Brand'] + '</td>\
            <td class="td-size">' + msg['Size'] + '</td>\
            <td class="td-cost">' + msg['Cost'] + '</td>\
            <td class="td-link"><div class="product-img">\
                                    <img src=' + msg['Link_image'] + '\
                                </div>\
            </td>\
            <td><button class="btn-delete" name="' + msg['ID'] + '">Delete</button></td>\
        </tr>'
    );

    $(".btn-delete").click(function() {
        $(".btn-delete").blur();
        let data = {'id': $(this).attr('name')};
        let promise = getPromise('ProductControl', 'deleteFromBasket', data);
        promise.done(function(msg){
            placeList();
        })
    })
}

function placeBasketView(msg) {
    $("#table-header ~ tr").empty();
    if (msg != null) {
        if (Array.isArray(msg)) {
            msg.forEach(col => {
                patternTr(col);
            });
        }
        else {
            patternTr(msg);
        }
    }
}


function placeList() {
    let promise = getPromise('ProductControl', 'getProductsBasket', '');
    promise.done(function(msg){
        msg = JSON.parse(msg);
        placeBasketView(msg);
    })
}

$(document).ready(function(){
    placeList();

    $("#btn-exit").click(function(){
        $(this).blur();
        $(location).attr('href', 'index.html');
    })
});
