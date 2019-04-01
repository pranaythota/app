//START: Module Registration Form
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