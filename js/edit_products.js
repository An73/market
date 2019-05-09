function product_view(msg) {
    if (Array.isArray(msg)) {
        msg.forEach(col => {
            $("table").append(
            '<tr>\
                <td>' + col['ID'] + '</td>\
                <td>' + col['Name'] + '</td>\
                <td>' + col['Size'] + '</td>\
                <td>' + col['Sex'] + '</td>\
                <td>' + col['Cost'] + '</td>\
                <td>' + col['Link_image'] + '</td>\
                <td>' + col['Type'] + '</td>\
                <td><button>Edit</button></td>\
                <td><button>Delete</button></td>\
            </tr>'
            );
        });
    }
    else {
        $("table").append(
            '<tr>\
                <td>' + col['ID'] + '</td>\
                <td>' + col['Name'] + '</td>\
                <td>' + col['Size'] + '</td>\
                <td>' + col['Sex'] + '</td>\
                <td>' + col['Cost'] + '</td>\
                <td>' + col['Link_image'] + '</td>\
                <td>' + col['Type'] + '</td>\
                <td><button>Edit</button></td>\
                <td><button>Delete</button></td>\
            </tr>'
        );
    }
}

function product_list() {
    $.ajax({
        type: "POST",
        url: "php/main.php",
        contentType: "application/json",
        data: JSON.stringify({'action':'product_place'}),
        success: function(msg) {
            msg = JSON.parse(msg);
            product_view(msg);
        }
    });
}

$(document).ready(function(){
    product_list();
});