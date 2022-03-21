
function toast2(){
    $('#toast').css("opacity", "0");
    $('#toast').css("display", "none");
}
$(function () {
    var listUrl = '/shopadmin/getproductcategorylist';
    var addUrl = '/shopadmin/addproductcategorys';
    var deleteUrl = '/shopadmin/removeproductcategory';
    getList();

    function getList() {
        $.getJSON(listUrl, function (data) {
            if (data.success) {
                var dataList = data.data;
                $('#divprodectlist').html('');
                var tempHtml = '';
                dataList.map(function (item, index) {
                    tempHtml += ''
                        + '<div id="xiandiv"><div class="weui-flex oldlist" style="margin-bottom: 10px;margin-top: 10px">' +
                        '<div class="weui-flex__item"><div class="placeholder" style="margin-left: 10%;">'
                        + item.productCategoryName
                        + '</div></div><div class="weui-flex__item"><div class="placeholder" style="margin-left: 40%;">'
                        + item.priority
                        + '</div></div>' +
                        '    <div class="weui-flex__item"><a href="#" class="placeholder delete" style="margin-left: 50%;" data-id="'
                        + item.productCategoryId
                        + '">删除</a>'
                        + '</div></div>' +
                        '<div class="weui-slider__inner" style="width: 100%;height: 1px"></div></div>';
                });
                $('#divprodectlist').append(tempHtml);
            }
        });
    }


    $('#new').click(function () {
        var tempHtml = '<div id="xiandiv"><div class="weui-flex newlist" style="margin-bottom: 10px;margin-top: 10px">\n' +
            '    <div class="weui-flex__item "><input class="weui-input category" placeholder="商品类别" style="margin-left: 15%;"></div>\n' +
            '    <div class="weui-flex__item"><input class="weui-input priority"  placeholder="优先级" style="margin-left: 40%;"></div>\n' +
            '    <div class="weui-flex__item"><a href="#" class="delete" style="margin-left: 40%;">删除</a></div>\n' +
            '</div>\n' +
            '<div class="weui-slider__inner" style="width: 90%;margin-left: 5% ;opacity:0.5;height: 1px"></div></div>';
        $('#divprodectlist').append(tempHtml);

    });
    $('#sumbit').click(function () {
        var tempArr = $('.newlist');
        var productCategoryList = [];
        tempArr.map(function (index, item) {
            var tempObj = {};
            tempObj.productCategoryName = $(item).find('.category').val();
            tempObj.priority = $(item).find('.priority').val();
            if (tempObj.productCategoryName && tempObj.priority) {
                productCategoryList.push(tempObj);
            }
        });
        $.ajax({
            url: addUrl, type: 'POST',
            data: JSON.stringify(productCategoryList), contentType: 'application/json',
            success: function (data) {
                if (data.success) {
                    $("#infotoast").text("提交成功");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");

                    setTimeout("toast2()", 2000);
                    getList();
                } else {
                    $("#infotoast").text("提交失败");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    console.log(1)
                    setTimeout("toast2()", 2000);
                    console.log(12)
                }
            }
        });
    });
    $('#divprodectlist').on('click', '.weui-flex.newlist .delete',
        function(e) {
        console.log($(this).parent().parent());
        $(this).parent().parent().parent().remove();
        });

    $('#divprodectlist').on('click', '.weui-flex.oldlist .delete',
        function(e) {
        console.log(1)
            var target = e.currentTarget;
                $.ajax({
                    url : deleteUrl,
                    type : 'POST',
                    data : {
                        productCategoryId : target.dataset.id,
                    },
                    dataType : 'json',
                    success : function(data) {
                        if (data.success) {
                            $("#infotoast").text("删除成功");
                            $('#toast').css("display", "");
                            $('#toast').css("opacity", "1");

                            setTimeout("toast2()", 1500);
                            getList();
                        } else {
                            $("#infotoast").text("删除失败");
                            $('#toast').css("display", "");
                            $('#toast').css("opacity", "1");

                            setTimeout("toast2()", 1500);
                        }
                    }
                });

        });
})