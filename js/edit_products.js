let id_product;

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
            <td class="td-brand">' + msg['Brand'] + '</td>\
            <td class="td-name">' + msg['Name'] + '</td>\
            <td class="td-size">' + msg['Size'] + '</td>\
            <td class="td-sex">' + msg['Sex'] + '</td>\
            <td class="td-cost">' + msg['Cost'] + '</td>\
            <td class="td-link">' + msg['Link_image'] + '</td>\
            <td class="td-type">' + msg['Type'] + '</td>\
            <td><button class="btn-edit" name="' + msg['ID'] + '">Edit</button></td>\
            <td><button class="btn-delete" name="' + msg['ID'] + '">Delete</button></td>\
        </tr>'
    );
}

function product_view(msg) {
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

    $(".btn-delete").click(function() {
        $(".btn-delete").blur();
        let data = {'id' : $(this).attr("name")};
        let promise = getPromise('ProductControl', 'delete', data);
        promise.done(function(msg){
            msg = JSON.parse(msg);
            product_list();
        });
    });
}

function product_list() {
    let promise = getPromise('ProductControl', 'productPlace', '');
    promise.done(function(msg){
        msg = JSON.parse(msg);
        product_view(msg);
        $("#modal-edit").css('display', 'none');
    });
}

$(document).ready(function(){
    product_list();

    $("#btn-add-product").click(function() {
        $("#btn-add-product").blur();
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
        let method;
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
            method = 'update';
        }
        else {
            method = 'create';
        }
        let promise = getPromise('ProductControl', method, data);
        promise.done(function(msg){
            product_list();
        })
    });

    $("#btn-exit").click(function() {
        $("#btn-exit").blur();
        $(location).attr('href', 'index.html');
    })
});