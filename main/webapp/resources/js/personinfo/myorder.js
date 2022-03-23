$(function () {
    var initUrl = '/personinfo/getorderlist';

    getOrserList();

    function getOrserList() {
        $.getJSON(initUrl, function (data) {
            if (data.success) {
                console.log(data.orderlist);
                var weitempAreaHtml = '';
                var yitempAreaHtml = '';
                data.orderlist.map(function (item, index) {
                    if(item.status==0){
                        weitempAreaHtml += '<div class="weui-form-preview">\n' +
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
                            '                                                <a role="button" class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:" data-id='+item.orderId+' >确认已取货</a>\n' +
                            '                                            </div>\n' +
                            '                                        </div>';
                    }else{
                        yitempAreaHtml += '<div class="weui-form-preview">\n' +
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

})