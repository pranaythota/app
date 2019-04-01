// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback /*, thisArg*/ ) {
		var T, k;
		if (this == null) {
			throw new TypeError('this is null or not defined');
		}
		// 1. Let O be the result of calling toObject() passing the
		// |this| value as the argument.
		var O = Object(this);
		// 2. Let lenValue be the result of calling the Get() internal
		// method of O with the argument "length".
		// 3. Let len be toUint32(lenValue).
		var len = O.length >>> 0;
		// 4. If isCallable(callback) is false, throw a TypeError exception. 
		// See: http://es5.github.com/#x9.11
		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}
		// 5. If thisArg was supplied, let T be thisArg; else let
		// T be undefined.
		if (arguments.length > 1) {
			T = arguments[1];
		}
		// 6. Let k be 0.
		k = 0;
		// 7. Repeat while k < len.
		while (k < len) {
			var kValue;
			// a. Let Pk be ToString(k).
			//    This is implicit for LHS operands of the in operator.
			// b. Let kPresent be the result of calling the HasProperty
			//    internal method of O with argument Pk.
			//    This step can be combined with c.
			// c. If kPresent is true, then
			if (k in O) {
				// i. Let kValue be the result of calling the Get internal
				// method of O with argument Pk.
				kValue = O[k];
				// ii. Call the Call internal method of callback with T as
				// the this value and argument list containing kValue, k, and O.
				callback.call(T, kValue, k, O);
			}
			// d. Increase k by 1.
			k++;
		}
		// 8. return undefined.
	};
}

// Production steps of ECMA-262, Edition 6, 22.1.2.1
if (!Array.from) {
	Array.from = (function() {
		var toStr = Object.prototype.toString;
		var isCallable = function(fn) {
			return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
		};
		var toInteger = function(value) {
			var number = Number(value);
			if (isNaN(number)) {
				return 0;
			}
			if (number === 0 || !isFinite(number)) {
				return number;
			}
			return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
		};
		var maxSafeInteger = Math.pow(2, 53) - 1;
		var toLength = function(value) {
			var len = toInteger(value);
			return Math.min(Math.max(len, 0), maxSafeInteger);
		};
		// The length property of the from method is 1.
		return function from(arrayLike /*, mapFn, thisArg */ ) {
			// 1. Let C be the this value.
			var C = this;
			// 2. Let items be ToObject(arrayLike).
			var items = Object(arrayLike);
			// 3. ReturnIfAbrupt(items).
			if (arrayLike == null) {
				throw new TypeError('Array.from requires an array-like object - not null or undefined');
			}
			// 4. If mapfn is undefined, then let mapping be false.
			var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
			var T;
			if (typeof mapFn !== 'undefined') {
				// 5. else
				// 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
				if (!isCallable(mapFn)) {
					throw new TypeError('Array.from: when provided, the second argument must be a function');
				}
				// 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
				if (arguments.length > 2) {
					T = arguments[2];
				}
			}
			// 10. Let lenValue be Get(items, "length").
			// 11. Let len be ToLength(lenValue).
			var len = toLength(items.length);
			// 13. If IsConstructor(C) is true, then
			// 13. a. Let A be the result of calling the [[Construct]] internal method 
			// of C with an argument list containing the single item len.
			// 14. a. Else, Let A be ArrayCreate(len).
			var A = isCallable(C) ? Object(new C(len)) : new Array(len);
			// 16. Let k be 0.
			var k = 0;
			// 17. Repeat, while k < len… (also steps a - h)
			var kValue;
			while (k < len) {
				kValue = items[k];
				if (mapFn) {
					A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
				} else {
					A[k] = kValue;
				}
				k += 1;
			}
			// 18. Let putStatus be Put(A, "length", len, true).
			A.length = len;
			// 20. Return A.
			return A;
		};
	}());
}
;'use strict';

//Utilities
;(function($){
    if(!window.af) window.af = new Object;
    var util = this.af.util || new Object;

    //This guid is RFC4122 version 4 compliant
    util.guid = function uuidv4(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    util.getUrlVars = function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

        for(var i = 0; i < hashes.length; i++){
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }

        return vars;
    }

    //===Debounce===
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    util.debounce = function(func, wait, immediate){
        var timeout;
        return function(){
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };  

    util.isLegacyIE = (window.ActiveXObject ? true : false) || (!!window.MSInputMethodContext && !!document.documentMode);

    this.af.util = util;
})(jQuery);
;//START: Module - Equal Heights
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


;//START: Module Date Picker
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
;// START: Event Participation Form Validation
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
;// START: Footer Sticky Module
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
;//START: Google Maps Script
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
;//START: Module Header
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
;//START: Module Homepage Hero
(function($){
    var heroSwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: 4000,
        autoplayDisableOnInteraction: true,
        keyboardControl: true,
        pagination: '.swiper-pagination',
        // autoplayStopOnLast: true,
        paginationClickable: true,
        speed: 1000,
    });
}(jQuery));
//END: Module Homepage Hero
;// START: Login Form Validation
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
;//START: Module Mask
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
;// START: Module - Multiselect
;(function($){

    "use strict";

// setTimeout(function(){

//     $('select[multiple]').multiselect({
//         columns: 1,
//         placeholder: 'Pick your languages',
//         selectAll: true
//     });
    
// },0);

})(jQuery);
// END: Module - Multiselect
;// START: Reg Form Validation
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

