$(document).ready(function(){
    af.header.init();
    af.header.openMenuDevice();
    // af.socialIcons.init();
    af.regForm.init();
    // af.footer.init();
    af.mask.init();
    
    var mapArea = document.getElementById('map');
    
    if(mapArea){
        af.map.init();
    }
    window.af.datePicker.init();
});