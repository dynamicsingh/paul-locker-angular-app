angular.module('myApp.filter.paginationMdTable', [])
	.filter('startFrom',function (){
		return function (input,start) {
			start = +start;
			return input.slice(start);
		}
	});