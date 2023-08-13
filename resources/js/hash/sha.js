$(function() {

    var $value = $("#value");
    var $results = $("#results");

    var $txtResultHash = $("#txtResultHash");

    $('[name=btnGenerate]').on('click', function() {
        var hash = $(this).data("hash");

        var shaObj = new jsSHA(hash, "TEXT");
        shaObj.update($value.val());
        var results = shaObj.getHash("HEX");
        $results.text(results);

        $txtResultHash.text(" [" + hash + "]");
    });

    $("#btnClear").on('click', function() {
        $value.val("");
		$results.text("");
    });

});