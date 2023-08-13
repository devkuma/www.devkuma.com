/**
 * windows beforeunload setting
 */
$(function(){
    (function($, window) {

        var LeavePageController = (function() {

            var changed = false;
            var $element;

            function LeavePageController(element, options) {

                $element = $(element);

                $(window).on("beforeunload", function() {
                    if(changed)
                        return "이 페이지를 벗어나면 작성된 내용은 저장되지 않습니다.";
                });

                return this;
            }

            LeavePageController.prototype.init = function() {
                changed = false;
                $element.find("select").on("change", function() {
                    changed = true;
                });

                $element.find("input, textarea").on("keydown", function() {
                    changed = true;
                });
            }

            LeavePageController.prototype.reset = function() {
                changed = false;
            }

            LeavePageController.prototype.forceHref = function(url) {
                $(window).off("beforeunload");
                location.href = url;
            }

            return LeavePageController;
        })();

        $.fn.leavePageController = function(){

            var $this = $(this);
            var data = $this.data("leavePageController");

            //data가  없으면 Default로 새로 생성
            if(!data){
                $this.data('leavePageController', data = new LeavePageController(this, arguments[0]));
            }

            return data;
        }

    })(window.jQuery, window);
});