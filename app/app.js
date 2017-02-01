(function () {
    'use strict';

var app = angular.module('myApp',
    [
        'myApp.service.localstorage',
        'ngRoute',
        'ngSanitize',
        'ngAnimate',
        'mgcrea.ngStrap',
        'bw.paging',
        'angular-momentjs',
        'angularMoment',
        'screenSizeTeller',
        'myApp.controller.login',
        'myApp.controller.dashboard',
        'myApp.filter.americanNumber',
        'myApp.filter.dataHandler'
    ]);

    //App Route Configuration
    app.config( ['$routeProvider','$locationProvider','$httpProvider', '$alertProvider', function($routeProvider, $locationProvider, $httpProvider, $alertProvider) {
        angular.extend($alertProvider.defaults, {
            animation: 'am-fade-and-slide-top',
            placement: 'top'
        });
        //$locationProvider.html5Mode(true);
        // $httpProvider.interceptors.push("AuthInterceptor");
        $routeProvider
            .when('/', {
                templateUrl: 'angular_components/views/login.html',
                title: 'Home',
            })
            .when('/dashboard', {
                templateUrl: 'angular_components/views/home.html',
                title: 'Home',
            })
            .when('/addRecord', {
                templateUrl: 'angular_components/views/addRecord.html',
                title: 'AddRecord',
            })
            .when('/editRecord/:id', {
                templateUrl: 'angular_components/views/editRecord.html',
                title: 'EditRecord',
            })
            .when('/login', {
                templateUrl: 'angular_components/views/login.html',
                title: 'Home',
            })
            .when('/404', {
                templateUrl: 'angular_components/views/404.html',
                title: 'Home',
            })
            .otherwise({
                redirectTo: '/404'
            });

    }]);


    app.config(function($datepickerProvider) {
        angular.extend($datepickerProvider.defaults, {
            dateFormat: 'dd/MM/yyyy',
            startWeek: 1
        });
    });
    app.controller('NavigationCtrl', ['$scope', '$rootScope', '$location', 'LocalStorage','screenSizeTeller', '$modal', '$popover', function ( $scope, $rootScope, $location, LocalStorage, screenSizeTeller, $modal, $popover) {
        $scope.name='bhupinder';
        $scope.selectedIcons = [];
        $scope.icons = [{"value":"Gear","label":"<i class=\"fa fa-gear\"></i> Gear"},{"value":"Globe","label":"<i class=\"fa fa-globe\"></i> Globe"},{"value":"Heart","label":"<i class=\"fa fa-heart\"></i> Heart"},{"value":"Camera","label":"<i class=\"fa fa-camera\"></i> Camera"}];

        $scope.alert = {
            "title": "Record Added Successfully!",
            "type": "info"
        };

        $scope.modal = {title: 'Add Record'};

        $scope.showAddScreen = function(){
            if($scope.isAddRecord == true){
                $scope.isAddRecord = false;
                $scope.btnTitle = "Add Record";
            }
            else{
                $scope.isAddRecord = true;
                $scope.btnTitle = "Show Records";
            }

        }

        $scope.submit = function(){
            alert('done');
        }
        // Pre-fetch an external template populated with a custom scope
        var myOtherModal = $modal({scope: $scope, templateUrl: './angular_components/views/modal/add.tpl.html', show: false});
        // Show when some event occurs (use $promise property to ensure the template has been loaded)

        $scope.tabs = [
            {
                "title": "Home"
            },
            {
                "title": "Profile"
            },
            {
                "title": "About"
            },
            {
                "title": "Contact"
            }
        ];
        $scope.tabs.activeTab = "2";


        $scope.selectedDate = "2016-05-06T20:21:41.503Z";
        $scope.selectedDateAsNumber = 509414400000;
        $scope.fromDate = '';
        $scope.untilDate = '';


        $scope.aside = {
            "title": "Title",
            "content": "Hello Aside<br />This is a multiline message!"
        };


        // Controller usage example
        //

        $scope.tooltip = {
            "title": "Hello Tooltip<br />This is a multiline message! How are you doing friends",
            "checked": false
        };





            $scope.logout = function() {
                console.log('Logout called')
                $rootScope.user ={};
                LocalStorage.clearAll();
                $location.path ("/login");
            }

            var init = function(){
                $rootScope.screenSize = screenSizeTeller;
                $scope.isAddRecord = false;
                $scope.btnTitle = "Add Record";
                $scope.pageNum = 1;
                $scope.pageSize = 10;
                $rootScope.user = {};
                if(LocalStorage.get('user')!=undefined){
                    $rootScope.user.id = LocalStorage.get('user');
                }
                console.log('$rootScope.user.id'+$rootScope.user.id);
                if($rootScope.user.id == 1){
                    $location.path("/dashboard");
                }
                else if($rootScope.user.id == undefined){
                    $location.path("/login");
                }
                else{
                    $location.path("/");
                }
            }
            init();

        }
    ]);



})();