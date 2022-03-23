$(function () {
    var initUrl = '/personinfo/getpersoninfo';
    getPersonInfo();
    function getPersonInfo() {
        $.getJSON(initUrl, function (data) {
            if (data.success) {
                var person = data.user;
                $('#userimg').attr('src',person.profileImg);
                $('#username').text("你好，"+person.name);
                $('#js_cell_tl1_link').text(person.balance);
            }
        });
    }
})