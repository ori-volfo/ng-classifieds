(function(){
    "use strict";

    angular
        .module("ngClassifieds")
        .controller("classifiedsCtrl",function($scope, $state, $http, classifiedsFactory, $mdDialog ,$mdSidenav, $mdToast){
            var vm = this;
            vm.openSidebar = openSidebar;
            vm.closeSidebar = closeSidebar;
            vm.saveClassified = saveClassified;
            vm.deleteClassified = deleteClassified;
            vm.editClassified = editClassified;
            vm.saveEdit = saveEdit;
            vm.classifieds;
            vm.classified;
            vm.categories;
            vm.editing;

            classifiedsFactory.getClassifieds().then(function(classifieds){
                vm.classifieds = classifieds.data;
                vm.categories = getCategories(vm.classifieds);
            });


            var contact = {
                name: "Ori Volfovitch",
                phone: "054-4865862",
                email: "asd@asdf.com"
            };
            function openSidebar(){
                $state.go('classifieds.new');
            }

            function closeSidebar(){
                $mdSidenav('left').close();
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
                vm.editing = true;
                openSidebar();
                vm.classified = classified;
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