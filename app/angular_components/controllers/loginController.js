(function() {
    'use strict';
    angular.module('myApp.controller.login',['myApp.service.login','myApp.service.localstorage','ngAnimate'])
        .controller('loginCtrl', ["$rootScope", "$scope","$location", 'Login', 'LocalStorage', function ($rootScope, $scope,$location, Login, LocalStorage) {


            $scope.login = function(){
                Login.signin( $scope.user,
                    function(output){
                        $scope.returnStatus = output;
                        if(output.data){
                            LocalStorage.set('user',output.data.user_id);
                            $rootScope.user = {} ;
                            $rootScope.user.id = LocalStorage.get('user');
                            console.log('user id'+$rootScope.user.id);
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

                    }
                );
            }

            //Function to initiate values or scope variables
            var init = function(){
                $scope.user = {
                    name : '',
                    password : ''
                }
            }

            init();

        }]);
}).call(this);