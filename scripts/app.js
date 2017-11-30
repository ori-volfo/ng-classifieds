angular
    .module("ngClassifieds",["ngMaterial","ui.router"])
    .config(function($mdThemingProvider, $stateProvider, $locationProvider){
        $mdThemingProvider
            .theme('default')
            .primaryPalette('teal')
            .accentPalette('orange');
        $locationProvider.hashPrefix('');
        $stateProvider
            .state('classifieds',{
                url: '/classifieds',
                templateUrl:'components/classifieds/classifieds.tpl.html',
                controller: 'classifiedsCtrl as vm'
            })
            .state('classifieds.new',{
                url: '/new',
                templateUrl:'components/classifieds/new/classifieds.new.tpl.html',
                controller: 'newClassifiedsCtrl as vm'
            })
    });