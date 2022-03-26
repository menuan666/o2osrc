$(function() {
    getlist();
    function getlist(e) {
        $.ajax({
            url: "/shopadmin/getshoplist",
            type: "get",
            dataType: "json",
            success: function (data) {
                if (data.success) {
                    handleList(data.shopList);
                    handleUser(data.user);
                }
            }
        });
    }
    function handleUser(data) {
        $('#user_name').text("你好，"+data.name);
    }
    function handleList(data) {
        var html = '';
        data.map(function(item, index) {
            html += '<div class="weui-flex" style="margin-top: 10px;margin-bottom: 10px">\n' +
                '    <div class="weui-flex__item"><div class="placeholder">'
                + item.shopName + '</div></div>\n' +
                '    <div class="weui-flex__item"><div class="placeholder" style="margin-left: 25%">'
                + shopStatus(item.enableStatus)
                + '</div></div>\n' +
                '    <div class="weui-flex__item"><div class="placeholder" style="margin-left: 50%">'
                + goShop(item.enableStatus, item.shopId) + '</div></div>\n' +
                '</div>\n' +
                '<div class="weui-slider__inner" style="width: 100%;margin-left: 5% ;opacity:0.5;height: 1px"></div>';
        });
        $('#divshoplist').html(html);
    }
    function shopStatus(status) {
        if (status == 1) {
            return '审核中';
        }else if (status == -1) {
            return '店铺非法';
        }else if (status == 0){
            return '审核通过';
        }
        }
    function goShop(status, id) {
        if (status == 0) {
            return '<a href="/shopadmin/shopmanagement?shopId=' + id + '"> 进入 </a>'
        } else {
            return '';
        }
    }
});