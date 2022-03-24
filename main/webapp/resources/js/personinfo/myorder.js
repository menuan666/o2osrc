$(function () {
    var initUrl = '/personinfo/getorderlist';
    var updateUrl = '/personinfo/updatestatus';

    getOrserList();

    function getOrserList() {
        $.getJSON(initUrl, function (data) {
            if (data.success) {
                console.log(data.orderlist);
                var weitempAreaHtml = '';
                var yitempAreaHtml = '';
                data.orderlist.map(function (item, index) {
                    if(item.status==0){
                        weitempAreaHtml += '<div class="weui-form-preview" style="margin-bottom: 20px">\n' +
                            '                                            <div role="option" class="weui-form-preview__hd">\n' +
                            '                                                <div class="weui-form-preview__item">\n' +
                            '                                                    <label class="weui-form-preview__label">付款金额</label>\n' +
                            '                                                    <em class="weui-form-preview__value">¥'+item.price+'</em>\n' +
                            '                                                </div>\n' +
                            '                                            </div>\n' +
                            '                                            <div role="option" aria-labelledby="p1 js_a11y_comma p2 js_a11y_comma p3" class="weui-form-preview__bd">\n' +
                            '                                                <div id="p1" class="weui-form-preview__item">\n' +
                            '                                                    <label class="weui-form-preview__label">商品</label>\n' +
                            '                                                    <span class="weui-form-preview__value">'+item.productName+'</span>\n' +
                            '                                                </div>\n' +
                            '                                                <div id="p2" class="weui-form-preview__item">\n' +
                            '                                                    <label class="weui-form-preview__label">取货码</label>\n' +
                            '                                                    <span class="weui-form-preview__value">'+item.code+'</span>\n' +
                            '                                                </div>\n' +
                            '                                                <div id="p3" class="weui-form-preview__item">\n' +
                            '                                                    <label class="weui-form-preview__label">付款日期</label>\n' +
                            '                                                    <span class="weui-form-preview__value">'+new Date(item.createTime).Format("yyyy-MM-dd")+'</span>\n' +
                            '                                                </div>\n' +
                            '                                            </div>\n' +
                            '                                            <div class="weui-form-preview__ft">\n' +
                            '                                                <a role="button" class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:" data-id='+item.orderId+' >确认已取货</a>\n' +
                            '                                            </div>\n' +
                            '                                        </div>';
                    }else{
                        yitempAreaHtml += '<div class="weui-form-preview" style="margin-bottom: 20px">\n' +
                            '                                            <div role="option" class="weui-form-preview__hd">\n' +
                            '                                                <div class="weui-form-preview__item">\n' +
                            '                                                    <label class="weui-form-preview__label">付款金额</label>\n' +
                            '                                                    <em class="weui-form-preview__value">¥'+item.price+'</em>\n' +
                            '                                                </div>\n' +
                            '                                            </div>\n' +
                            '                                            <div role="option" aria-labelledby="p1 js_a11y_comma p2 js_a11y_comma p3" class="weui-form-preview__bd">\n' +
                            '                                                <div id="p1" class="weui-form-preview__item">\n' +
                            '                                                    <label class="weui-form-preview__label">商品</label>\n' +
                            '                                                    <span class="weui-form-preview__value">'+item.productName+'</span>\n' +
                            '                                                </div>\n' +
                            '                                                <div id="p2" class="weui-form-preview__item">\n' +
                            '                                                    <label class="weui-form-preview__label">付款日期</label>\n' +
                            '                                                    <span class="weui-form-preview__value">'+new Date(item.createTime).Format("yyyy-MM-dd")+'</span>\n' +
                            '                                                </div>\n' +
                            '\n' +
                            '                                            </div>\n' +
                            '                                            <div class="weui-form-preview__ft">\n' +
                            '                                                <a role="button" class="weui-form-preview__btn weui-form-preview__btn_primary" style="color: #333333" href="javascript:" data-id='+item.orderId+' >订单已完成</a>\n' +
                            '                                            </div>\n' +
                            '                                        </div>';
                    }

                });
                $('#wei').html(weitempAreaHtml);
                $('#yi').html(yitempAreaHtml);
            }
        });
    }
    $('#wei').on('click', 'a', function (e) {
        //var target = $(e.currentTarget);
         var id =  e.currentTarget.dataset.id;
         console.log(id);
        $.ajax({
            url : updateUrl,
            async : false,
            cache : false,
            type : "post",
            dataType : 'json',
            data : {
                orderId : id
            },
            success : function(data) {
                if (data.success) {
                    console.log(11);
                    getOrserList();
                } else {
                    console.log(22);
                }
            }
        });
    });

})