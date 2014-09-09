function loadImage( sPath, $context ) {
    $context.append('<a href="' + sPath + '"><img src="' + sPath + '" /></a>');
}

var sBasePath = './img/';
var data;

function loadIntroPics() {
    var oSubData = data.intro;
        $context = jQuery('#introPics');

    oSubData.forEach(function( o ) {
        loadImage(sBasePath + o.path, $context);
        $context.append('<div>' + o.description + '</div>');
    });
}

function loadHongKongPics() {
    var oSubData = data.hongKong;
        $context = jQuery('#hongKongPics');

    oSubData.forEach(function( o ) {
        loadImage(sBasePath + o.path, $context);
        $context.append('<div>' + o.description + '</div>');
    });
}

$(document).ready(function() {

    // render music albums
    $.ajax({
        type: 'POST',
        url: './data.json',
        data: {}
    }).done(function( remoteData ) {
        data = remoteData;
    });

    setTimeout(function() {
        loadIntroPics();
        loadHongKongPics();
    }, 1000);
});

