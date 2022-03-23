function toast1(){
    $('#toast').css("opacity", "0");
    $('#toast').css("display", "none");
}
$(function () {
    var updataUrl ='/personinfo/modifypersoninfo';
    var initUrl = '/personinfo/getpersoninfo';
    getPersonInfo();
    function getPersonInfo() {
        $.getJSON(initUrl, function (data) {
            if (data.success) {
                var person = data.user;
                var userName = data.username;
                console.log(userName)
                $('#userName').val(userName);
                $("#userName").attr("disabled", "disabled");
                $('#name').val(person.name);
                $('#email').val(person.email);
                $('#gender').val(person.gender);
            }
        });
    }
    $('#sumbit').click(function () {
        var person = {};
        person.name = $('#name').val();
        person.email = $('#email').val();
        person.gender = $("#gender").find("option:selected").text();
        var profileImg = $('#userimg')[0].files[0];
        console.log(profileImg+gender);
        var formData = new FormData();
        formData.append('profileImg', profileImg);
        formData.append('personStr', JSON.stringify(person));
        var verifyCodeActual = $('#j_captcha').val();
        if (!verifyCodeActual) {
            $("#infotoast").text("请检查验证码");
            $('#toast').css("display", "");
            $('#toast').css("opacity", "1");
            setTimeout("toast1()",2000);
            return;
        }
        formData.append('verifyCodeActual', verifyCodeActual);
        console.log(person);
        $.ajax({
            url: updataUrl,
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            success: function (data) {
                if (data.success) {
                    $("#infotoast").text("修改成功");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()",2000);
                } else {
                    $("#infotoast").text("修改失败");
                    $('#fildtoast').css("display", "");
                    $('#fildtoast').css("opacity", "1");
                    setTimeout("toast1()",2000);
                }
                getPersonInfo();
                $('#captcha_img').click();
            }
        });
    });
})