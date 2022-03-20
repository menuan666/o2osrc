function toast1(){
    $('#toast').css("opacity", "0");
    $('#toast').css("display", "none");
}
$(function () {
    //获取此店铺下的商品列表的URL
    var listUrl = '/shopadmin/getproductlistbyshop?pageIndex=1&pageSize=999';
    //商品下架URL
    var statusUrl = '/shopadmin/modifyproduct';
    getList();

    /**
     *获取此店铺下的商品列表*
     * @returns*/
    function getList() {
        //从后台获取此店铺的商品列表
        $.getJSON(listUrl, function (data) {
            if (data.success) {
                var productList = data.productList;
                var tempHtml = '';
                //遍历每条商品信息，拼接成—行显示，列信息包括:
                //商品名称，优先级，上架\下架(含productId)，编辑按钮(含productId)
                // 预览(含productId)
                productList.map(function (item, index) {
                    var textOp = "下架";
                    var contraryStatus = 0;
                    if (item.enableStatus == 0) {
                        //若状态值为0，表明是已下架的商品，操作变为上架(即点击上架按钮上架相关商品)
                        textOp = "上架";
                        contraryStatus = 1;
                    } else {
                        contraryStatus = 0;
                    }
                    tempHtml += '' + '<div class="weui-flex" style="margin-top: 10px;margin-bottom: 10px">\n' +
                        '        <div class="weui-flex__item"><div style="margin-left: 30%">' + item.productName + '</div></div>\n' +
                        '        <div class="weui-flex__item"><div style="margin-left: 20%">' + item.priority
                        + '</div></div>\n' +
                        '        <div class="weui-flex__item">' +
                        '<a href="#" class="edit" data-id="' + item.productId + '" data-status="' + item.enableStatus + '">编辑</a> ' +
                        '<a href="#" class="status" data-id="' + item.productId + '" data-status="' + contraryStatus + '">' + textOp + '</a> ' +
                        '<a href="#" class="preview" data-id="' + item.productId + '" data-status="' + item.enableStatus + '">预览</a>' +
                        '</div>\n' +
                        '    </div>\n' +
                        '    <div class="weui-slider__inner" style="width: 90%;margin-left: 5% ;opacity:0.5;height: 1px"></div>'
                });
                $('#divshoplist').html(tempHtml);
            }
        });
    }

    $('#divshoplist').on('click', 'a', function (e) {
        var target = $(e.currentTarget);
        if (target.hasClass('edit')) {
            window.location.href = '/shopadmin/productoperation?productId='
                + e.currentTarget.dataset.id;
        } else if (target.hasClass('status')) {
            changeItemStatus(e.currentTarget.dataset.id,
                e.currentTarget.dataset.status);
        } else if (target.hasClass('preview')) {
            window.location.href = '/frontend/productdetail?productId='
                + e.currentTarget.dataset.id;
        }
    });
    function changeItemStatus(id, enableStatus) {
        //定义product json对象并添加productId以及状态(上架/下架)
        var product = {};
        product.productId = id;
        product.enableStatus = enableStatus;
        //上下架相关商品
        $.ajax({
            url: statusUrl,
            type: 'POST',
            data: {
                productStr: JSON.stringify(product),
                statusChange: true
            },
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    $("#infotoast").text("修改成功");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()",1500);
                    getList();
                } else {
                    $("#infotoast").text("修改失败");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()",1500);

                }
            }
        });
    }
});

