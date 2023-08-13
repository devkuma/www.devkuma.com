$(function() {

    var $value = $("#value");
    var $results = $("#results");

    $('[name=btnGenerate]').on('click', function() {
        $results.text(md5($results.val()));
    });

    $("#btnClear").on('click', function() {
        $value.val("");
		$results.text("");
    });

});