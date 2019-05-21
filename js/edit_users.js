
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

function patternTr(msg){
    $("table").append(
        '<tr id="tr-' + msg['ID'] + '">\
            <td class="td-id">' + msg['ID'] + '</td>\
            <td class="td-login">' + msg['User_login'] + '</td>\
            <td class="td-email">' + msg['Email'] + '</td>\
            <td class="td-passwd">' + msg['Passwd'] + '</td>\
            <td class="td-admin">' + msg['User_admin'] + '</td>\
            <td><button class="btn-edit" admin="' + msg['User_admin'] + '" name="' + msg['ID'] + '">Edit admin</button></td>\
            <td><button class="btn-delete" name="' + msg['ID'] + '">Delete</button></td>\
        </tr>'
    );
}

function user_view(msg) {
    $("#table-header ~ tr").empty();
    if (Array.isArray(msg)) {
        msg.forEach(col => {
            patternTr(col);
        });
    }
    else {
        patternTr(msg);
    }

    $(".btn-edit").click(function() {
        $(".btn-edit").blur();
        let admin = 0;
        if ($(this).attr("admin") == '0')
            admin = 1;
        let data = {'id' : $(this).attr("name"), 'admin': admin};
        let promise = getPromise('UserControl', 'updateAdmin', data);
        promise.done(function(msg){
            user_list();
        });
    });

    $(".btn-delete").click(function() {
        $(".btn-delete").blur();
        let data = {'id' : $(this).attr("name")};
        let promise = getPromise('UserControl', 'deleteUser', data);
        promise.done(function(msg){
            user_list();
        });
    });
}

function user_list() {
    let promise = getPromise('UserControl', 'userPlace', '');
    promise.done(function(msg) {
        msg = JSON.parse(msg);
        user_view(msg);
    });
}

$(document).ready(function(){
    user_list();

    $("#btn-exit").click(function() {
        $("#btn-exit").blur();
        $(location).attr('href', 'index.html');
    })
});