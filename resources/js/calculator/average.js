$(function() {

    const $value = $("#value");
    const $results = $("#results");

    $("#btnCalc").click(function(e) {
        e.preventDefault();
        
        var sum = 0.0;
        // addition
        var m = $("#value").val().match(/([\-]{0,}[0-9]+\.[0-9]+|[\-]{0,}[0-9]+)/g);
        if (m !== null) {
            for (var i=0; i<m.length; i++) {
                if (typeof m[i] !== 'undefined' && m[i] !== false) {
                    sum += parseFloat(m[i]);
                }
            }

            const dataNumber = m.length;
            const average = (sum/m.length).toFixed(4);

            //$("#data_num").html(m.length);
            $("#results").val(`Number of data: ${dataNumber}\nAverage: ${average}`);
        }
    });
    
    $("#btnClear").on('click', function() {
        $value.val("");
        $results.text("");		
    });
});