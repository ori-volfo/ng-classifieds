(function(){

    "use strict";
    angular
        .module('ngClassifieds')
        .directive('toolbar',function () {
            return{
                templateUrl: 'components/toolbar/toolbar.tpl.html',
                scope: {
                    openSidebar: '=openSidebar'
                },
                controller: toolbarController,
                controllerAs: "vm"
            };

            function toolbarController($state,$scope){
                var vm = this;
                vm.openSidebar = openSidebar;
                vm.showFilters = showFilters;
                var filtersState = false;

                function openSidebar(){
                    $state.go('classifieds.new');
                }
                function showFilters(){
                    filtersState = !filtersState;
                    $scope.$emit('showFilters', filtersState);
                }
            }


        });
})();