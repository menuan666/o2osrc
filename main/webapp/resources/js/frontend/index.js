function toast1(){
    $('#toast').css("opacity", "0");
    $('#toast').css("display", "none");
}
$(function() {
    //定义访问后台，获取头条列表以及一级类别列表的URL
    var url = '/frontend/listmainpageinfo';
    var runnerlistUrl = '/personinfo/queryrunnerlist';
    var updateUrl = '/personinfo/modifystatus';
    var userId;
    getRunnerList()
    //访问后台，获取头条列表以及一级类别列表
    $.getJSON(url, function (data) {
        if (data.success) {
            //获取后台传递过来的头条列表

            var headLineList = data.headLineList;
            var swiperHtml = '<div class="item active">\n' +
                '                            <img alt="最新消息" src="https://t7.baidu.com/it/u=737555197,308540855&fm=193&f=GIF">\n' +
                '                        </div>';
            //遍历头条列表，并拼接出轮播图组
            headLineList.map(function (item, index) {
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

    function getRunnerList() {
        $.getJSON(runnerlistUrl, function (data) {
            if (data.success) {
                userId = data.userId;
                var weitempAreaHtml = '';
                data.runnerlist.map(function (item, index) {
                    if (item.status!=1&&item.status!=2){
                        weitempAreaHtml += '<div class="weui-form-preview" style="margin-top: 30px">\n' +
                            '                        <div role="option" class="weui-form-preview__hd">\n' +
                            '                            <div class="weui-form-preview__item">\n' +
                            '                                <label class="weui-form-preview__label">跑腿报酬</label>\n' +
                            '                                <em class="weui-form-preview__value">¥'+item.price+'</em>\n' +
                            '                            </div>\n' +
                            '                        </div>\n' +
                            '                        <div role="option" aria-labelledby="p1 js_a11y_comma p2 js_a11y_comma p3" class="weui-form-preview__bd">\n' +
                            '                            <div id="p1" class="weui-form-preview__item">\n' +
                            '                                <label class="weui-form-preview__label">标题</label>\n' +
                            '                                <span class="weui-form-preview__value">'+item.runnerName+'</span>\n' +
                            '                            </div>\n' +
                            '                            <div id="p2" class="weui-form-preview__item">\n' +
                            '                                <label class="weui-form-preview__label">描述</label>\n' +
                            '                                <span class="weui-form-preview__value">'+item.runnerName+'</span>\n' +
                            '                            </div>\n' +
                            '                            <div id="p4" class="weui-form-preview__item">\n' +
                            '                                <label class="weui-form-preview__label">联系方式</label>\n' +
                            '                                <span class="weui-form-preview__value">'+item.phone+'</span>\n' +
                            '                            </div>\n' +
                            '                            <div id="p3" class="weui-form-preview__item">\n' +
                            '                                <label class="weui-form-preview__label">发布时间</label>\n' +
                            '                                <span class="weui-form-preview__value">'+new Date(item.createTime).Format("yyyy-MM-dd")+'</span>\n' +
                            '                            </div></div>\n' +
                            '                        <div class="weui-form-preview__ft">\n' +
                            '                            <a role="button" class="weui-form-preview__btn weui-form-preview__btn_primary" data-userid='+item.userId+' data-id='+item.runnerId+'>我要接单</a>\n' +
                            '                        </div>\n' +
                            '                    </div>';
                    }
                });
                $('#runnerdiv').html(weitempAreaHtml);
            }else {
                console.log(11)
            }
        });
    }
    $('#runnerdiv').on('click', 'a', function (e) {
        var uid = $(e.currentTarget).data("userid");
        //var target = $(e.currentTarget);
        var id =  e.currentTarget.dataset.id;
        if (uid===userId){
            $("#infotoast").text("不可以接自己的订单");
            $('#toast').css("display", "");
            $('#toast').css("opacity", "1");
            setTimeout("toast1()",1500);
            return;
        }
        $.ajax({
            url : updateUrl,
            async : false,
            cache : false,
            type : "post",
            dataType : 'json',
            data : {
                runnerId : id
            },
            success : function(data) {
                if (data.success) {
                    $("#infotoast").text("接单成功，可前往跑腿订单中查看");
                    $('#toast').css("display", "");
                    $('#toast').css("opacity", "1");
                    setTimeout("toast1()",1500);
                    getRunnerList();
                } else {
                    console.log("Error");
                }
            }
        });
    });

});