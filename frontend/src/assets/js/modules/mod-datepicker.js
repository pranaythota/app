//START: Module Date Picker
;(function($){

    'use strict';
    var datePicker = window.af.datePicker || new Object();

    var dateField = $('[data-type="picker"]');

    datePicker.init = function(){
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth();
        var day = today.getDate();
        var maxdate = new Date(year - 5, month, day);

        if(dateField.length){

            dateField.flatpickr({
                dateFormat: "d-m-Y",
                minDate: "01-01-1920",
                maxDate: maxdate,
                disableMobile: true
            });

            dateField.on('change', function(){
                console.log('Change');
                if(dateField.val() != " "){
                    $(this).siblings('.error').hide();
                }
            });
        }
    }



    window.af.datePicker = datePicker;
})(jQuery)
//END: Module Date Picker