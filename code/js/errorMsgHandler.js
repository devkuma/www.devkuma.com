var ErrorMsgHandler = (function() {

    function ErrorMsgHandler() {
    }

    ErrorMsgHandler.prototype.swal = function(title, msgObj) {

        if (typeof msgObj === 'string') {
            msgObj = JSON.parse(msgObj);
        }

        var text = "";
        for ( var i in msgObj) {
            if(msgObj[i].field =! null) {
                text += msgObj[i].fieldName + ": ";
            }
            text += msgObj[i].message + "<br/>"
        }

        swal({
            title : title,
            text : text,
            type : "error",
            closeOnCancel: true,
            html : true,
        });
    },

    ErrorMsgHandler.prototype.notFoundPage = function() {
        var url = window.url(1, document.URL);
        swal({
            title: "요청하신 정보를 찾지 못했습니다.",
            text: "삭제되었거나 존재하지 않는 게시물입니다.",
            type: "warning"
        }, function() {
            location.href = "/" + url;
        });
        return false;
    },

    ErrorMsgHandler.prototype.show = function(parentEle, responseText) {
        this.clear(parentEle);

        var errors = null;
        if (typeof responseText === 'string') {
            errors = JSON.parse(responseText);
        } else {
            errors = responseText;
        }

        if(errors.length == 1 && errors[0].field == null){
            swal({
                title : errors[0].message,
                text: "Error code : " + errors[0].code,
                type : "error",
                closeOnCancel: true,
                html: true
            });
            return;
        }

        swal.close();


        var focusItem = null;
        for (var i in errors) {

            var item = $(parentEle).find("[name=" + errors[i].field.replace("[", "\\[").replace("]", "\\]").replace(".", "\\.") + "]");
            if (item == null)
                continue;

            if (focusItem == null) {
                focusItem = item;
            }

            item.parent().addClass('has-error');

            var htmlText = "<span class='text-danger'>" + errors[i].message + "</span>";
            if (item.hasClass("sel-multiple")) {
                item.parent().children().last().after(htmlText);
            } else if (item.hasClass("select2-hidden-accessible")) { // select2
                item.parent().children().last().after(htmlText);
            } else if (item.hasClass("file-upload")) {
                item.parent().after(htmlText);
            } else if (item.hasClass( "image-upload")) {
                item.parent().parent().after(htmlText);
            } else if (item.hasClass("md-input")) {
                if (item.parent().hasClass(".md-editor")){
                    item.parent().after(htmlText); // markdown-editer
                } else {
                    item.parent().children(".editor-statusbar").before(htmlText); // simplemde
                }
            } else if(item.hasClass("code-input")) {
                item.parent().parent().after(htmlText);
            } else {
                item.after(htmlText);
            }
        }

        if (focusItem != null) {
            focusItem.focus();
        }
    },

    ErrorMsgHandler.prototype.clear = function(parentEle) {
        $(parentEle).find('.text-danger').parents().find(".has-error").removeClass('has-error');
        $(parentEle).find('.text-danger').remove();
    }

    return ErrorMsgHandler;
})();

var errorMsgHandler = new ErrorMsgHandler();