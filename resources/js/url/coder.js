$(function() {

    var $value = $("#value");
    var $results = $("#results");

    $('#btnDecoder').on('click', function() {
        $results.text(decodeURIComponent($value.val()));
    });

    $('#btnEncoder').on('click', function() {
        $results.text(encodeURIComponent($value.val()));
    });

    $("#btnClear").on('click', function() {
        $value.val("");
		$results.text("");
    });
});