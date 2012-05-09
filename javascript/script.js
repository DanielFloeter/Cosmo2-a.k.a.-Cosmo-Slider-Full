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

(function ($) {
    $.fn.cosmo2 = function (settings) {


        //------------------------------------------------------ - - - - - - - - - -------//
        // settings
        settings = jQuery.extend({
            nRadiusWidth: 300,
            nRadiusHeight: 60,
            bAheadIsDown: true,
            nRotateSpeed: 110,
            strImagePath: 'images',
            strBgImageAnimatedOpacity: 'Entwurf-innen_bg.png',
            aImagesAnimatedOpacity: ['Entwurf-innen-1_all.png', 'Entwurf-innen-2_all.png', 'Entwurf-innen-3_all.png', 'Entwurf-innen-4_all.png', 'Entwurf-innen-5_all.png', 'Entwurf-innen-6_all.png', 'Entwurf-innen-7_all.png', 'Entwurf-innen-8_all.png', 'Entwurf-innen-9_all.png', 'Entwurf-innen-10_all.png', 'Entwurf-innen-11_all.png', 'Entwurf-innen-12_all.png'],
            aImagesAlwaysVisible: ['Entwurf-innen-1.png', 'Entwurf-innen-2.png', 'Entwurf-innen-3.png', 'Entwurf-innen-4.png', 'Entwurf-innen-5.png', 'Entwurf-innen-6.png', 'Entwurf-innen-7.png', 'Entwurf-innen-8.png', 'Entwurf-innen-9.png', 'Entwurf-innen-10.png', 'Entwurf-innen-11.png', 'Entwurf-innen-12.png'],
            bUseBorderAnimatedObacity: true
        }, settings);

        //------------------------------------------------------ - - - - - - - - - -------//
        // global variables
        var global = {
            varAktiv: null,
            nAlpha: 0,
            nImagesCount: $(settings.aImagesAlwaysVisible).toArray().length
        };

        //------------------------------------------------------ - - - - - - - - - -------//
        // creat DOM for rotator (Document Object Model)
        for (var i = 0; i < global.nImagesCount; i++) {
            $('<div/>', {
                id: 'image' + i,
                class: 'image',
                style: 'position: absolute; left: 300px; top: 0px; z-index: 100;'
            }).appendTo(this);

            $('<img/>', {
                id: 'image' + i,
                class: 'bg',
                src: settings.strImagePath + '/' + settings.strBgImageAnimatedOpacity,
                style: 'top: 0; left: 0; opacity: 0;'
            }).appendTo('#image' + i);

            $('<img/>', {
                class: 'all',
                src: settings.strImagePath + '/' + settings.aImagesAnimatedOpacity[i],
                style: 'left: 0px;top: 0px; opacity: 0;',
                alt: 'sample image'
            }).appendTo('#image' + i);

            $('<img/>', {
                src: settings.strImagePath + '/' + settings.aImagesAlwaysVisible[i],
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
            global.varAktiv = window.setInterval(function () { rotate(nRelMousePos / 1100); }, 1);
        });

        //------------------------------------------------------ - - - - - - - - - -------//
        // set for each image-slide css properties, like: left, top, z-index, opacity, ...
        //------------------------------------------------------ - - - - - - - - - -------//
        function rotate(delta) {
            var nAlphaWithOffset;
            global.nAlpha += (delta * settings.nRotateSpeed / 1100);
            for (var i = 0; i < global.nImagesCount; i++) {
                nAlphaWithOffset = global.nAlpha + (6 / global.nImagesCount * i);
                $('#image' + i).css('left', Math.cos(nAlphaWithOffset) * settings.nRadiusWidth + 'px');
                $('#image' + i).css('top', Math.sin(nAlphaWithOffset) * parseInt((settings.bAheadIsDown == true ? '+' : '-') + settings.nRadiusHeight) + 'px');
                $('#image' + i).css('z-index', Math.floor((Math.sin(nAlphaWithOffset) * 100) + 100));
                $('#image' + i + ' img.bg, #image' + i + ' img.all').css('opacity', Math.sin(nAlphaWithOffset) < 0.1 ? 0 : Math.sin(nAlphaWithOffset));
                $('#image' + i + ' img.bg').css('border-style', Math.sin(nAlphaWithOffset) < 0.5 ? 'none' : 'solid');
            }
        };
    };
})(jQuery);