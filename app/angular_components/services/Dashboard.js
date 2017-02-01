(function() {
	'use strict';
angular.module('myApp.service.dashboard',[] ).factory(
	'Dashboard',
	function Dashboard($http) {
		return {

			add: function(data, cb) {

				var url = 'php_components/records.php?action=addRecord';

				var $promise = $http.post(encodeURI(url), JSON.stringify(data));

				$promise.then(
					function success(response) {
						cb(response);

					},
					function error(response) {
						cb({});
					}
				)
			},

			update: function(data, cb) {

				var url = 'php_components/records.php?action=updateRecord';

				var $promise = $http.post(encodeURI(url), JSON.stringify(data));

				$promise.then(
					function success(response) {
						cb(response);

					},
					function error(response) {
						cb({});
					}
				)
			},

			today: function(pageSize, pageNum, cb){
				  var url = 'php_components/records.php?action=todays&pageSize='+pageSize+'&pageNum='+pageNum;

					var $promise = $http.get(encodeURI(url));

					$promise.then(
		  				function success(response) {
							cb(response);
						}, function error(response) {
			          		console.log("Response Error: "+JSON.stringify(response));
			          		cb({});
			          	}
			       	);
			},


			threeDays: function(pageSize, pageNum, cb){
				var url = 'php_components/records.php?action=threeDays&pageSize='+pageSize+'&pageNum='+pageNum;

				var $promise = $http.get(encodeURI(url));

				$promise.then(
					function success(response) {
						cb(response);
					}, function error(response) {
						console.log("Response Error: "+JSON.stringify(response));
						cb({});
					}
				);
			},


			sevenDays: function(pageSize, pageNum, cb){
				var url = 'php_components/records.php?action=sevenDays&pageSize='+pageSize+'&pageNum='+pageNum;

				var $promise = $http.get(encodeURI(url));

				$promise.then(
					function success(response) {
						cb(response);
					}, function error(response) {
						console.log("Response Error: "+JSON.stringify(response));
						cb({});
					}
				);
			},


			fifteenDays: function(pageSize, pageNum, cb){
				var url = 'php_components/records.php?action=fifteenDays&pageSize='+pageSize+'&pageNum='+pageNum;

				var $promise = $http.get(encodeURI(url));

				$promise.then(
					function success(response) {
						cb(response);
					}, function error(response) {
						console.log("Response Error: "+JSON.stringify(response));
						cb({});
					}
				);
			},


			all: function(pageSize, pageNum, cb){
				var url = 'php_components/records.php?action=all&pageSize='+pageSize+'&pageNum='+pageNum;

				var $promise = $http.get(encodeURI(url));

				$promise.then(
					function success(response) {
						cb(response);
					}, function error(response) {
						console.log("Response Error: "+JSON.stringify(response));
						cb({});
					}
				);
			},

			search: function(query, cb){
				var url = 'php_components/records.php?action=search&query='+query;

				var $promise = $http.get(encodeURI(url));

				$promise.then(
					function success(response) {
						cb(response);
					}, function error(response) {
						console.log("Response Error: "+JSON.stringify(response));
						cb({});
					}
				);
			},

			singleRecord: function(id, cb){
				var url = 'php_components/records.php?action=single&id='+id;

				var $promise = $http.get(encodeURI(url));

				$promise.then(
					function success(response) {
						cb(response);
					}, function error(response) {
						console.log("Response Error: "+JSON.stringify(response));
						cb({});
					}
				);
			},

			deleteRecord: function(id, cb){
				var url = 'php_components/records.php?action=delete&id='+id;

				var $promise = $http.get(encodeURI(url));

				$promise.then(
					function success(response) {
						cb(response);
					}, function error(response) {
						console.log("Response Error: "+JSON.stringify(response));
						cb({});
					}
				);
			}



		}
	}
);
}).call(this);

