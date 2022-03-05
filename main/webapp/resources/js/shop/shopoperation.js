/**
 *
 */
$(function (){
    var initUrl = '/shopadmin/getshopinitinfo';
    var registerShopUrl = '/shopadmin/registershop';
    getShopInitInfo();
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

        $('#suretishi').click(function () {
            $('#toasttishi').removeClass('show');
        });

        $('#sumbit').click(function () {
            var shop = {};
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
            if (isEmpty(shopImg)||isEmpty(shop.shopName)||isEmpty(shop.shopAddr)||isEmpty(shop.phone)||isEmpty(shop.shopDesc)){
                var html='请将信息填写完全！';//声明js变量
                document.getElementById('tishi').innerText = html;
                $('#toasttishi').addClass('show');
                return;
            }
            var formData = new FormData();
            formData.append('shopImg', shopImg);
            formData.append('shopStr', JSON.stringify(shop));
            var verifyCodeActual = $('#j_captcha').val();
            if (!verifyCodeActual){
                var html='请输入验证码!';//声明js变量
                document.getElementById('tishi').innerText = html;
                $('#toasttishi').addClass('show');
                return;
            }
            formData.append('verifyCodeActual' , verifyCodeActual);
            $.ajax({
                url: registerShopUrl,
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                cache: false,
                success: function (data) {
                    if (data.success) {
                        var html='注册成功!';//声明js变量
                        document.getElementById('tishi').innerText = html;
                        $('#toasttishi').addClass('show');
                    } else {
                        var html='注册失败!';//声明js变量
                        document.getElementById('tishi').innerText = html;
                        $('#toasttishi').addClass('show');

                    }
                    $('#captcha_img').click();
                }
            });
        });
    }
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