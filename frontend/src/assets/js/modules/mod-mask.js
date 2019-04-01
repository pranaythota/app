//START: Module Mask
;(function($){

    'use strict';
    var mask = window.af.mask || new Object();
    var maskBottom = $('.mask-bottom');
    var maskTop = $('.mask-top');
    var maskTopAngled = $('.mask-top--angled');
    var maskBottomAngled = $('.mask-bottom--angled');

    mask.init = function(){
        if(maskBottom.length){
            console.log("Bottom");
            $(maskBottom).each(function(index, element) {
                var outerMostParentWidth = $(this).parent().innerWidth();
                $(this).css({
                    "border-left-width": outerMostParentWidth/2,
                    "border-right-width": outerMostParentWidth/2,
                });
            });
        }
        if(maskTop.length){
            console.log("Top");
        }
        if(maskTopAngled.length){
            console.log("maskTopAngled");
            $(maskTopAngled).each(function(index, element) {
                var outerMostParentWidth = $(this).parent().innerWidth();
                $(this).css({
                    "border-right-width": outerMostParentWidth,
                });
            });
        }
        if(maskBottomAngled.length){
            console.log("maskBottomAngled");
            $(maskBottomAngled).each(function(index, element) {
                var outerMostParentWidth = $(this).parent().innerWidth();
                $(this).css({
                    "border-left-width": outerMostParentWidth,
                });
            });
        }
    }

    window.af.mask = mask;
})(jQuery)

//END: Module Mask