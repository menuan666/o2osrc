function toast1(){
    $('#toast').css("opacity", "0");
    $('#toast').css("display", "none");
}
$(function() {
    var regUrl = '/frontend/localauthregedit';
    var checkUrl = '/frontend/checkregeditusername';

    $('#showTooltips').click(function() {
        var userName = $('#username').val();
        var password = $('#psw').val();
        var name = $('#name').val();
        var newpas = $('#newpsw').val();
        var reg = new RegExp("^[A-Za-z0-9]{5,10}$");
        //获取输入框中的值
        //判断输入框中有内容
        if(!reg.test(userName))
        {
            $("#infotoast").text("请注意登录名只能为数字或者字母且为5到10位");
            $('#toast').css("display", "");
            $('#toast').css("opacity", "1");
            setTimeout("toast1()",2000);
            $("#username").val("");
            return;
        }

        if(isEmpty(password)||isEmpty(userName)||isEmpty(name)||isEmpty(newpas)){
            $("#infotoast").text("请将信息填写完整");
            $('#toast').css("display", "");
            $('#toast').css("opacity", "1");
            setTimeout("toast1()",1500);
            return;
        }
        if (newpas!=password){
            $("#infotoast").text("两次输入的密码不一样");
            $('#toast').css("display", "");
            $('#toast').css("opacity", "1");
            setTimeout("toast1()",1500);
            return;
        }
        var verifyCodeActual = $('#j_captcha').val();
            if (!verifyCodeActual) {
                $("#infotoast").text("验证码不能为空");
                $('#toast').css("display", "");
                $('#toast').css("opacity", "1");
                setTimeout("toast1()",1500);
                return;
        }
        $.ajax({
            url : regUrl,
            cache : false,
            type : "POST",
            dataType : 'json',
            data : {
                userName : userName,
                password : password,
                verifyCodeActual : verifyCodeActual,
                name : name
            },
            success : function(data) {
                if (data.success) {
                    $("#infotoast").text("注册成功，正在跳转登录页面");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()",1500);
                    setTimeout(function (){
                        window.location.href = '/frontend/login';
                    }, 2000);

                } else {
                    $("#infotoast").text("注册失败");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()",1500);
                }
            }
        });
    });

    $("#username").change(function(){
        var userName = $("#username").val();
        console.log(1111)
        $.ajax({
            url : checkUrl,
            type : "POST",
            dataType : 'json',
            cache: false,
            data : {
                userName : userName,
            },
            success : function(data) {
                if (data.success) {
                    console.log(111)

                }else{
                    console.log(222)
                    $("#infotoast").text("用户名重复 请重新输入");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()",1500);
                    $("#username").val("");
                }
            }
        });
    });
    $('#register').click(function() {
        window.location.href = '/frontend/login';
    });
});
