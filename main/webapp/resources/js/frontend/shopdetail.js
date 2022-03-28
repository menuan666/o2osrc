$(function () {
    var loading = false;
    var maxItems = 999;
    var pageSize = 100;

    var listUrl = '/frontend/listproductsbyshop';

    var pageNum = 1;
    var shopId = getQueryString('shopId');
    var parentId = getQueryString('parentId');
    var productCategoryId = '';
    var productName = '';

    var searchDivUrl = '/frontend/listshopdetailpageinfo?shopId=' + shopId;


    getSearchDivData();
    addItems(pageSize, pageNum);
    $("#return").click(function(){
        window.location.href = '/frontend/shoplist?parentId=' + parentId;
    });
    function getSearchDivData() {
        var url = searchDivUrl;
        $.getJSON(url,
            function (data) {
                if (data.success) {
                    var shop = data.shop;
                    $('#shop-cover-pic').attr('src', shop.shopImg);
                    $('#shop-update-time').html(
                        new Date(shop.lastEditTime)
                            .Format("yyyy-MM-dd"));
                    $('#shop-name').html(shop.shopName);
                    $('#shop-desc').html(shop.shopDesc);
                    $('#shop-addr').html(shop.shopAddr);
                    $('#shop-phone').html(shop.phone);

                    var productCategoryList = data.productCategoryList;
                    var html = '';
                    productCategoryList
                        .map(function (item, index) {
                            html +=
                                '<div class="aaaa label label-badge label-outline" data-product-search-id="'
                                + item.productCategoryId
                                + '" style="font-size: 18px;margin-left: 15px;margin-top: 10px">'
                                + item.productCategoryName
                                + '</div>';
                        });
                    $('.shopcate').html(html);
                }
            });
    }

    function addItems(pageSize, pageIndex) {
        // 生成新条目的HTML
        var url = listUrl + '?' + 'pageIndex=' + pageIndex + '&pageSize='
            + pageSize + '&productCategoryId=' + productCategoryId
            + '&productName=' + productName + '&shopId=' + shopId;
        loading = true;
        $.getJSON(url, function (data) {
            if (data.success) {
                maxItems = data.count;
                var html = '';
                data.productList.map(function (item, index) {
                    html += '' + '<div class="item" data-product-id="'
                        + item.productId + '"><div class="item-heading">\n' +
                        '                                <h4>' + item.productName + '</h4>\n' +
                        '                            </div>' +
                        '<div class="item-content" style="color: #000000">\n' +
                        ' <img class="pull-right media" style="width: 60px" src="'
                        + item.imgAddr + '">' + item.productDesc + '</div><div class="item-footer">\n' +
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


    $('#shopdetail-button-div').on(
        'click',
        '.aaaa',
        function (e) {
            productCategoryId = e.target.dataset.productSearchId;
            console.log(productCategoryId)
            if (productCategoryId) {
                if ($(e.target).hasClass('label-success')) {
                    $(e.target).removeClass('label-success');
                    productCategoryId = '';
                } else {
                    $(e.target).addClass('label-success').siblings()
                        .removeClass('label-success');
                }
                $('.items').empty();
                pageNum = 1;
                addItems(pageSize, pageNum);
            }
        });

    $('.items')
        .on('click',
            '.item',
            function (e) {
                var productId = e.currentTarget.dataset.productId;
                window.location.href = '/frontend/productdetail?shopId=' + shopId+'&productId='
                    + productId;
            });

    $('#inputSearchExample1').on('change', function (e) {
        productName = e.target.value;
        $('.items').empty();
        pageNum = 1;
        addItems(pageSize, pageNum);
    });
});