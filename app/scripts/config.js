/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index/main");

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/main.html",
            data: { pageTitle: '账户总览' }
        })
        .state('index.account', {
            url: "/account",
            templateUrl: "views/account.html",
            data: { pageTitle: '账户' }
        })
        .state('index.tx', {
            url: "/tx",
            templateUrl: "views/tx.html",
            data: { pageTitle: '交易' }
        })
        .state('index.block', {
            url: "/block",
            templateUrl: "views/block.html",
            data: { pageTitle: '区块' }
        })
        .state('index.net', {
            url: "/net",
            templateUrl: "views/net.html",
            data: { pageTitle: '网络' }
        })
        .state('index.config', {
            url: "/config",
            templateUrl: "views/config.html",
            data: { pageTitle: '设置' }
        })

}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });