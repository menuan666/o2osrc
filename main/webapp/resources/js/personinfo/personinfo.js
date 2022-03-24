$(function () {
    var initUrl = '/personinfo/getpersoninfo';
    var returnlog = '/personinfo/returnlog';
    getPersonInfo();
    function getPersonInfo() {
        $.getJSON(initUrl, function (data) {
            if (data.success) {
                var person = data.user;
                console.log(data);
                $('#userimg').attr('src',person.profileImg);
                $('#username').text("你好，"+person.name);
                $('#js_cell_tl1_link').text(person.balance);
            }
        });
    }
    $('#returnlogin').click(function(){
        $.getJSON(returnlog, function (data) {
            if (data.success) {
                window.location.href="/frontend/login";
            }
        });
    });
})