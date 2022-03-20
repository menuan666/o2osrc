$(function() {
    //定义访问后台，获取头条列表以及一级类别列表的URL
    var url = '/frontend/listmainpageinfo';

    //访问后台，获取头条列表以及一级类别列表
    $.getJSON(url, function (data) {
        if (data.success) {
            console.log(data)
            //获取后台传递过来的头条列表
            var headLineList = data.headLineList;
            var swiperHtml = '<div class="item active">\n' +
                '                            <img alt="最新消息" src="https://t7.baidu.com/it/u=737555197,308540855&fm=193&f=GIF">\n' +
                '                        </div>';
            //遍历头条列表，并拼接出轮播图组
            headLineList.map(function (item, index) {
                console.log(index)
                swiperHtml += '<div class="item " >\n' +
                    '<a href="'+item.lineLink+'"external >' +
                    '<img src="'+item.lineImg+'" alt="'+ item.lineName +'"></a></div>';
            });
            //将轮播图组赋值给前端HTML控件
            $('.carousel-inner').html(swiperHtml);
            //获取后台传递过来的大类列表
            var shopCategoryList = data.shopCategoryList;
            var categoryHtml = '';
            shopCategoryList.map(function (item, index) {
                console.log(item.shopCategoryName)
                categoryHtml += '<div class="weui-grid shop-classify" role="button" data-category='+ item.shopCategoryId +'>'+
                    '<div class="weui-grid__icon">\n' +
                    '<img src="'+ item.shopCategoryImg +'">' +
                    '</div>' +
                    '<p class="weui-grid__label">'+item.shopCategoryName+'</p>'+
                    '</div>'
            });

            //将拼接好的类别赋值给前端HTML控件进行展示
            $('.row').html(categoryHtml);
        }
    });


    $('.row').on('click', '.shop-classify', function (e) {
        var shopCategoryId = e.currentTarget.dataset.category;
        var newUrl = '/frontend/shoplist?parentId=' + shopCategoryId;
        window.location.href = newUrl;
    });

});