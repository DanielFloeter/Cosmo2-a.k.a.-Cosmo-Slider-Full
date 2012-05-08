//------------------------------------------------------ - - - - - - - - - -------//
//@
//@     name:           cosmo2: javascript rotator
//@     description:    image rotator
//@     locaton:        ./javascript/script.js
//@     author:         Daniel Flöter
//@     website:        www.kometschuh.de
//@     demo:           http://www.kometschuh.de/cosmo_slider/cosmo2/index.htm
//@     date:           08.05.2012
//@     license:        MIT or GPL
//@     repository:     https://github.com/DanielFloeter/Cosmo2-a.k.a.-Cosmo-Slider-Full
//@
//------------------------------------------------------ - - - - - - - - - -------//

$(function () {

    //------------------------------------------------------ - - - - - - - - - -------//
    // settings
    var settings = {
        strImagePath: 'images',
        nRadiusWidth: 300,
        nRadiusHeight: 60,
        bAheadIsDown: true,
        nRotateSpeed: 110
    };

    //------------------------------------------------------ - - - - - - - - - -------//
    // global variables
    var global = {
        varAktiv: null,
        nAlpha: 0,
        nSliceNo: 12
    };

    //------------------------------------------------------ - - - - - - - - - -------//
    // creat DOM for rotator (Document Object Model)
    for (var i = 1; i <= global.nSliceNo; i++) {
        $('<div/>', {
            id: 'image' + i,
            class: 'image',
            style: 'position: absolute; left: 300px; top: 0px; z-index: 100;'
        }).appendTo('#cosmo2');

        $('<img/>', {
            id: 'image' + i,
            class: 'bg',
            src: settings.strImagePath + '/Entwurf-innen_bg.png',
            style: 'top: 0; left: 0; opacity: 0;'
        }).appendTo('#image' + i);

        $('<img/>', {
            class: 'all',
            src: settings.strImagePath + '/Entwurf-innen-' + i + '_all.png',
            style: 'left: 0px;top: 0px; opacity: 0;',
            alt: 'sample image'
        }).appendTo('#image' + i);

        $('<img/>', {
            src: settings.strImagePath + '/Entwurf-innen-' + i + '.png',
            style: 'top: 0; left: 0;'
        }).appendTo('#image' + i);
    }

    //------------------------------------------------------ - - - - - - - - - -------//
    // rotate translation
    global.varAktiv = window.setInterval(function () { rotate(0.05); }, 1);

    //------------------------------------------------------ - - - - - - - - - -------//
    // break, set new translation and direction with mouse interaction
    $('.image').mousemove(function (e) {
        var nRelMousePos = e.pageX - 400 - 250;
        window.clearInterval(global.varAktiv)
        global.varAktiv = window.setInterval(function () { rotate(nRelMousePos / 1000); }, 1);
    });

    //------------------------------------------------------ - - - - - - - - - -------//
    // set for each image-slide css properties, like: left, top, z-index, opacity, ...
    //------------------------------------------------------ - - - - - - - - - -------//
    function rotate(delta) {
        var nAlphaWithOffset;
        global.nAlpha += (delta * settings.nRotateSpeed / 1100);
        for (var i = 1; i <= global.nSliceNo; i++) {
            nAlphaWithOffset = global.nAlpha + (0.5 * i);
            $('#image' + i).css('left', Math.cos(nAlphaWithOffset) * settings.nRadiusWidth + 'px');
            $('#image' + i).css('top', Math.sin(nAlphaWithOffset) * parseInt((settings.bAheadIsDown == true ? '+' : '-') + settings.nRadiusHeight) + 'px');
            $('#image' + i).css('z-index', Math.floor((Math.sin(nAlphaWithOffset) * 100) + 100));
            $('#image' + i + ' img.bg, #image' + i + ' img.all').css('opacity', Math.sin(nAlphaWithOffset) < 0.1 ? 0 : Math.sin(nAlphaWithOffset));
            $('#image' + i + ' img.bg').css('border-style', Math.sin(nAlphaWithOffset) < 0.5 ? 'none' : 'solid');
        }
    };
});