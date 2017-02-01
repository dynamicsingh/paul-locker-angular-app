(function() {
    'use strict';
    // author : Bhupinder Singh
    // Date : 13th June 2016

    angular.module('myApp.filter.dataHandler', []).
    filter('dataHandler', function() {
            return function(text,replacedText){
                if(text!=undefined && text!='' && text!=null){
                    return text;
                }
                else  if(text==undefined || text=='' || text==null) {
                    return replacedText
                }
            }
        }
    );
}).call(this);