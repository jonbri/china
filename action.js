function loadImage( sPath, $context ) {
    $context.append('<a href="' + sPath + '"><img src="' + sPath + '" /></a>');
}

var sBasePath = './img/';
var sDomId = 'pics';
var data;

function loadIntroPics() {
    var oSubData = data.intro;
    var $context = jQuery('#introPics');

    for( var i = 0; i < oSubData.length; i++ ) {
        loadImage(sBasePath + oSubData[i].path, $context);
    }
}

function loadHongKongPics() {
    var oSubData = data.hongKong;
    var $context = jQuery('#hongKongPics');

    for( var i = 0; i < oSubData.length; i++ ) {
        loadImage(sBasePath + oSubData[i].path, $context);
    }
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

