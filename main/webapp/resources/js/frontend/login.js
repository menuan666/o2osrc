$(function() {
    var loginUrl = '/frontend/localauthlogincheck';
    var loginCount = 0;

    $('#showTooltips').click(function() {
        var userName = $('#username').val();
        var password = $('#psw').val();
        var verifyCodeActual = $('#j_captcha').val();
        var needVerify = false;
        if (loginCount >= 3) {
            if (!verifyCodeActual) {
                console.log(22);
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
                    window.location.href = '/shopadmin/shoplist';
                } else {
                    console.log(data.errMsg);
                    loginCount++;
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
