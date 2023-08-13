$(function() {

    var $value = $("#value");
    var $results = $("#results");

    $('[name=btnValidate]').on('click', function() {
        $.ajax({
            contentType : "application/text;charset=UTF-8",
            // dataType : "text",
            url : "/api/1/validators/xml",
            type : "POST",
            data : $value.val(),
            success : function(data) {
                $results.val(data);
            }
        });
    });

    $("#btnClear").on('click', function() {
        $value.val("");
        $results.val("");
    });

});