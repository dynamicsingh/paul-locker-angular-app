(function() {
    'use strict';
    angular.module('myApp.controller.dashboard',['myApp.service.dashboard'])
        .controller('DashboardCtrl', ['$scope', '$moment', '$rootScope', '$location', '$window', '$routeParams', 'LocalStorage','$modal','$popover', '$alert', 'Dashboard', function ( $scope, $moment, $rootScope, $location, $window, $routeParams, LocalStorage, $modal, $popover, $alert, Dashboard) {
            $scope.openInfoModal = function(){
                this.show = infoModal.activate;
            }

            if($routeParams.id!=undefined){
                console.log('$routeParams.id : ' + $routeParams.id);
            }
            
            $scope.showAddScreen = function(){
                if($rootScope.isAddRecord == true){
                    $rootScope.isAddRecord = false;
                    $rootScope.btnTitle = "Add Record";
                    $window.location.href = '#/dashboard';
                }
                else{
                    $rootScope.isAddRecord = true;
                    $rootScope.btnTitle = "Show Records";
                    $window.location.href = '#/addRecord';
                }

            }

            $scope.showDeleteScreen = function(record){
                if(record.isDelete == false){
                    record.isDelete = true;
                }
                else if(record.isDelete == true){
                    record.isDelete = false;
                }

            }

            $scope.showDashboard = function(){
                    $window.location.href = '#/dashboard';

            }

            $scope.showEditScreen = function(id){
                    $window.location.href = '#/editRecord/'+id;
                    Dashboard.singleRecord(id,
                        function(output){
                            $scope.customer = output.data.data[0];
                        }
                    );
            }

            $scope.deleteRecord = function(id){
                Dashboard.deleteRecord(id,
                    function(output){
                        if(output.data.response=="Deleted Successfully"){
                            $alert({title: 'Record Deleted Successfully!', placement: 'top', type: 'info', show: true, duration:'3'});
                            init();
                        }
                        else {
                            $alert({title: 'Error, Try Again!', placement: 'top', type: 'info', show: true, duration:'3'});
                        }
                    }
                );
            }


            
            $scope.addRecord = function(){
                console.log('DATA'+JSON.stringify($scope.customer));
                if($scope.customer.id!="" && $scope.customer.acnum!="" && $scope.customer.roi!="" && $scope.customer.depositDate!="" && $scope.customer.maturityAmount!="" && $scope.customer.maturityDate!="" && $scope.customer.id!=null && $scope.customer.acnum!=null && $scope.customer.roi!=null && $scope.customer.depositDate!=null && $scope.customer.maturityAmount!=null && $scope.customer.maturityDate!=null){
                    $scope.Iswarning = false;
                    Dashboard.add($scope.customer,
                        function(output){
                            $scope.customer = {
                                id:'',
                                acnum:'',
                                amount:'',
                                roi:'',
                                depositDate:'',
                                maturityDate:'',
                                period:'',
                                maturityAmount:'',
                                name:'',
                                panNumber:'',
                                branch:''
                            }
                            $alert({title: 'Record Added Successfully!', placement: 'top', type: 'info', show: true, duration:'3'});
                        }
                    );
                }
                else{
                    $scope.Iswarning = true;
                    $scope.warning = 'Please fill all the details';
                }

            }


            $scope.updateRecord = function(){
                // console.log('DATA'+JSON.stringify($scope.customer));
                if($scope.customer.customer_id!=""){
                    $scope.Iswarning = false;
                    Dashboard.update($scope.customer,
                        function(output){
                            $alert({title: 'Record Updated Successfully!', placement: 'top', type: 'info', show: true, duration:'3'});
                        }
                    );
                }
                else{
                    $scope.Iswarning = true;
                    $scope.warning = 'Please fill all the details';
                }

            }


            $scope.viewTodaysRecords = function(pageNum){
                Dashboard.today($scope.pageSize,pageNum,
                    function(output){
                        $scope.todaysData = output.data.data;
                        $scope.todaysDataLength = output.data.total;
                        $scope.completedRecords = output.data.completed_records;
                    }
                );
            }

            $scope.viewNext3DaysRecords = function(pageNum){
                Dashboard.threeDays($scope.pageSize, pageNum,
                    function(output){
                        $scope.threeDaysData = output.data.data;
                        $scope.threeDaysDataLength = output.data.total;
                    }
                );
            }

            $scope.viewNext7DaysRecords = function(pageNum){
                Dashboard.sevenDays($scope.pageSize, pageNum,
                    function(output){
                        $scope.sevenDaysData = output.data.data;
                        $scope.sevenDaysDataLength = output.data.total;
                    }
                );
            }

            $scope.viewNext15DaysRecords = function(pageNum){
                Dashboard.fifteenDays($scope.pageSize, pageNum,
                    function(output){
                        $scope.fifteenDaysData = output.data.data;
                        $scope.fifteenDaysDataLength = output.data.total;
                    }
                );
            }

            $scope.viewAllRecords = function(pageNum){
                Dashboard.all($scope.pageSize,pageNum,
                    function(output){
                        $scope.allDaysData = output.data.data;
                        $scope.allDataLength = output.data.total;
                        $scope.allSum = output.data.sum_amount;
                        $scope.maturingSum = output.data.sum_maturity_amount;
                    }
                );
            }

            $scope.searchQuery =  function(){
                Dashboard.search($scope.searchFilter, function(output){
                        $scope.searchResultsData = output.data.data;
                        // $scope.allDataLength = output.data.total;
                        // $scope.allSum = output.data.sum_amount;
                        // $scope.maturingSum = output.data.sum_maturity_amount;
                    }
                );
            }

            $scope.cancelQuery =  function(){
                    $scope.searchFilter='';
                    $scope.searchResultsData = undefined;
            }

            $scope.showSearchTab =  function(){
                if($scope.searchFilter.length<=3){
                    $scope.searchResultsData = undefined;
                }
            }

            $scope.period = function (a , b) {
                a = new Date(a);
                b = new Date(b);
                $scope.customer.period ='';
                var diff = Math.floor(a.getTime() - b.getTime());
                var day = 1000 * 60 * 60 * 24;

                var days = Math.floor(diff/day);
                var months = Math.floor(days/31);
                var years = Math.floor(months/12);

                var message = b.toDateString();
                message += " was "
                message += days + " days "
                message += months + " months "
                message += years + " years ago \n";
                $scope.customer.period = Math.abs(days)+" Days";

            }



            // $scope.period = function () {
            //     var a = $moment($scope.customer.depositDate, 'DD/MM/YYYY');
            //     var b = $moment($scope.customer.maturityDate, 'DD/MM/YYYY');
            //     var days = b.diff(a, 'days');
            //     var duration = $moment.duration(b.diff(a));
            //     var DAYS = duration.asDays();
            //     console.log('days'+days);
            //     console.log('DAY'+DAYS);
            // }

            var init = function(){
                $scope.Iswarning = false;
                $scope.screenSize1000 = $rootScope.screenSize('> 1000');
                console.log('screen size'+$scope.screenSize1000);
                if($scope.screenSize1000==true){
                    $scope.colSpanVal = 12;
                }
                else{
                    $scope.colSpanVal = 1;
                }
                $scope.isDeleteScreen = false;
                $rootScope.isAddRecord = false;
                $rootScope.btnTitle = "Add Record";
                $scope.pageSize = 5;

                $scope.pageNumTodays = 1;
                $scope.pageNumNext3Days = 1;
                $scope.pageNumNext7Days = 1;
                $scope.pageNumNext15Days = 1;
                $scope.pageNumAllDays = 1;

                $scope.customer = {
                    id:'',
                    acnum:'',
                    amount:'',
                    roi:'',
                    depositDate:'',
                    maturityDate:'',
                    period:'',
                    maturityAmount:'',
                    name:'',
                    panNumber:'',
                    branch:''
                }

                if($routeParams.id==undefined && $rootScope.user.id==1){
                    $scope.viewTodaysRecords($scope.pageNumTodays);
                    $scope.viewNext3DaysRecords($scope.pageNumNext3Days);
                    $scope.viewNext7DaysRecords($scope.pageNumNext7Days);
                    $scope.viewNext15DaysRecords($scope.pageNumNext15Days);
                    $scope.viewAllRecords($scope.pageNumAllDays);
                }
                else if($routeParams.id!=undefined && $rootScope.user.id==1){
                    $scope.showEditScreen($routeParams.id);
                }
                else{
                    $location.path("/");
                }

            }
            init();

    }]);
}).call(this);