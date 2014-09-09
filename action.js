(function() {
    var IMAGE_BASE_PATH = './img/',
        data;

    function loadData() {
        $.ajax({
            type: 'POST',
            url: './data.json',
            async: false,
            data: {}
        }).done(function( remoteData ) {
            data = remoteData;
        });
    }

    function loadImageSection( sName ) {
        function loadImage( sPath, $context ) {
            $context.append('<a href="' + sPath + '"><img src="' + sPath + '" /></a>');
        }
        var oData = data[sName],
            $context = jQuery('#' + sName + 'Pics');
        oData.forEach(function( o ) {
            loadImage(IMAGE_BASE_PATH + o.path, $context);
            $context.append('<div>' + o.description + '</div>');
        });
    }

    // EXECUTION STARTS HERE
    $(document).ready(function() {
        loadData();
        loadImageSection('intro');
        setTimeout(function() {
            loadImageSection('hongKong');
        }, 500);
    });
})();

