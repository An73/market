
let data = {'action' : 'check_admin'};
data = JSON.stringify(data);
$.ajax({
    type:"POST",
    url: "php/main.php",
    contentType: "application/json",
    data: data,
    success: function(msg) {
        if (msg == '0') {
            $("html").css('display', 'none');
        }
        console.log(msg);
    }
});

$(document).ready(function(){
    $(".left-half, .right-half").mouseover(function(e){
        $(this).css({'background-color': '#ffd351',
        'background-image': '-webkit-gradient(linear, left top, left bottom, from(#ffd351), to(#e06500))',
        'background-image': '-webkit-linear-gradient(top, #ffd351, #e06500)',
        'background-image': '-moz-linear-gradient(top, #ffd351, #e06500)',
        'background-image': '-ms-linear-gradient(top, #ffd351, #e06500)',
        'background-image': '-o-linear-gradient(top, #ffd351, #e06500)',
        'background-image': 'linear-gradient(to bottom, #ffd351, #e06500)',
        'filter:progid':'DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#ffd351, endColorstr=#e06500)'});
    });
    $(".left-half, .right-half").mouseout(function(e){
        $(this).css({'background-color': '#363636', 'background-image': 'none'});
    });

});