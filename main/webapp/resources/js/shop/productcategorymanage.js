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
                                    + '<div class="weui-flex" style="margin-bottom: 10px;margin-top: 10px">' +
                                    '<div class="weui-flex__item"><div class="placeholder" style="margin-left: 15%;">'
                                    + item.productCategoryName
                                    + '</div></div><div class="weui-flex__item"><div class="placeholder" style="margin-left: 40%;">'
                                    + item.priority
                                    + '</div></div>' +
                                    '    <div class="weui-flex__item"><a href="#" class="placeholder" style="margin-left: 40%;" data-id="'
                                    + item.productCategoryId
                                    + '">删除</a>'
                                    + '</div></div>' +
                                    '<div class="weui-slider__inner" style="width: 90%;margin-left: 5% ;height: 1px"></div>';
                            });
                        $('#divprodectlist').append(tempHtml);
                    }
                });
    }
});