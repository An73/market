$("#form-signUp-id").submit(function(event){
    // console.log("S");
    event.preventDefault();
    $.ajax({
        type:"POST",
        async: true,
        url: "function.php",
        data: $("#signup_form_container").serialize(),
        success: function(msg) {
            alert(msg);
            $('#signup_form_container').html(msg);
        },
    });
});