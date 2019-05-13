function user_view(msg) {
    $("#table-header ~ tr").empty();
    if (Array.isArray(msg)) {
        msg.forEach(col => {
            $("table").append(
            '<tr id="tr-' + col['ID'] + '">\
                <td class="td-id">' + col['ID'] + '</td>\
                <td class="td-login">' + col['User_login'] + '</td>\
                <td class="td-email">' + col['Email'] + '</td>\
                <td class="td-passwd">' + col['Passwd'] + '</td>\
                <td class="td-admin">' + col['User_admin'] + '</td>\
                <td><button class="btn-edit" admin="' + col['User_admin'] + '" name="' + col['ID'] + '">Edit admin</button></td>\
                <td><button class="btn-delete" name="' + col['ID'] + '">Delete</button></td>\
            </tr>'
            );
        });
    }
    else {
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

    $(".btn-edit").click(function() {
        $(".btn-edit").blur();
        let admin = 0;
        if ($(this).attr("admin") == '0')
            admin = 1;
        let data = {'action' : 'update_admin', 'id' : $(this).attr("name"), 'admin': admin};
        $.ajax({
            type: "POST",
            url: "php/main.php",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(msg) {
                msg = JSON.parse(msg);
                console.log(msg);
                user_list();
            }
        });
    });

    $(".btn-delete").click(function() {
        $(".btn-delete").blur();
        let data = {'action' : 'delete_user', 'id' : $(this).attr("name")};
        console.log(JSON.stringify(data));
        $.ajax({
            type: "POST",
            url: "php/main.php",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(msg) {
                msg = JSON.parse(msg);
                console.log(msg);
                user_list();
            }
        });
    });
}

function user_list() {
    $.ajax({
        type: "POST",
        url: "php/main.php",
        contentType: "application/json",
        data: JSON.stringify({'action' :'user_place'}),
        success: function(msg) {
            console.log(msg);
            msg = JSON.parse(msg);
            user_view(msg);
        }
    });
}

$(document).ready(function(){
    user_list();

    $("#btn-exit").click(function() {
        $("#btn-exit").blur();
        $(location).attr('href', 'index.php');
    })
});