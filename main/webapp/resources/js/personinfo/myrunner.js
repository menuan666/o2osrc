function toast1(){
    $('#toast').css("opacity", "0");
    $('#toast').css("display", "none");
}
$(function() {
    var runnerlistUrl = '/personinfo/queryrunnerlist';
    var updateUrl = '/personinfo/surerunner';
    getRunnerList()
    var userId;
    function getRunnerList() {
        $.getJSON(runnerlistUrl, function (data) {
            if (data.success) {
                console.log(data);
                var weitempAreaHtml = '';
                var yitempAreaHtml = '';
                userId = data.userId;
                console.log(userId);
                data.runnerlist.map(function (item, index) {
                    if (userId === item.userId){
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
                            '                                <span class="weui-form-preview__value">'+new Date(gaitime(item.createTime)).Format("yyyy-MM-dd hh:mm")+'</span>\n' +
                            '                            </div></div>\n' +
                            '                        <div class="weui-form-preview__ft">\n' +
                            '                            <a role="button" class="weui-form-preview__btn weui-form-preview__btn_primary" data-getuserid=' +item.getUserId+ ' data-id='+item.runnerId+'>'+getStatus(item.status)+'</a>\n' +
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
                            '                                <span class="weui-form-preview__value">'+new Date(gaitime(item.createTime)).Format("yyyy-MM-dd hh:mm")+'</span>\n' +
                            '                            </div></div>\n' +
                            '                        <div class="weui-form-preview__ft">\n' +
                            '                            <a role="button" class="weui-form-preview__btn weui-form-preview__btn_primary"  data-id='+item.runnerId+'>'+getStatus1(item.status)+'</a>\n' +
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
    $('#wei').on('click', 'a', function (e) {
        //var target = $(e.currentTarget);
        var id =  e.currentTarget.dataset.id;
        var guid = $(e.currentTarget).data("getuserid");
        var uid = $(e.currentTarget).data("userid");
        console.log(guid);
        var text = e.currentTarget.innerHTML;
        if (text =="已接单，点我确认完成"){
            $.ajax({
                url : updateUrl,
                async : false,
                cache : false,
                type : "post",
                dataType : 'json',
                data : {
                    runnerId : id,
                    guid : guid
                },
                success : function(data) {
                    if (data.success) {
                        $("#infotoast").text("确认完成");
                        $('#toast').css("display", "");
                        $('#toast').css("opacity", "1");
                        setTimeout("toast1()",1500);
                        getRunnerList();
                    } else {
                        $("#infotoast").text(data.errMsg);
                        $('#toast').css("display", "");
                        $('#toast').css("opacity", "1");
                        setTimeout("toast1()",1500);
                    }
                }
            });
        }

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
    function gaitime(createtime) {
        var shu = 8 * 60 * 60 * 1000
        var shu1 = parseInt(createtime)
        var shu2 = shu1 - shu
        return shu2;
    }
});