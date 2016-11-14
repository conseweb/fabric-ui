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
            templateUrl: "views/dashboard_5.html",
            data: { pageTitle: '账户总览' }
            // resolve: {
            //     loadPlugin: function ($ocLazyLoad) {
            //         return $ocLazyLoad.load([
            //             {
            //                 serie: true,
            //                 name: 'angular-flot',
            //                 files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
            //             },
            //             {
            //                 files: ['js/plugins/sparkline/jquery.sparkline.min.js']
            //             }
            //         ]);
            //     }
            // }
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
        .state('login', {
            url: "/login",
            templateUrl: "views/user/login.html",
            data: { pageTitle: '登录' }
        })
        .state('register', {
            url: "/register",
            templateUrl: "views/user/register.html",
            data: { pageTitle: '登录' }
        })
        .state('forgot_password', {
            url: "/forgot_password",
            templateUrl: "views/user/forgot_password.html",
            data: { pageTitle: '登录' }
        })

}
angular
    .module('inspinia')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });