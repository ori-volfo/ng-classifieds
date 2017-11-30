(function(){
   "use strict";
    angular
        .module('ngClassifieds')
        .controller('newClassifiedsCtrl',function($scope, $mdSidenav, $state, $timeout, $mdDialog, classifiedsFactory){
            var vm = this;
            vm.closeSidebar = closeSidebar;
            vm.saveClassified = saveClassified;

            $timeout(function(){
                $mdSidenav('left').open();
            });

            $scope.$watch('vm.sidenavOpen',function(sidenav){
                if(sidenav === false){
                    $mdSidenav('left').close()
                        .then(function(){
                            $state.go('classifieds');
                        });
                }
            });

            function closeSidebar(){
                vm.sidenavOpen = false;
            }

            function saveClassified(classified){
                if(classified){
                    classified.contact = {
                        name: "Ori Volfovitch",
                        phone: "054-4865862",
                        email: "asd@asdf.com"
                    };
                    $scope.$emit('newClassified', classified);
                    vm.sidenavOpen = false;
                }
            }
        })
})();