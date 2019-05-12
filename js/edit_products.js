let id_product;

function product_view(msg) {
    $("#table-header ~ tr").empty();
    if (Array.isArray(msg)) {
        msg.forEach(col => {
            $("table").append(
            '<tr id="tr-' + col['ID'] + '">\
                <td class="td-id">' + col['ID'] + '</td>\
                <td class="td-brand">' + col['Brand'] + '</td>\
                <td class="td-name">' + col['Name'] + '</td>\
                <td class="td-size">' + col['Size'] + '</td>\
                <td class="td-sex">' + col['Sex'] + '</td>\
                <td class="td-cost">' + col['Cost'] + '</td>\
                <td class="td-link">' + col['Link_image'] + '</td>\
                <td class="td-type">' + col['Type'] + '</td>\
                <td><button class="btn-edit" name="' + col['ID'] + '">Edit</button></td>\
                <td><button id="btn-delete" name="' + col['ID'] + '">Delete</button></td>\
            </tr>'
            );
        });
    }
    else {
        $("table").append(
            '<tr id="tr-' + msg['ID'] + '>\
                <td class="td-id">' + msg['ID'] + '</td>\
                <td class="td-brand">' + msg['Brand'] + '</td>\
                <td class="td-name">' + msg['Name'] + '</td>\
                <td class="td-size">' + msg['Size'] + '</td>\
                <td class="td-sex">' + msg['Sex'] + '</td>\
                <td class="td-cost">' + msg['Cost'] + '</td>\
                <td class="td-link">' + msg['Link_image'] + '</td>\
                <td class="td-type">' + msg['Type'] + '</td>\
                <td><button class="btn-edit" name="' + msg['ID'] + '">Edit</button></td>\
                <td><button id="btn-delete" name="' + msg['ID'] + '">Delete</button></td>\
            </tr>'
        );
    }
    $(".btn-edit").click(function() {
        $(".btn-edit").blur();
        // $(".form-edit").attr('id', 'form-edit');
        $("#form-edit").trigger('reset');

        $(".form-header-name").remove();
        $(".submit-modal-btn").remove();
        $("#form-edit").prepend('<div class="form-header-name">EDIT</div>');
        $("#form-edit").append('<input required type="submit" class="submit-modal-btn" id="submit-modal-btn"  value="Edit">');

        let id = "#tr-" + $(this).attr("name");
        $("#edit-inpt-name").val($(id + " .td-name").text());
        $("#edit-inpt-cost").val($(id + " .td-cost").text());
        $("#edit-inpt-link_image").val($(id + " .td-link").text());
        $("#edit-sex-" + $(id + " .td-sex").text().toLowerCase()).prop("checked", true);
        $("#edit-inpt-" + $(id + " .td-type").text().toLowerCase()).prop("checked", true);
        $("#edit-inpt-" + $(id + " .td-brand").text()).prop("checked", true);

        id_product = $(id + " .td-id").text();
        let size = $(id + " .td-size").text().split(',');
        size.forEach(element => {
            $("#es" + element).prop("checked", true);
        });
        $("#modal-edit").css('display', 'block');
    });
}

function product_list() {
    $.ajax({
        type: "POST",
        url: "php/main.php",
        contentType: "application/json",
        data: JSON.stringify({'action':'product_place'}),
        success: function(msg) {
            console.log(msg);
            msg = JSON.parse(msg);
            product_view(msg);
            $("#modal-edit").css('display', 'none');
        }
    });
}

$(document).ready(function(){
    product_list();

    $("#btn-add-product").click(function() {
        $("#btn-add-product").blur();

        // $(".form-edit").attr('id', 'form-create');

        $("#form-edit").trigger('reset');
        $(".form-header-name").remove();
        $(".submit-modal-btn").remove();

        $("#form-edit").prepend('<div class="form-header-name">ADD PRODUCT</div>');
        $("#form-edit").append('<input required type="submit" class="submit-modal-btn" id="submit-modal-btn"  value="Add">');

        
        $("#modal-edit").css('display', 'block');
    })



    $("#modal-edit").mouseup(function (e) {
        let container = $(".modal-content");
        if (container.has(e.target).length === 0){
            $("#modal-edit").css('display', 'none');
        }
    });

    $("#form-edit").submit(function(event) {
        event.preventDefault();
        $("#submit-modal-btn").blur();
        let this_form = $(this).serializeArray();
        let data = {};
        let size = "";
        $(this_form).each(function(index, obj){
            data[obj.name] = obj.value;
            if (obj.name == 'size') {
                if (size === "") {
                    size = obj.value;
                }
                else 
                    size = size + ',' + obj.value;
            }
        });
        data['size'] = size;
        data['id'] = id_product;
        if ($(".form-header-name").text() == 'EDIT') {
            data['action'] = 'update';
        }
        else {
            data['action'] = 'create';
        }

        console.log(data);
        data = JSON.stringify(data);
        $.ajax({
            type: "POST",
            url: "php/main.php",
            contentType: "application/json",
            data: data,
            success: function(msg) {
                console.log(JSON.parse(msg));
                product_list();
            }
        })
    });

    // $("#form-create").submit(function(event) {
    //     event.preventDefault();
    //     $("#submit-modal-btn").blur();
    //     console.log("22");
    //     let this_form = $(this).serializeArray();
    //     let data = {};
    //     let size = "";
    //     $(this_form).each(function(index, obj){
    //         data[obj.name] = obj.value;
    //         if (obj.name == 'size') {
    //             if (size === "") {
    //                 size = obj.value;
    //             }
    //             else 
    //                 size = size + ',' + obj.value;
    //         }
    //     });
    //     data['size'] = size;
    //     data['action'] = 'create';
    //     console.log(data);
    //     data = JSON.stringify(data);
    //     $.ajax({
    //         type: "POST",
    //         url: "php/main.php",
    //         contentType: "application/json",
    //         data: data,
    //         success: function(msg) {
    //             product_list();
    //         }
    //     })
    // });
});