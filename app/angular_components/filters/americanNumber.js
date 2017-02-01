(function() {
    'use strict';
    // author : Bhupinder Singh

    angular.module('myApp.filter.americanNumber', []).
    filter('americanNumber', function($filter) {
        return function (number, place, replacementText) {
            if(number==0){
                return 0;
            }
            else if(number!=undefined && number!='' && number!=null){

                if (isNaN(number) || number < 1000) {
                    if(number<1000){
                        if(Number.isInteger(number)==true){
                            return number;
                        }
                        else{
                            return Number(Math.round(number+'e'+place)+'e-'+place);
                        }
                    }
                    else{
                        return parseInt(number);
                    }
                }
                else {
                    if (number >= 1000 && number < 1000000)
                        return (number / 1000).toFixed(place) + "K";
                    else if (number >= 1000000 && number < 1000000000)
                        return (number / 1000000).toFixed(place) + "M";
                    else if (number >= 1000000000 && number < 1000000000000)
                        return (number / 1000000000).toFixed(place) + "B";
                    else if (number >= 1000000000000)
                        return (number / 1000000000000).toFixed(place) + "T";
                }

            }
            else  if(number==undefined || number=='' || number==null) {
                return replacementText;
            }

        }
    });
}).call(this);
