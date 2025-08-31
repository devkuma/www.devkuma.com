$(function() {

    var x2js = new X2JS();

    const $value = $("#value");
    const $results = $("#results");

    $('#btnGenerate').on('click', function() {
        try {
            $results.val(vkbeautify.json(x2js.xml_str2json($value.val())));
        } catch( err ) {
            alert( "Your document is invalid" );
        }
    });

    $("#btnClear").on('click', function() {
        $value.val("");
        $results.text("");		
    });

});