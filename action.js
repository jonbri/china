(function() {
    var IMAGE_BASE_PATH = './img',
        IMAGE_BASE_PATH_ORIGINAL = IMAGE_BASE_PATH + '/original',
        IMAGE_BASE_PATH_RESIZED = IMAGE_BASE_PATH + '/resized',
        data;

    //http://stackoverflow.com/questions/220188/how-can-i-determine-if-a-dynamically-created-dom-element-has-been-added-to-the-d
    function isInDOMTree(node) {
       // If the farthest-back ancestor of our node has a "body"
       // property (that node would be the document itself), 
       // we assume it is in the page's DOM tree.
       return !!(findUltimateAncestor(node).body);
    }
    function findUltimateAncestor(node) {
       // Walk up the DOM tree until we are at the top (parentNode 
       // will return null at that point).
       // NOTE: this will return the same node that was passed in 
       // if it has no ancestors.
       var ancestor = node;
       while(ancestor.parentNode) {
          ancestor = ancestor.parentNode;
       }
       return ancestor;
    }

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

        function loadImage( sPath, sPathLink ) {
            var $imageSection = $('<div class="tile"></div>').appendTo($tileContainer);
            $imageSection.append('<a href="' + sPath + '"><img src="' + sPathLink + '" /></a>');
            return $imageSection;
        }

        oData.forEach(function( o ) {
            var sOriginalPath = IMAGE_BASE_PATH_ORIGINAL + '/' + o.path,
                sResizedPath = IMAGE_BASE_PATH_RESIZED + '/' + o.path;
            var $imageSection = loadImage(sOriginalPath, sResizedPath);
            $imageSection.append('<div>' + o.description + '</div>');
        });

        //setInterval(function() {
            //if( isInDOMTree() ) {
                setTimeout(function() {
                    var msnry = new Masonry($tileContainer.get()[0], {
                    });
                }, 2000);
            //}
        //}, 100);
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

