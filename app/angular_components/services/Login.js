(function() {
	'use strict';
	angular.module('myApp.service.login',[] ).factory(
	'Login',
	function FirstLogin($http) {
		return {

			signin: function(data, cb) {
          
	       		 var url = 'php_components/login.php';

	      		 var $promise = $http.post(encodeURI(url), JSON.stringify(data));
	        
	       		 $promise.then(
	            		function success(response) {
	             		 cb(response);
	            	}, 
	           		 function error(response) {
	              		console.log(" Login Error Response: "+JSON.stringify(response));
	             		 cb({});
	            	}
	       		 )
      		}

		}
	}
);
}).call(this);

