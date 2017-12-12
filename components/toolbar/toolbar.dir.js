(function(){

    "use strict";
    angular
        .module('ngClassifieds')
        .component('toolbar', {
            templateUrl: 'components/toolbar/toolbar.tpl.html',

            controller: function($state,$scope){
                this.openSidebar = openSidebar;
                this.showFilters = showFilters;
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