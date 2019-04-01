//START: Google Maps Script
;(function($){

    'use strict';
    var map = window.af.map || new Object();

    
    
    map.init = function(){
        
        // var mapArea = document.getElementById('map');
        // console.log(mapArea.length);

        // if(mapArea.length) {

            var map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 17.477686, lng: 78.548945},
                zoom: 20
            });
    
            var marker = new google.maps.Marker({
                position: map.center,
                map: map
            });    
    
        // }
    }


    window.af.map = map;

})(jQuery)
//END: Google Maps Script