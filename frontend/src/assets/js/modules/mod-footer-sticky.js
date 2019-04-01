// START: Footer Sticky Module
;(function($){

    'use strict';
    var footer = window.af.footer || new Object();

    var footer = $('footer');
    var isSticky = $('footer').hasClass('footer--sticky');
    var body = $('body');
    var bodyHeight = body.innerHeight();
    var VH = 90 + 'vh';

    //This method is just FALLBACK 
    footer.init = function(){

        if(bodyHeight > VH){
            if(isSticky){
                $('footer').removeClass('footer--sticky');
            }
        }else{
            if(!isSticky){
                $('footer').addClass('footer--sticky');
            }
        }
    }

    window.af.footer = footer;

})(jQuery)
// END: Footer Sticky Module