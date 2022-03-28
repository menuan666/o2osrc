/**
 *
 */
function toast1(){
    $('#fildtoast').css("opacity", "0");
    $('#fildtoast').css("display", "none");
    $('#toast').css("opacity", "0");
    $('#toast').css("display", "none");
}
function location1(){
    $('#fildtoast').css("opacity", "0");
    $('#fildtoast').css("display", "none");
    $('#toast').css("opacity", "0");
    $('#toast').css("display", "none");
    window.location.href="/shopadmin/shoplist";
}
$(function () {
    var shopId = getQueryString('shopId');
    var isEdit = shopId ? true : false;
    var initUrl = '/shopadmin/getshopinitinfo';
    var registerShopUrl = '/shopadmin/registershop';
    var shopInfoUrl = "/shopadmin/getshopbyid?shopId=" + shopId;
    var editShopUrl = '/shopadmin/modyfishop';
    if (!isEdit) {
        getShopInitInfo();
        $('#return').attr('href','/shopadmin/shoplist');
    } else {
        getShopInfo(shopId);
        $("#sumbit").text('修 改');
        $("#toptitle").text('修改店铺');
        $('#return').attr('href','/shopadmin/shopmanagement?shopId='+shopId);
        $('#return1').attr('href','/shopadmin/shopmanagement?shopId='+shopId);
    }

    function getShopInfo(shopId) {
        $.getJSON(shopInfoUrl, function (data) {
            if (data.success) {
                var shop = data.shop;
                $('#shop-name').val(shop.shopName);
                $('#shop-addr').val(shop.shopAddr);
                $('#shop-phone').val(shop.phone);
                $('#shop-desc').val(shop.shopDesc);
                var shopCategory = '<option data-id="'
                    + shop.shopCategory.shopCategoryId + '" selected>'
                    + shop.shopCategory.shopCategoryName + '</option>';
                var tempAreaHtml = '';
                data.areaList.map(function (item, index) {
                    tempAreaHtml += '<option data-id="'
                        + item.areaId + '">'
                        + item.areaName + '</option>';
                });
                $('#shop-category').html(shopCategory);
                $('#shop-category').attr('disabled', 'disabled');
                $('#area').html(tempAreaHtml);
                $("#area option[data-id='" + shop.area.areaId + "']").attr("selected", "selected");
            }
        });
    }

    function getShopInitInfo() {
        $.getJSON(initUrl, function (data) {
            if (data.success) {
                var tempHtml = '';
                var tempAreaHtml = '';
                data.shopCategoryList.map(function (item, index) {
                    tempHtml += '<option data-id="' + item.shopCategoryId + '">'
                        + item.shopCategoryName + '</option>';
                });
                data.areaList.map(function (item, index) {
                    tempAreaHtml += '<option data-id="' + item.areaId + '">'
                        + item.areaName + '</option>';
                });
                $('#shop-category').html(tempHtml);
                $('#area').html(tempAreaHtml);

            }
        });
    }

    $('#sumbit').click(function () {
        var shop = {};
        if (isEdit) {
            shop.shopId = shopId;
        }
        shop.shopName = $('#shop-name').val();
        shop.shopAddr = $('#shop-addr').val();
        shop.phone = $('#shop-phone').val();
        shop.shopDesc = $('#shop-desc').val();
        shop.shopCategory = {
            shopCategoryId: $('#shop-category').find('option').not(function () {
                return !this.selected;
            }).data('id')
        };
        shop.area = {
            areaId: $('#area').find('option').not(function () {
                return !this.selected;
            }).data('id')
        };

        var shopImg = $('#shop-img')[0].files[0];
        // console.log(isEmpty(shopImg))
        // if (isEdit){
        //     if (isEmpty(shopImg)){
        //         shopImg = '';
        //     }
        // }
        console.log(shopImg);
        if (!isEdit){
        if (isEmpty(shopImg) || isEmpty(shop.shopName) || isEmpty(shop.shopAddr) || isEmpty(shop.phone) || isEmpty(shop.shopDesc)) {
            $("#infotoast").text("请检查内容是否为空");
            $('#fildtoast').css("display", "");
            $('#fildtoast').css("opacity", "1");
            setTimeout("toast1()",2000);
            return;
        }}
        var formData = new FormData();
        formData.append('shopImg', shopImg);
        formData.append('shopStr', JSON.stringify(shop));
        var verifyCodeActual = $('#j_captcha').val();
        if (!verifyCodeActual) {
            $("#infotoast").text("请检查验证码");
            $('#fildtoast').css("display", "");
            $('#fildtoast').css("opacity", "1");
            setTimeout("toast1()",2000);
            return;
        }
        formData.append('verifyCodeActual', verifyCodeActual);
        console.log(shop);
        $.ajax({
            url: (isEdit ? editShopUrl : registerShopUrl),
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            success: function (data) {
                if (data.success) {
                    if (isEdit){
                        $("#successtoast").text("修改成功，正在跳转管理页");

                    }else{
                        $("#successtoast").text("注册成功，正在跳转管理页");
                    }
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("location1()",2000);
                    setTimeout(function (){
                        window.location.href = '/shopadmin/shoplist';
                    }, 2000);
                } else {
                    if (isEdit){
                        $("#infotoast").text("修改失败");
                        console.log(data)
                    }else{
                        $("#infotoast").text("注册失败");
                    }
                    $('#fildtoast').css("display", "");
                    $('#fildtoast').css("opacity", "1");
                    setTimeout("toast1()",2000);
                }
                $('#captcha_img').click();
            }
        });
    });
    function isEmpty(v) {
        switch (typeof v) {
            case 'undefined':
                return true;
            case 'string':
                if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
                break;
            case 'boolean':
                if (!v) return true;
                break;
            case 'number':
                if (0 === v || isNaN(v)) return true;
                break;
            case 'object':
                if (null === v || v.length === 0) return true;
                for (var i in v) {
                    return false;
                }
                return true;
        }
        return false;
    }
})