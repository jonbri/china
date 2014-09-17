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

        var aDeferreds = [];
        oData.forEach(function( o ) {
            var sOriginalPath = IMAGE_BASE_PATH_ORIGINAL + '/' + o.path,
                sResizedPath = IMAGE_BASE_PATH_RESIZED + '/' + o.path,
                $tile = $('<div class="tile"></div>').appendTo($tileContainer);

            $tile.append('<a href="' + sOriginalPath + '"><img src="' + sResizedPath + '" /></a>');
            $tile.append('<div>' + o.description + '</div>');

            var oDeferred = new jQuery.Deferred();
            aDeferreds.push(oDeferred);

//http://stackoverflow.com/questions/1977871/check-if-an-image-is-loaded-no-errors-in-javascript
var $img = jQuery('img', $tile);
$("<img/>")
    .load(function() { oDeferred.resolve(); })
    .error(function() { console.log("error loading image"); })
    .attr("src", $img.attr("src"))
;

            /*
            var iIntervalDelay = 10;
            var $img = jQuery('img', $tile);
            var interval = setInterval(function() {
                if( $img.height() > 10 ) {
                    oDeferred.resolve();
                    clearInterval(interval);
                }
                iIntervalDelay += 100;
            }, iIntervalDelay);
            */
        });

        $.when.apply(jQuery, aDeferreds).then(function ( o ) {
            var msnry = new Masonry($tileContainer.get()[0], {
            });
        });
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

