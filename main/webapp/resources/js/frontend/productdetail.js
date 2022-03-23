function toast1(){
    $('#toast').css("opacity", "0");
    $('#toast').css("display", "none");
}
$(function() {
    // 从地址栏的URL里获取productId
    var productId = getQueryString('productId');
    var shopId = getQueryString('shopId');
    // 获取商品信息的URL
    var productUrl = '/frontend/listproductdetailpageinfo?productId='
        + productId;
    var checkUrl = '/frontend/checkbalance';
    var product = {};
    var orderUrl = '/frontend/productorder';
    // 访问后台获取该商品的信息并渲染
    $("#return").click(function(){
        if (isEmpty(shopId)){
            window.location.href = '/shopadmin/productmanagement';
        }else {
        window.location.href = '/frontend/shopdetail?shopId=' + shopId;}
    });



    $.getJSON(productUrl, function(data) {
        if (data.success) {
            // 获取商品信息
            product = data.product;
            // 给商品信息相关HTML控件赋值
            // 商品缩略图
            $('#product-img').attr('src', product.imgAddr);
            // 商品更新时间
            $('#product-time').text(
                new Date(product.lastEditTime).Format("yyyy-MM-dd"));
            // if (product.point != undefined) {
            // $('#product-point').text('购买可得' + product.point + '积分');
            // }
            // 商品名称
            $('#product-name').text(product.productName);
            // 商品简介
            $('#product-desc').text(product.productDesc);
            // 商品价格展示逻辑，主要判断原价现价是否为空 ，所有都为空则不显示价格栏目
            if (product.normalPrice != undefined
                && product.promotionPrice != undefined) {
                // 如果现价和原价都不为空则都展示，并且给原价加个删除符号
                $('#price').show();
                $('#normalPrice').html(
                    '<del>' + '￥' + product.normalPrice + '</del>');
                $('#promotionPrice').text('￥' + product.promotionPrice);
            } else if (product.normalPrice != undefined
                && product.promotionPrice == undefined) {
                // 如果原价不为空而现价为空则只展示原价
                $('#price').show();
                $('#promotionPrice').text('￥' + product.normalPrice);
            } else if (product.normalPrice == undefined
                && product.promotionPrice != undefined) {
                // 如果现价不为空而原价为空则只展示现价
                $('#promotionPrice').text('￥' + product.promotionPrice);
            }
            var imgListHtml = '';
            // 遍历商品详情图列表，并生成批量img标签
            product.productImgList.map(function(item, index) {
                imgListHtml += '<div> <img src="' + item.imgAddr
                    + '" width="100%" /></div>';
            });
            // if (data.needQRCode) {
            // // 生成购买商品的二维码供商家扫描
            // imgListHtml += '<div> <img
            // src="/o2o/frontend/generateqrcode4product?productId='
            // + product.productId
            // + '" width="100%"/></div>';
            // }
            $('#imgList').html(imgListHtml);
        }
    });
    $("#productorder").click(function(){
        var check = 0;
        $.ajax({
            url : checkUrl,
            async : false,
            cache : false,
            type : "post",
            dataType : 'json',
            data : {
                price : product.promotionPrice
            },
            success : function(data) {
                if (data.success) {
                    console.log(111);
                } else {
                    console.log(data.errMsg);
                    $("#infotoast").text("余额不足");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()",1500);
                    check = 1;
                }
            }
        });
        console.log("check="+check)
        if (check == 1){
            return;
        }
        var order = {};
        order.price = product.promotionPrice;
        order.orderType = 0;
        order.productName = product.productName;
        var formData = new FormData();
        formData.append('orderStr', JSON.stringify(order));
        $.ajax({
            url: orderUrl,
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            success: function (data) {
                if (data.success) {
                    console.log(data.errMsg)
                    $("#infotoast").text("购买成功，请在订单中查看并取货");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()",1500);

                } else {
                    console.log(data.errMsg)
                    $("#infotoast").text("购买失败");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()",1500);
                }
            }
        });
    });
});