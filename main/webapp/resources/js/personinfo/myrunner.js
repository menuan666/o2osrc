$(function() {

    var runnerlistUrl = '/personinfo/queryrunnerlist';
    var updateUrl = '/personinfo/modifystatus';
    getRunnerList()

    function getRunnerList() {
        $.getJSON(runnerlistUrl, function (data) {
            if (data.success) {
                console.log(data);
                var weitempAreaHtml = '';
                var yitempAreaHtml = '';
                var userId = data.userId;
                console.log(userId);
                data.runnerlist.map(function (item, index) {
                    if (userId === item.userId){
                        console.log(item.userId)
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
                            '                            <div id="p4" class="weui-form-preview__item">\n' +
                            '                                <label class="weui-form-preview__label">联系方式</label>\n' +
                            '                                <span class="weui-form-preview__value">'+item.phone+'</span>\n' +
                            '                            </div>\n' +
                            '                            <div id="p2" class="weui-form-preview__item">\n' +
                            '                                <label class="weui-form-preview__label">描述</label>\n' +
                            '                                <span class="weui-form-preview__value">'+item.runnerName+'</span>\n' +
                            '                            </div>\n' +
                            '                            <div id="p3" class="weui-form-preview__item">\n' +
                            '                                <label class="weui-form-preview__label">发布时间</label>\n' +
                            '                                <span class="weui-form-preview__value">'+new Date(item.createTime).Format("yyyy-MM-dd")+'</span>\n' +
                            '                            </div></div>\n' +
                            '                        <div class="weui-form-preview__ft">\n' +
                            '                            <a role="button" class="weui-form-preview__btn weui-form-preview__btn_primary" data-id='+item.runnerId+'>'+getStatus(item.status)+'</a>\n' +
                            '                        </div>\n' +
                            '                    </div>';
                    }
                    if (data.userId === item.getUserId){
                        yitempAreaHtml += '<div class="weui-form-preview" style="margin-top: 30px">\n' +
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
                            '                            <div id="p4" class="weui-form-preview__item">\n' +
                            '                                <label class="weui-form-preview__label">联系方式</label>\n' +
                            '                                <span class="weui-form-preview__value">'+item.phone+'</span>\n' +
                            '                            </div>\n' +
                            '                            <div id="p2" class="weui-form-preview__item">\n' +
                            '                                <label class="weui-form-preview__label">描述</label>\n' +
                            '                                <span class="weui-form-preview__value">'+item.runnerName+'</span>\n' +
                            '                            </div>\n' +
                            '                            <div id="p3" class="weui-form-preview__item">\n' +
                            '                                <label class="weui-form-preview__label">发布时间</label>\n' +
                            '                                <span class="weui-form-preview__value">'+new Date(item.createTime).Format("yyyy-MM-dd")+'</span>\n' +
                            '                            </div></div>\n' +
                            '                        <div class="weui-form-preview__ft">\n' +
                            '                            <a role="button" class="weui-form-preview__btn weui-form-preview__btn_primary" data-id='+item.runnerId+'>'+getStatus1(item.status)+'</a>\n' +
                            '                        </div>\n' +
                            '                    </div>';
                    }
                });
                $('#wei').html(weitempAreaHtml);
                $('#yi').html(yitempAreaHtml);
            }else {
                console.log(11)
            }
        });
    }
    $('#runnerdiv').on('click', 'a', function (e) {
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
                runnerId : id
            },
            success : function(data) {
                if (data.success) {
                    console.log(11);
                    getRunnerList();
                } else {
                    console.log(22);
                }
            }
        });
    });
    function getStatus(status) {
        if (status == 0) {
            return '等待接单';
        }else if (status == 1) {
            return '已接单，点我确认完成';
        }else if (status == 2){
            return '已完成';
        }
    }
    function getStatus1(status) {
        if (status == 0) {
            return '等待接单';
        }else if (status == 1) {
            return '我已接单';
        }else if (status == 2){
            return '我已完成';
        }
    }
});