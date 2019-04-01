// START: Event Participation Form Validation
;(function($){
    
    'use strict';

    var eventRegForm = $('#event-reg-form');
    var tShirtSizeField = $('#tShirtSize');
    var tShirtCheck = $("#tShirt");
    var isHidden = "";

    tShirtCheck.on('change', function(){
        if( $("#tShirt:checked").length > 0 ){
            isHidden = tShirtSizeField.parent('.form-group').hasClass('hidden');
            if(isHidden){
                tShirtSizeField.parent('.form-group').removeClass('hidden');
            }
        } else {
            isHidden = tShirtSizeField.parent('.form-group').hasClass('hidden');
            if(!isHidden){
                tShirtSizeField.parent('.form-group').addClass('hidden');
            }
        }
    });



    if(eventRegForm.length){
        eventRegForm.validate({
            // Global Normalizer
            normalizer: function(value) {
                // Trim the value of every element
                return $.trim(value);
            },

            rules: {
                tShirtSize: {
                    depends: function(element) {
                      return $("#tShirt:checked")
                    }
                }
            },

            messages: {
                firstName: {
                    required: "Please Enter Your First Name"
                },
                lastName: {
                    required: "Please Enter Your Last Name"
                },
                age: {
                    required: "Enter Your Age"
                },
                gender: {
                    required: "Please Select Your Gender"
                },
                email: {
                    required: "We nedd your E-Mail to contact you"
                },
                phoneNumber: {
                    required: "We nedd your Phone number to contact you"
                },
                tShirtSize: {
                    required: "Please select your T-Shirt size"
                }
            },

            submitHandler: function() {
                alert('Form Filled succesfully & add Backend code here');
            }
        });
    }

})(jQuery);
// END: Event Participation Form Validation