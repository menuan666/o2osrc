function toast1() {
    $('#toast').css("opacity", "0");
    $('#toast').css("display", "none");
}

$(function () {
    var insertrunnerUrl = '/personinfo/insterrunner';


    $('#sumbit').click(function () {
        var runner = {};
        runner.runnerName = $('#name').val();
        runner.price = $('#price').val();
        runner.runnerDesc = $('#runner-desc').val();
        if (isEmpty(runner.runnerName) || isEmpty(runner.price) || isEmpty(runner.runnerDesc)) {
            $("#infotoast").text("请检查内容是否为空");
            $('#toast').css("display", "");
            $('#toast').css("opacity", "1");
            setTimeout("toast1()", 2000);
            return;
        }
        var formData = new FormData();
        formData.append('runnerStr', JSON.stringify(runner));
        $.ajax({
            url:insertrunnerUrl,
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            success: function (data) {
                if (data.success) {
                    $("#infotoast").text("发布成功");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()", 2000);

                } else {
                    $("#infotoast").text(data.errMsg);
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()", 2000);
                }
            }
        });
    });
})