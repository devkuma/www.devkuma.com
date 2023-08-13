$(function() {

    var $value = $("#value");
    var $results = $("#results");

    $('[name=btnGenerate]').on('click', function() {
        try {
            var myObject = JSON.parse( $value.val() );
            var res = JSON.stringify( myObject, null, 4 );
            $results.val(res);
        } catch( error ) {
            alert( "Invalid JSON Format" );
        }
    });

    $("#btnClear").on('click', function() {
        $value.val("{}");
		$results.text("");
    });

});