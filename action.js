(function() {
    var IMAGE_BASE_PATH = './img',
        IMAGE_BASE_PATH_ORIGINAL = IMAGE_BASE_PATH + '/original',
        IMAGE_BASE_PATH_RESIZED = IMAGE_BASE_PATH + '/resized',
        // held in a closure for everyone to use
        data;

    function loadData() {
        var oDoneDeferred = new jQuery.Deferred();

        $.ajax({
            type: 'POST',
            url: './data.json',
            data: {}
        }).done(function( remoteData ) {
            data = remoteData;
            oDoneDeferred.resolve();
        });

        return oDoneDeferred.promise();
    }

    /*
        Create the dom for the tile.
        When all of the tile's dom image's load callbacks have been fired,
        (using an array of deferreds),
        initialize masonry
    */
    function loadTileContainer( sName ) {
        console.debug('loadTileContainer ' + sName);
        var oData = data[sName],
            oDoneDeferred = new jQuery.Deferred(),
            $tileContainer = jQuery('.tileContainer', '#' + sName);

        function markDomNodeHeightAsAttr( $domNode ) {
            $domNode.attr('__lastheight', $domNode.height());
        }

        var aDeferreds = [];
        var aTiles = [];
        oData.forEach(function( oTile ) {
            var sOriginalPath = IMAGE_BASE_PATH_ORIGINAL + '/' + oTile.path,
                sResizedPath = IMAGE_BASE_PATH_RESIZED + '/' + oTile.path,
                $tile = $('<div class="tile"></div>').appendTo($tileContainer),
                $img,
                oDeferred = new jQuery.Deferred();

            $tile.append('<a href="' + sOriginalPath + '"><img src="' + sResizedPath + '" /></a>');
            $tile.append('<div>' + oTile.description + '</div>');

            aDeferreds.push(oDeferred);

            //http://stackoverflow.com/questions/1977871/check-if-an-image-is-loaded-no-errors-in-javascript
            $img = jQuery('img', $tile);
            $("<img />")
                .load(function() { oDeferred.resolve(); })
                .error(function() { console.log("error loading image"); oDeferred.resolve(); })
                .attr("src", $img.attr("src"))
            ;

            aTiles.push($tile);
            markDomNodeHeightAsAttr($tile);
        });

        // go ahead and declare masonry, the dom nodes have at least been created already
        var msnry = new Masonry($tileContainer.get()[0], {
        });

        // detect when height changes and invoke a masonry layout
        var iIntervalLength = 10;
        var interval = setInterval(function() {
            // has size of any of the tiles changed?
            var iterTile;
            for( var i = 0; i < aTiles.length; i++ ) {
                iterTile = aTiles[i];
                var oldHeight = iterTile.attr('__lastheight');
                if( Number(oldHeight) !== iterTile.height() ) {
                    console.debug(sName + '. ' + $('img', iterTile).attr('src') + ' calling layout' + new Date() + '. oldHeight: ' + Number(oldHeight) + '. iterTile.height(): ' + iterTile.height());
                    msnry.layout();
                    break;
                }
            }

            aTiles.forEach(function( iterTile ) {
                markDomNodeHeightAsAttr(iterTile);
            });

            iIntervalLength = 100;
        }, iIntervalLength);

        $.when.apply(jQuery, aDeferreds).then(function ( o ) {
            clearInterval(interval);
            msnry.layout();
            oDoneDeferred.resolve();
        });
        
        return oDoneDeferred.promise();
    }

    // EXECUTION STARTS HERE
    $(document).ready(function() {
        loadData().then(function() {
            // store sections in array
            var aTileSections = [];
            for (var key in data) {
                if( data.hasOwnProperty(key) ) {
                    aTileSections.push(key);
                }
            }

            // load sections on after another
            var deferred = loadTileContainer(aTileSections.shift());
            aTileSections.forEach(function( sTileSection ) {
                deferred = deferred.then(function() {
                    return loadTileContainer(sTileSection);
                });
            });
        });
    });
})();

