function toast1(){
    $('#toast').css("opacity", "0");
    $('#toast').css("display", "none");
}
$(function () {
    var modifybal = '/personinfo/modifypassword'
    $('#sumbit').click(function() {
        var newpas1 = $('#newpas1').val();
        var newpas2 = $('#newpas2').val();
        var oldpas = $('#oldpas').val();
        if(isEmpty(newpas2)||isEmpty(newpas1)||isEmpty(oldpas)){
            $("#infotoast").text("密码不能为空");
            $('#toast').css("display", "");
            $('#toast').css("opacity", "1");
            setTimeout("toast1()",1500);
            return;
        }
        if (newpas2 != newpas1){
            $("#infotoast").text("两次输入的密码不一致");
            $('#toast').css("display", "");
            $('#toast').css("opacity", "1");
            setTimeout("toast1()",1500);
            return;
        }
        $.ajax({
            url : modifybal,
            async : false,
            cache : false,
            type : "post",
            dataType : 'json',
            data : {
                newpas : newpas1,
                oldpas : oldpas
            },
            success : function(data) {
                if (data.success) {
                    console.log(data.errMsg);
                    $("#infotoast").text("修改成功");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()",1500);
                } else {
                    console.log(data.errMsg);
                    $("#infotoast").text("修改失败");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()",1500);
                }
            }
        });
    });
})