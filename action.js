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

    function loadTiles( sName ) {
        var oData = data[sName],
            $context = jQuery('.tileContainer', '#' + sName),
            $imageSection = $('<div class="tile"></div>').appendTo($context);

        function loadImage( sPath, sPathLink ) {
            $imageSection.append('<a href="' + sPath + '"><img src="' + sPathLink + '" /></a>');
        }

        oData.forEach(function( o ) {
            var sOriginalPath = IMAGE_BASE_PATH_ORIGINAL + '/' + o.path,
                sResizedPath = IMAGE_BASE_PATH_RESIZED + '/' + o.path;
            loadImage(sOriginalPath, sResizedPath);
            $imageSection.append('<div>' + o.description + '</div>');
        });

        /*
        setTimeout(function() {
            var msnry = new Masonry($context.get()[0], {
                //columnWidth: 60
            });
        }, 1100);
        */
    }

    // EXECUTION STARTS HERE
    $(document).ready(function() {
        loadData();
        setTimeout(function() {
            loadTiles('intro');
        }, 0);
        setTimeout(function() {
            loadTiles('hongKong');
        }, 500);
    });
})();