;//START: Module Registration Form
;(function($){

    'use strict';
    var regForm = window.af.regForm || new Object();

    //Make Selectbox Data Available Globally
    regForm.selectBoxOptionsFromJSON = "";

    var selectedState = "";
    var selectedProfession = "";
    var stateSelectBox = $('select#state');
    var citySelectBox = $('select#city');
    var professionSB = $('select#profession');
    var collegeSelectBox = $('select#college');
    var bloodGroupSelectBox = $('select#bloodGroup');
    var languagesSelectBox = $('select#languages');
    var selectedState = "";   
    var selectCollege = $('select#college');

    if(selectCollege.length){
        selectCollege.on('change', function(){
            var selectedCollege =  $(this).val();
            if(selectedCollege === "other"){
                $('.other-clg-field').removeClass('hidden');
            } else{
                $('.other-clg-field').addClass('hidden');   
            }
        });
    }

    regForm.init = function(){
        var selectBox = $('select');

        if(selectBox.length){
            $.ajax({
                type : 'GET',
                url: '../assets/data/select-box-data.json',
                success: function(data){
                    // console.log(data);
                    regForm.selectBoxOptionsFromJSON = data;
                    regForm.bloodGroupOptions();
                    regForm.stateOptions();
                    regForm.languagesOptions();
                    regForm.getProfession();
                },
                error: function(err){
                    console.log(err);
                    //Add Message Handler
                    alert(err);
                }
            });
        }
    }

    //Generic Method get Append options to any Select Box
    regForm.appendSelectBoxOptions = function(ObjectData, PARAM_1, PARAM_2, PARAM_3, PARAM_4, appendOther){

        var ObjectDataOptions = [];
    
        //Get Options form array of Objects
        if(ObjectData){
            $(ObjectData).each(function(index, element){
                if(PARAM_3){
                    if(selectedState === element.state){
                        if(element[PARAM_1].trim() != ""){
                            ObjectDataOptions.push(element[PARAM_1].trim());
                        }
                    }
                } else{
                    if(element[PARAM_1].trim() != ""){
                        ObjectDataOptions.push(element[PARAM_1].trim());
                    }
                }
            });
        }
    
        //Sort & Remove Duplicates from the Options
        ObjectDataOptions = ObjectDataOptions.sort().filter(function(element, index, optionsArray){
            return index == optionsArray.indexOf(element);
        });
    
        //Create the Markup
        var optionMarkup = '<option value="__VALUE__">__OPTION__</option>';
        var options = "";
        var option = '<option value="">Select From the List</option>';
        var other = '<option value="other">Other</option>';
    
        if(PARAM_2.length){
            $(ObjectDataOptions).each(function(index, element){
                options += optionMarkup
                            .replace(/__VALUE__/g, element)
                            .replace(/__OPTION__/g, element)
            });
        }
    
        if(PARAM_4 || appendOther){
            if(PARAM_4){
                $(PARAM_2).empty().append(option).append(options);
            }
            if(appendOther){
                $(PARAM_2).empty().append(options).append(other);
            }
        } else {
            $(PARAM_2).append(options);
        }
    
    }

    regForm.bloodGroupOptions = function(){
        regForm.appendSelectBoxOptions(regForm.selectBoxOptionsFromJSON.bloodGroups, "group", bloodGroupSelectBox, false, false);
    }

    regForm.stateOptions = function(){
        regForm.appendSelectBoxOptions(regForm.selectBoxOptionsFromJSON.states, "state", stateSelectBox);
    }

    $(stateSelectBox).on('change', function(){
        selectedState = $(this).val();
        regForm.cityOptions();
    });

    // Get Profession of User
    regForm.getProfession = function(){
        $(professionSB).on('change', function(){
            selectedProfession = $(this).val();

            if(selectedProfession === "student"){
                $('.clg-field').removeClass('hidden');
                $('.emp-field, .other-field').addClass('hidden');
                //Append college names as options
                regForm.collegeOptions();
            }
    
            if(selectedProfession === "employee"){
                $('.emp-field').removeClass('hidden');
                $('.clg-field, .other-field').addClass('hidden');
                $('.other-clg-field').addClass('hidden');
            }
    
            if(selectedProfession === "other"){
                $('.other-field').removeClass('hidden');
                $('.emp-field, .clg-field').addClass('hidden');
                $('.other-clg-field').addClass('hidden');
            }
        });
    }

    regForm.cityOptions = function(){
        regForm.appendSelectBoxOptions(regForm.selectBoxOptionsFromJSON.states, "city", citySelectBox, true, true);       
    }

    regForm.collegeOptions = function(){
        regForm.appendSelectBoxOptions(regForm.selectBoxOptionsFromJSON.colleges, "name", collegeSelectBox, false, true, true);
    }

    regForm.languagesOptions = function(){
        regForm.appendSelectBoxOptions(regForm.selectBoxOptionsFromJSON.languages, "language", languagesSelectBox);

        setTimeout(function(){

            $('select[multiple]').multiselect({
                columns: 1,
                placeholder: 'Pick your languages',
                selectAll: true
            });
            
        },0);
    }

    window.af.regForm = regForm;

})(jQuery)

//END: Module Registration Form
;$(document).ready(function(){
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