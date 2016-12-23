/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
(function () {
    function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {

        function depResolve(options) {
            return function ($ocLazyLoad) {
                return $ocLazyLoad.load(options);
            }
        }

        // Configure Idle settings
        IdleProvider.idle(5); // in seconds
        IdleProvider.timeout(120); // in seconds

        $urlRouterProvider.otherwise("/index/main");

        $ocLazyLoadProvider.config({
            // Set to true if you want to see what and when is dynamically loaded
            debug: true
        });

        $stateProvider
            .state('cert', {
                url: '/cert/:id',
                templateUrl: 'views/poe/cert.html',
                data: {pageTitle: '证书'},
                resolve: {
                    CertController: depResolve([
                        {
                            serie: true,
                            files: ["scripts/controllers/index/CertCtrl.js"]
                        }
                    ])
                }
            })
            .state('index', {
                abstract: true,
                resolve: {
                    FileTypeService: depResolve([{
                        files: ["scripts/services/FileTypeService.js"]
                    }]),
                    controllers: depResolve([
                        {
                            serie: true,
                            files: [
                                "scripts/controllers/index/flotChartCtrl.js",
                                "scripts/controllers/index/POElistCtrl.js"
                            ]
                        }

                    ])
                },
                url: "/index",
                templateUrl: "views/common/content.html",
            })
            .state('index.main', {
                url: "/main",
                templateUrl: "views/poe/list.html",
                data: {pageTitle: '账户总览'},
                resolve: {
                    MainController: depResolve([{
                        files: ["scripts/controllers/index/POECtrl.js"]
                    }]),
                    loadPlugin: depResolve([
                        {
                            serie: true,
                            name: 'angular-flot',
                            files: [
                                'js/plugins/flot/jquery.flot.js',
                                'js/plugins/flot/jquery.flot.time.js',
                                'js/plugins/flot/jquery.flot.tooltip.min.js',
                                'js/plugins/flot/jquery.flot.spline.js',
                                'js/plugins/flot/jquery.flot.resize.js',
                                'js/plugins/flot/jquery.flot.pie.js',
                                'js/plugins/flot/curvedLines.js',
                                'js/plugins/flot/angular-flot.js',
                            ]
                        }
                    ])
                }
            })
            .state('index.upload', {
                url: "/upload",
                templateUrl: "views/poe/upload.html",
                data: {pageTitle: '存证'},
                resolve: {
                    UploadController: depResolve([{
                        files: ["scripts/controllers/index/POECtrl.js"]
                    }]),
                    loadPlugin: depResolve([
                        {
                            files: [
                                'js/plugins/crypto-js/crypto-js.js'
                            ]
                        },
                        {
                            files: [
                                'css/plugins/dropzone/basic.css',
                                'css/plugins/dropzone/dropzone.css',
                                'js/plugins/dropzone/dropzone.js'
                            ]
                        }
                    ])
                }
            })
            .state('index.check', {
                url: "/check",
                templateUrl: "views/poe/check.html",
                data: {pageTitle: '检查'},
                resolve: {
                    CheckController: depResolve([{
                        files: ["scripts/controllers/index/POECtrl.js"]
                    }]),
                    loadPlugin: depResolve([
                        {
                            files: [
                                'js/plugins/crypto-js/crypto-js.js'
                            ]
                        },
                        {
                            files: [
                                'css/plugins/dropzone/basic.css',
                                'css/plugins/dropzone/dropzone.css',
                                'js/plugins/dropzone/dropzone.js'
                            ]
                        }
                    ])
                }
            })
            // .state('index.config', {
            //     url: "/config",
            //     templateUrl: "views/config.html",
            //     data: {pageTitle: '设置'}
            // })
            // .state('login', {
            //     url: "/login",
            //     templateUrl: "views/user/login.html",
            //     data: {pageTitle: '登录'}
            // })
            // .state('register', {
            //     url: "/register",
            //     templateUrl: "views/user/register.html",
            //     data: {pageTitle: '注册'}
            // })
    }

    function httpProvider($q, $injector) {
        var authRecoverer = {
            request: function (config) {
                return config;
            },
            responseError: function (resp) {
                return $q.reject(resp);
            }
        };
        return authRecoverer;
    };

    angular
        .module('inspinia')
        .config(config)
        .factory('httpProvider', httpProvider)
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('httpProvider');
        }])
        .run(function ($rootScope, $state) {
            $rootScope.$state = $state;
        });
}());