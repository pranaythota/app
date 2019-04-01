// START: Reg Form Validation
;(function($){
    'use strict';

    var imageUpload = $("#imageUpload");
    var registrationForm = $("#reg-form");

    if(imageUpload.length){
        imageUpload.on('change', function() {
            alert('File Uploaded Checking the Size');
            if(this.files[0].size > 819200 ){ 
                //Add Message Handler with Modal window
                alert("File is too big!");
                this.value = "";
                $(this).siblings('.form-group__help-msg').addClass("error");
            } else{
                $(this).siblings('.form-group__help-msg').removeClass("error");   
            }
        });
    }

    if(registrationForm.length){
        // registration Form Validation - Client Side
        registrationForm.validate({
            // Global Normalizer
            normalizer: function(value) {
                // Trim the value of every element
                return $.trim(value);
            },
            //Move these rules to PUG (Markup)
            messages: {
                firstName: {
                    required: "Please Enter Your firstName"
                },
                lastName: {
                    required: "Please Enter Your lastName"
                },
                DOB: {
                    required: "Pleas Mention your Date of Birth"
                },
                gender: {
                    required:"Please select your gender"
                },
                email: {
                    required: "We need your email address to contact you",
                    email: "Your email address must be in the format of name@domain.com"
                },
                phoneNumber: {
                    required: "We need your phone number to contact you",
                },
                profession: {
                    required: "Please select your profession"
                },
                college: {
                    required: "Please select your College"
                },
                company: {
                    required: "Please enter your company name"
                },
                otherProfession: {
                    required: "Please specify your profession"
                },
                state: {
                    required: "Please select your state"
                },
                city: {
                    required: "Please select your city"
                },
                languages: {
                    required: "Please let us know what are the languages you know"
                },
                bloodGroup: {
                    required: "Please specify the blood group",
                },
                address: {
                    required: "Please specify the contact address"
                },
                imageUpload: {
                    required: "Please upload your photo",
                },
                whyAF: {
                    required: "Please mention why do you want to join Aasya Foundation"
                },
                tnc: {
                    required: "Please read & accept the terms & coditions"
                },
                otherCollege: {
                    required: "Please mention your college name"
                }
            },
    
            submitHandler: function() {
                
                $('body').addClass('loading').append('<div class="body--overlay"></div>');

                //alert('Form Filled succesfully & add Backend code here');
            }
        });
    }

})(jQuery);

// END: Reg Form Validation
