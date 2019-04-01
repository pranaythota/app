//START: Module Header
;(function($){

    'use strict';
    var header = window.af.header || new Object();

    header.init = function(){

        var header = $('header');
        
        var stickyNav = window.af.util.debounce(function(){
            
            if($(window).scrollTop() > headerOffsetTop){
                header.addClass('header--sticky');
            }else{
                header.removeClass('header--sticky');
            }
        },1);

        if(header.length){

            var headerOffsetTop = header.offset().top;

            // $(window).on('scroll', stickyNav);
        }
    }

    header.openMenuDevice = function(){
        var deviceMenu = $('.header--nav-items--device');
        var deviceMenuClose = $('.header--nav-items--device--close');
        var hamburger = $('.hamburger-icon');
        var body = $('body');

        hamburger.on('click', function() {
            deviceMenu.addClass('menu-open');
            body.addClass('device-menu-open');
        });

        deviceMenuClose.on('click', function() {
            deviceMenu.removeClass('menu-open');
            body.removeClass('device-menu-open');
        });
    }

    window.af.header = header;
    
})(jQuery);
//END: Module Header