//START: Module - Equal Heights
(function($){

    //TO DO
    window.equalHeights = function(container){

        maxHeight = 0;

        $(container).each(function(index, elem) {
            elemHeight = $(this).outerHeight();
            if(maxHeight < elemHeight){
                maxHeight = elemHeight;
            }
        });

        $(container).height(maxHeight);

    }

    $(document).ready(function() {
        window.equalHeights('.pro-events--wrapper .eq-col');
    });


})(jQuery);
//END: Module - Equal Heights

