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

    function loadTileContainer( sName ) {
        var oData = data[sName],
            $tileContainer = jQuery('.tileContainer', '#' + sName);

        function loadTile( sPath, sPathLink ) {
            var $tile = $('<div class="tile"></div>').appendTo($tileContainer);
            $tile.append('<a href="' + sPath + '"><img src="' + sPathLink + '" /></a>');
            return $tile;
        }

        var $lastTile;
        oData.forEach(function( o ) {
            var sOriginalPath = IMAGE_BASE_PATH_ORIGINAL + '/' + o.path,
                sResizedPath = IMAGE_BASE_PATH_RESIZED + '/' + o.path;
            var $tile = loadTile(sOriginalPath, sResizedPath);
            $tile.append('<div>' + o.description + '</div>');
            $lastTile = $tile;
        });

        if( $lastTile ) {
            var $img = jQuery('img', $lastTile);
            var iCount = 0;
            var iIntervalDelay = 0;
            var interval = setInterval(function() {
                if( $img.height() > 30 ) {
                    var msnry = new Masonry($tileContainer.get()[0], {
                    });
                    clearInterval(interval);
                }
                iIntervalDelay += 100;
                if( iCount > 10 ) {
                    clearInterval(interval);
                }
            }, iIntervalDelay);
        }
    }

    // EXECUTION STARTS HERE
    $(document).ready(function() {
        loadData();
        setTimeout(function() {
            loadTileContainer('intro');
        }, 0);
        setTimeout(function() {
            loadTileContainer('hongKong');
        }, 500);
    });
})();

