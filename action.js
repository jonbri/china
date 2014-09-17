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

    /*
        Create the dom for the tile.
        When all of the tile's dom image's load callbacks have been fired,
        (using an array of deferreds),
        initialize masonry
    */
    function loadTileContainer( sName ) {
        var oData = data[sName],
            oDoneDeferred = new jQuery.Deferred(),
            $tileContainer = jQuery('.tileContainer', '#' + sName);

        var aDeferreds = [];
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
        });

        $.when.apply(jQuery, aDeferreds).then(function ( o ) {
            var msnry = new Masonry($tileContainer.get()[0], {
            });
            oDoneDeferred.resolve();
            //oDoneDeferred.fail();
        });
        
        return oDoneDeferred.promise();
    }

    // EXECUTION STARTS HERE
    $(document).ready(function() {
        // synchrounously get data...
        loadData();

        // sequentially create and download the various tile sections
        var d = jQuery.Deferred(), 
        p = d.promise();
        p.then(function() {
            return loadTileContainer('intro');
        }).then(function() {
            return loadTileContainer('hongKong');
        });
        d.resolve();
    });
})();

