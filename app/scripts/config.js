/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    $urlRouterProvider.otherwise("/index/main");

    $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
    });

    $stateProvider
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/dashboard.html",
            data: { pageTitle: '账户总览' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true,
                            name: 'angular-flot',
                            files: [ 'js/plugins/flot/jquery.flot.js', 'js/plugins/flot/jquery.flot.time.js', 'js/plugins/flot/jquery.flot.tooltip.min.js', 'js/plugins/flot/jquery.flot.spline.js', 'js/plugins/flot/jquery.flot.resize.js', 'js/plugins/flot/jquery.flot.pie.js', 'js/plugins/flot/curvedLines.js', 'js/plugins/flot/angular-flot.js', ]
                        }
                    ]);
                }
            }
        })
        .state('index.vault', {
            url: "/vault",
            templateUrl: "views/vault.html",
            data: { pageTitle: '金库' },
            controller: 'XCtrl'
        })
        .state('index.query', {
            url: "/query",
            templateUrl: "views/blockchain/query.html",
            data: { pageTitle: '查账' }
        })
        .state('index.tx', {
            url: "/tx",
            templateUrl: "views/blockchain/tx.html",
            data: { pageTitle: '转账' }
        })
        .state('index.market', {
            url: "/market",
            templateUrl: "views/market.html",
            data: { pageTitle: '交易所' }
        })
        .state('index.block', {
            url: "/block",
            templateUrl: "views/blockchain/block.html",
            data: { pageTitle: '账本' }
        })
        .state('index.appstore', {
            url: "/appstore",
            templateUrl: "views/appstore.html",
            data: { pageTitle: '应用商店' }
        })
        .state('index.net', {
            url: "/net",
            templateUrl: "views/blockchain/net.html",
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
            data: { pageTitle: '登录' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        }
                    ]);
                }
            }
        })
        .state('register', {
            url: "/register",
            templateUrl: "views/user/register.html",
            data: { pageTitle: '注册' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            insertBefore: '#loadBefore',
                            name: 'toaster',
                            files: ['js/plugins/toastr/toastr.min.js', 'css/plugins/toastr/toastr.min.css']
                        }
                    ]);
                }
            }
        })
        .state('forgot_password', {
            url: "/forgot_password",
            templateUrl: "views/user/forgot_password.html",
            data: { pageTitle: '遗忘密码' }
        })

}

function httpProvider($q, $injector) {
    var authRecoverer = {
        request: function (config) {
            return config;
        },
        responseError: function (resp) {
            if (resp.status == 401){
                window.location = '/#/login';
            }
            return $q.reject(resp);
        }
    };
    return authRecoverer;
};

function subHashFilter () {  
    return function(h) {
        if (h && h.length > 7) {
            return h.substr(0, 7);
        }
        return h
    }  
}

angular
    .module('inspinia')
    .config(config)
    .filter('subhash', subHashFilter)  
    .factory('httpProvider', httpProvider)
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpProvider');
    }])
    .run(function($rootScope, $state, user) {
        $rootScope.$state = $state;
        user.get();
    });

