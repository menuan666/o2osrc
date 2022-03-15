function toast1(){
    $('#toast').css("opacity", "0");
    $('#toast').css("display", "none");
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
$(function () {
    //从URL里获取productId参数的值
    var productId = getQueryString('productId');
    //通过productId获取商品信息的URL
    var infoUrl = '/shopadmin/getproductbyid?productId=' + productId;
    //获取当前店铺设定的商品类别列表的URL
    var categoryUrl = '/shopadmin/getproductcategorylist';
    //更新商品信息的URL
    var productPostUrl = '/shopadmin/modifyproduct';
    //由于商品添加和编辑使用的是同一个页面，
    //该标识符用来标明本次是添加还是编辑操作
    var isEdit = false;
    if (productId) {
        //若有productId则为编辑操作
        getInfo(productId);
        isEdit = true;
        $("#submit").text('修 改');
        $("#toptitle").text('修改商品');
    } else {
        getCategory();
        productPostUrl = '/shopadmin/addproduct';
    }
    ;

    //获取需要编辑的商品的商品信息，并赋值给表单
    function getInfo(id) {
        $.getJSON(infoUrl, function (data) {
            if (data.success) {
                //从返回的JSON当中获取product对象的信息，并赋值给表单
                var product = data.product;
                $('#product-name').val(product.productName);
                $('#product-desc').val(product.productDesc);
                $('#priority').val(product.priority);
                $('#normal-price').val(product.normalPrice);
                $('#promotion-price').val(
                    product.promotionPrice);
                //获取原本的商品类别以及该店铺的所有商品类别列表
                var optionHtml = '';
                var optionArr = data.productCategoryList;
                var optionSelected = product.productCategory.productCategoryId;
                //生成前端的HTML商品类别列表，并默认选择编辑前的商品类别
                optionArr
                    .map(function (item, index) {
                        var isSelect = optionSelected === item.productCategoryId ? 'selected' : '';
                        optionHtml += '<option data-value="'
                            + item.productCategoryId
                            + '"'
                            + isSelect
                            + '>'
                            + item.productCategoryName + '</option>';
                    });
                $('#category').html(optionHtml);
            }
        });
    }

    function getCategory() {
        $.getJSON(categoryUrl, function (data) {
            if (data.success) {
                var productCategoryList = data.data;
                var optionHtml = '';
                productCategoryList.map(function (item, index) {
                    optionHtml += '<option data-value="'
                        + item.productCategoryId + '">'
                        + item.productCategoryName + '</option> ';
                });
                $('#category').html(optionHtml);
            }
        });
    }

    //针对商品详情图控件组，若该控件组的最后一个元素发生变化(即上传了图片)
    //且控件总数未达到6个，则生成新的一个文件上传控件
    $('.detail-img-div').on('change', '.detail-img:last-child', function () {
        if ($('.detail-img').length < 6) {
            $('#detail-img').append('<input type="file" class="detail-img">');
        }
    });

    //提交按钮的事件响应，分别对商品添加和编辑操作做不同响应
    $('#submit').click(
        function () {
            console.log(11)
            //创建商品json对象，并从表单里面获取对应的属性值var product = t;
            var product = {};
            product.productName = $('#product-name').val();
            product.productDesc = $('#product-desc').val();
            product.priority = $('#priority').val();
            product.normalPrice = $('#normal-price').val();
            product.promotionPrice = $('#promotion-price').val();
            //获取选定的商品类别值
            product.productCategory = {
                productCategoryId: $('#category').find('option').not(
                    function () {
                        return !this.selected;
                    }).data('value')
            };
            product.productId = productId;
            //获取缩略图文件流
            var thumbnail = $('#small-img')[0].files[0];
            //生成表单对象，用于接收参数并传递给后台
            var formData = new FormData();
            formData.append('thumbnail', thumbnail);
            //遍历商品详情图控件，获取里面的文件流
            $('.detail-img').map(
                function (index, item) {
                    //判断该控件是否已选择了文件
                    if ($('.detail-img')[index].files.length > 0) {
                        //将第i个文件流赋值给key为productImgi的表单键值对里
                        formData.append('productImg' + index,
                            $('.detail-img')[index].files[0]);
                    }
                });
            //将product json对象转成字符流保存至表单对象key为productStr的的键值对里
            formData.append('productStr', JSON.stringify(product));
            //获取表单里输入的验证码

            if (!isEdit){
                if (isEmpty(product.productName)||isEmpty(product.productDesc)||isEmpty(product.priority)||
                    isEmpty(thumbnail)||isEmpty($('.detail-img')[0].files[0])){
                    $("#infotoast").text("请检查信息是否完整");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()",2000);
                    return;
                }
            }
            var verifyCodeActual = $('#j_captcha').val();
            if (!verifyCodeActual) {
                $("#infotoast").text("请输入验证码");
                $('#toast').css("display", "");
                $('#toast').css("opacity", "1");
                setTimeout("toast1()",2000);
                return;
            }
            formData.append("verifyCodeActual", verifyCodeActual);
            //提交数据
            $.ajax({
                url: productPostUrl,
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                cache: false,
                success: function (data) {
                    if (data.success) {
                        if (isEdit){
                            $("#infotoast").text("修改成功");
                        }else{
                            $("#infotoast").text("添加成功");
                        }
                        $('#toast').css("display", "");
                        $('#toast').css("opacity", "1");
                        setTimeout("toast1()",2000);
                        $('#captcha_img').click();
                    } else {
                        if (isEdit){
                            $("#infotoast").text("修改失败");
                        }else{
                            $("#infotoast").text("添加失败");
                            console.log(data.msg)
                        }
                        $('#toast').css("display", "");
                        $('#toast').css("opacity", "1");
                        setTimeout("toast1()",2000);
                        $('#captcha_img').click();
                    }
                }
            });
        });
})

