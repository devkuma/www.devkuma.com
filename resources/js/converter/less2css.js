$(function() {

    var parser = new less.Parser({});

    var $value = $("#value");
    var $results = $("#results");

    $('[name=btnGenerate]').on('click', function() {

        parser.parse( $value.val(), function (err, tree) {
            if (err) {
              alert( err );
              console.error(err)
            }
            $results.val(tree.toCSS());
        });
    });

    $("#btnClear").on('click', function() {
        $value.val("");
        $results.text("");
    });
});