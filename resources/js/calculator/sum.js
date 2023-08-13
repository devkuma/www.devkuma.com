$(function() {

    const $value = $("#value");
    const $results = $("#results");

    $("#btnCalc").click(function(e) {
        e.preventDefault();
        
        let sum = 0.0;
        
        // addition
        var m = $("#value").val().match(/([\-]{0,}[0-9]+\.[0-9]+|[\-]{0,}[0-9]+)/g);
        if (m !== null) {
            for (var i=0; i<m.length; i++) {
                if (typeof m[i] !== 'undefined' && m[i] !== false) {
                    sum += parseFloat(m[i]);
                }
            }

            const dataNumber = m.length;
            //$("#data_num").html(m.length);
            $("#results").val(`Number of data: ${dataNumber}\nSum: ${sum}`);
        }
    });
    
    $("#btnClear").on('click', function() {
        $value.val("");
        $results.text("");		
    });
});