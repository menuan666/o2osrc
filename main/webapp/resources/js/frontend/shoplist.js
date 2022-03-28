$(function () {
    var loading = false;
    // 分页允许返回的最大条数，超过此数值，禁止访问后台
    var maxItems = 999;
    // 一页返回的最大条数
    var pageSize = 900
    var listUrl = '/frontend/listshops';
    var searchDivUrl = '/frontend/listshopspageinfo';
    // 页码
    var pageNum = 1;
    var parentId = getQueryString('parentId');
    var areaId = '';
    var shopCategoryId = '';
    var shopName = '';

    // 加载店铺列表以及区域列表
    getSearchDivData();
    // 预先加载pageSize *pageNum 条
    addItems(pageSize, pageNum);

    function getSearchDivData() {
        var url = searchDivUrl + '?' + 'parentId=' + parentId;
        $.getJSON(url,
            function (data) {
                if (data.success) {
                    var shopCategoryList = data.shopCategoryList;
                    var html = '';
                    html += '<a href="#" class="aaaa label label-badge label-outline" data-category-id="-1" style="font-size: 18px;margin-left: 15px;margin-top: 10px">全部类别</a>';
                    shopCategoryList
                        .map(function (item, index) {
                            html += '<a href="#" class="aaaa label label-badge label-outline" data-category-id="'
                                + item.shopCategoryId
                                + '" style="font-size: 18px;margin-left: 15px;margin-top: 10px">'
                                + item.shopCategoryName
                                + '</a>';
                        });
                    $('.shopcate').html(html);
                    var selectOptions = '<option value="">全部校区</option>';
                    var areaList = data.areaList;
                    areaList.map(function (item, index) {
                        selectOptions += '<option value="'
                            + item.areaId + '">'
                            + item.areaName + '</option>';
                    });
                    $('.form-control').html(selectOptions);
                }
            });
    }


    function addItems(pageSize, pageIndex) {
        // 生成新条目的HTML
        var url = listUrl + '?' + 'pageIndex=' + pageIndex + '&pageSize='
            + pageSize + '&parentId=' + parentId + '&areaId=' + areaId
            + '&shopCategoryId=' + shopCategoryId + '&shopName=' + shopName;
        // console.log(url);
        loading = true;
        $.getJSON(url, function (data) {
            if (data.success) {
                maxItems = data.count;
                var html = '';
                data.shopList.map(function (item, index) {
                    html += '' + '<div class="item" data-shop-id="'
                        + item.shopId + '"><div class="item-heading">\n' +
                        '                                <h4>' + item.shopName + '</h4>\n' +
                        '                            </div>' +
                        '<div class="item-content" style="color: #000000">\n' +
                        ' <img class="pull-right media" style="width: 60px" src="'
                        + item.shopImg + '">' + item.shopDesc + '</div><div class="item-footer">\n' +
                        '                                <span class="text-muted">'
                        + new Date(item.lastEditTime).Format("yyyy-MM-dd") +
                        '</span>\n' +
                        '                            </div>\n' +
                        '                    </div>';

                });
                $('.items').append(html);
            }
        });
    }

    $('.items').on('click', '.item', function (e) {
        var shopId = e.currentTarget.dataset.shopId;
        console.log(shopId);
        window.location.href = '/frontend/shopdetail?parentId='+parentId+'&shopId=' + shopId;
    });

    $('#shoplist-search-div').on(
        'click',
        '.aaaa',
        function (e) {
            if (parentId) {// 如果传递过来的是一个父类下的子类
                console.log(e.target.dataset.categoryId)
                shopCategoryId = e.target.dataset.categoryId;
                if ($(e.target).hasClass('label-success')) {
                    $(e.target).removeClass('label-success');
                    shopCategoryId = '';
                } else {
                    $(e.target).addClass('label-success').siblings()
                        .removeClass('label-success');
                }
                $('.items').empty();
                pageNum = 1;
                addItems(pageSize, pageNum);
            } else {// 如果传递过来的父类为空，则按照父类查询
                parentId = e.target.dataset.categoryId;
                console.log(parentId)
                if ($(e.target).hasClass('label-success')) {
                    $(e.target).removeClass('label-success');
                    parentId = '';
                } else {
                    $(e.target).addClass('label-success').siblings()
                        .removeClass('label-success');
                }
                $('.items').empty();
                pageNum = 1;
                addItems(pageSize, pageNum);
                parentId = '';
            }
        });

    $('#inputSearchExample1').on('change', function (e) {
        shopName = e.target.value;
        $('.items').empty();
        pageNum = 1;
        addItems(pageSize, pageNum);
    });

    $('#area-search').on('change', function () {
        areaId = $('#area-search').val();
        console.log(areaId)
        $('.items').empty();
        pageNum = 1;
        addItems(pageSize, pageNum);
    });
});

