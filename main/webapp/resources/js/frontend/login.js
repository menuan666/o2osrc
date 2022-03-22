function toast1(){
    $('#toast').css("opacity", "0");
    $('#toast').css("display", "none");
}
$(function() {
    var loginUrl = '/frontend/localauthlogincheck';
    var loginCount = 0;

    $('#showTooltips').click(function() {
        var userName = $('#username').val();
        var password = $('#psw').val();
        if(isEmpty(password)||isEmpty(userName)){
            $("#infotoast").text("用户名或密码不能为空");
            $('#toast').css("display", "");
            $('#toast').css("opacity", "1");
            setTimeout("toast1()",1500);
            return;
        }
        var verifyCodeActual = $('#j_captcha').val();
        var needVerify = false;
        if (loginCount >= 3) {
            if (!verifyCodeActual) {
                $("#infotoast").text("验证码不能为空");
                $('#toast').css("display", "");
                $('#toast').css("opacity", "1");
                setTimeout("toast1()",1500);
                return;
            } else {
                needVerify = true;
            }
        }
        $.ajax({
            url : loginUrl,
            async : false,
            cache : false,
            type : "post",
            dataType : 'json',
            data : {
                userName : userName,
                password : password,
                verifyCodeActual : verifyCodeActual,
                needVerify : needVerify
            },
            success : function(data) {
                if (data.success) {
                    console.log(data.errMsg);
                    window.location.href = '/frontend/index';
                } else {
                    $("#infotoast").text("登陆失败");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()",1500);
                    loginCount++;
                    console.log(loginCount)
                    if (loginCount >= 3) {
                        $('#verifyPart').show();
                    }
                }
            }
        });
    });

    $('#register').click(function() {
        window.location.href = '/frontend/register';
    });
});
