// START: Login Form Validation
;(function($){
    
    'use strict';

    var loginForm = $('#login-form');

    if(loginForm.length){
        $(loginForm).validate({
            // Global Normalizer
            normalizer: function(value) {
                // Trim the value of every element
                return $.trim(value);
            },

            messages: {
                userName: {
                    required: "Please Enter Your Username"
                },
                password: {
                    required: "Please Enter Your Password"
                }
            },

            submitHandler: function() {
                alert('Form Filled succesfully & add Backend code here');
            }
        });
    }

})(jQuery);
// END: Login Form Validation