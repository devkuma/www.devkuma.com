$(function() {

    var x2js = new X2JS();

    var $value = $("#value");
    var $results = $("#results");

    $('[name=btnGenerate]').on('click', function() {
        try {
            var jsonObj = JSON.parse($value.val());
            $results.val( vkbeautify.xml(x2js.json2xml_str(jsonObj)) );
        } catch( err ) {
            alert( "Your document is invalid" );
        }
    });

    $("#btnClear").on('click', function() {
        $value.val("");
        $results.text("");
    });

});