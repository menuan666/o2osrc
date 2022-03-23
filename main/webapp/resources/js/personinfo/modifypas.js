function toast1(){
    $('#toast').css("opacity", "0");
    $('#toast').css("display", "none");
}
$(function () {
    var modifybal = '/personinfo/modifypassword'
    $('#sumbit').click(function() {
        var addbal = $('#addbal').val();
        if(isEmpty(addbal)){
            $("#infotoast").text("金额不能为空");
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
                addbal : addbal
            },
            success : function(data) {
                if (data.success) {
                    console.log(data.errMsg);
                    // setTimeout(function (){
                    //     window.location.href = '/';
                    // }, 500);
                    $("#infotoast").text("充值成功");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()",1500);
                    getPersonInfo()
                } else {
                    console.log(data.errMsg);
                    $("#infotoast").text("充值失败");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()",1500);
                }
            }
        });
    });
})