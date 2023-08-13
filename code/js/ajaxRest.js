(function($, window){

    $.extend({
        ajaxRest: function (options) {
            if (typeof options.data === 'object') {
                options.data = JSON.stringify(options.data);
            }

            var blockUI = null;
            if (options.type != "GET") {
                blockUI= {
                    beforeSend: function(xhr){
                        $.blockUI({
                            message: '<img src="/resources/images/ajax-loader.gif"/>',
                            css: {
                                width: "32px",
                                height: "32px",
                                top: "50%",
                                left: "50%",
                                border: "0px",
                                backgroundColor: "rgba(0, 0, 0, 0)",
                                color:'#00000'
                            },
                            baseZ: 4000
                        });
                    },
                    complete : function(xhr, textStatus) {
                        $.unblockUI();
                    }
                }
            } else {
                blockUI = {};
            }

            var settings = $.extend({
                //dataType : "json",
                //contentType : "application/json;charset=UTF-8"
            }, blockUI, options);

            settings.error = function(jqXHR, textStatus, errorThrown) {
                console.log("status : " + jqXHR.status);

                if(options.beforeError) {
                    if(options.beforeError(jqXHR, textStatus, errorThrown) == false){
                        return;
                    }
                }

                if (jqXHR.status == 500) {
                    swal({
                        title: "500 서버 오류",
                        text: " 서버에서 오류가 발생 하였습니다.<br/>" + options.url + " : " + jqXHR.status + "(" + jqXHR.statusText + ")",
                        type: "error",
                        html: true
                    });
                } else if (jqXHR.status == 405) {
                    swal({
                        title: "405 비허가된 방식",
                        text: "요청하신 " + options.type +"방식을 찾을 수 없습니다.<br/>" + options.url + " : " + options.type,
                        type: "error",
                        html: true
                    });
                } else if (jqXHR.status == 404) {
                    swal({
                        title: "404 URL 없음",
                        text: "죄송합니다. 요청하신 URL를 찾을 수 없습니다.<br/>" + options.url + " : " + options.type,
                        type: "error",
                        html: true
                    });
                } else if (jqXHR.status == 403) {
                    swal({
                        title: "403 사용 권한 없음",
                        text: "액세스가 거부되었습니다.<br/>" + options.url + " : " + options.type,
                        type: "error",
                        html: true
                    });
                } else if (options.error != null) {
                    options.error(jqXHR, textStatus, errorThrown);
                } else {
                    swal({
                        title: "오류가 발생했습니다.<br/>관리자에게 문의하세요.",
                        text: options.url + " : " + jqXHR.status + "(" + jqXHR.statusText + ")",
                        type: "error",
                        html: true
                    });
                }
            };

            return $.ajax(settings);
        },
    });

})(jQuery, this || window);