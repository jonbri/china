(function() {
    var IMAGE_BASE_PATH = './img',
        IMAGE_BASE_PATH_ORIGINAL = IMAGE_BASE_PATH + '/original',
        IMAGE_BASE_PATH_RESIZED = IMAGE_BASE_PATH + '/resized',
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
        function loadImage( sPath, sPathLink, $context ) {
            $context.append('<a href="' + sPath + '"><img src="' + sPathLink + '" /></a>');
        }
        var oData = data[sName],
            $context = jQuery('#' + sName + 'Pics');
        oData.forEach(function( o ) {
            var sOriginalPath = IMAGE_BASE_PATH_ORIGINAL + '/' + o.path,
                sResizedPath = IMAGE_BASE_PATH_RESIZED + '/' + o.path;
            loadImage(sOriginalPath, sResizedPath, $context);
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

