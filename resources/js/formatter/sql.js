$(function() {

    var $value = $("#value");
    var $results = $("#results");

    $('[name=btnGenerate]').on('click', function() {
        try {
            $results.val( vkbeautify.sql( $value.val() ) );
        } catch( err ) {
            alert( "Your document is invalid" );
        }
    });

    $("#btnClear").on('click', function() {
        $value.val("");
		$results.text("");
    });

});