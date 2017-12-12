(function(){

    "use strict";
    angular
        .module('ngClassifieds')
        .component('classifiedCard',{
            templateUrl: 'components/classifieds/card/classified-card.tpl.html',
            bindings: {
                classifieds: '=',
                classifiedFilter: '=',
                category: '='
            },

            controller: function($state, $scope, $mdDialog){

                this.editClassified = editClassified;
                this.deleteClassified = deleteClassified;

                function editClassified(classified){
                    $state.go('classifieds.edit',{
                        id: classified.id,
                        classified: classified
                    });
                }

                function deleteClassified(event, classified){
                    var classifieds = this.classifieds;
                    var confirm = $mdDialog.confirm()
                        .title('Are you sure you want to delete '+classified.title+'?')
                        .ok('Yes')
                        .cancel('No')
                        .targetEvent(event);
                    $mdDialog.show(confirm).then(function(){
                        var index = classifieds.indexOf(classified);
                        classifieds.splice(index, 1);
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
            }

        });
})();