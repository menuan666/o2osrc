function toast1(){
    $('#toast').css("opacity", "0");
    $('#toast').css("display", "none");
}
$(function () {
    var modifybal = '/personinfo/modifybal'
    var initUrl = '/personinfo/getpersoninfo';
    getPersonInfo();
    function getPersonInfo() {
        $.getJSON(initUrl, function (data) {
            if (data.success) {
                var person = data.user;
                console.log(person)
                $('#mybal').val(person.balance);
                $('#mybal').attr("disabled","disabled");
            }
        });
    }
    $('#sumbit').click(function() {
        var addbal = $('#addbal').val();
        console.log(addbal)
        //000 错
        //0 对
        //0. 错
        //0.0 对
        //050 错
        //00050.12错
        //70.1 对
        //70.11 对
        //70.111错
        //500 正确
        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;

        if(isEmpty(addbal)){
            $("#infotoast").text("金额不能为空");
            $('#toast').css("display", "");
            $('#toast').css("opacity", "1");
            setTimeout("toast1()",1500);
            return;
        }
        if (!reg.test(addbal)) {
            $("#infotoast").text("输入的金额不正确");
            $('#toast').css("display", "");
            $('#toast').css("opacity", "1");
            setTimeout("toast1()",1500);
            return;
        }
        if (addbal>1000){
            $("#infotoast").text("金额不能大于1000");
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