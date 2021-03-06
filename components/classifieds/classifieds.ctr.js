(function(){
    "use strict";

    angular
        .module("ngClassifieds")
        .controller("classifiedsCtrl",function($scope, $state, classifiedsFactory, $mdDialog ,$mdSidenav, $mdToast){
            var vm = this;
            vm.openSidebar = openSidebar;
            vm.saveClassified = saveClassified;
            vm.deleteClassified = deleteClassified;
            vm.editClassified = editClassified;
            vm.classifieds;
            vm.classified;
            vm.categories;
            vm.editing;
            vm.showFilters;

            classifiedsFactory.getClassifieds().then(function(classifieds){
                vm.classifieds = classifieds.data;
                vm.categories = getCategories(vm.classifieds);
            });

            $scope.$on('editSaved', function(event, message){
                showToast(message);
            });
            $scope.$on('newClassified',function(event, classified){
                classified.id = vm.classifieds.length +1;
                vm.classifieds.push(classified);
                showToast('classified saved');
            });

            $scope.$on('showFilters',function(event, data){
                vm.showFilters = data;
            });

            function openSidebar(){
                $state.go('classifieds.new');
            }


            function saveClassified(classified){
                if(classified){
                    classified.contact = contact;
                    vm.classifieds.push(classified);
                    vm.classified = {};
                    closeSidebar();
                    showToast("Classified Saved");
                    
                }
            }

            function editClassified(classified){
                $state.go('classifieds.edit',{
                    id: classified.id,
                    classified: classified
                });
            }

            function saveEdit(){
                vm.editing = false;
                vm.classified = {};
                closeSidebar();
                showToast("Edit Saved");
            }

            function deleteClassified(event, classified){
                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete '+classified.title+'?')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(event);
                $mdDialog.show(confirm).then(function(){
                    var index = vm.classifieds.indexOf(classified);
                    vm.classifieds.splice(index, 1);
                }, function(){

                });
                
            }

            function showToast(message){
                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                        .position('top, right')
                        .hideDelay(2000)
                );
            }

            function getCategories(classifieds){
                var categories = [];
                angular.forEach(classifieds, function(item) {
                    angular.forEach(item.categories, function(category){
                        categories.push(category);
                    });
                });

                return _.uniq(categories);
            }

        });
})();