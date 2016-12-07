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
        .state('index.upload', {
            url: "/upload",
            templateUrl: "views/poe/upload.html",
            data: { pageTitle: '存证' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/crypto-js/crypto-js.js']
                        },
                        {
                            files: ['css/plugins/dropzone/basic.css','css/plugins/dropzone/dropzone.css','js/plugins/dropzone/dropzone.js']
                        }
                    ]);
                }
            }
        })
        .state('index.check', {
            url: "/check",
            templateUrl: "views/poe/check.html",
            data: { pageTitle: '检查' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/plugins/crypto-js/crypto-js.js']
                        },
                        {
                            files: ['css/plugins/dropzone/basic.css','css/plugins/dropzone/dropzone.css','js/plugins/dropzone/dropzone.js']
                        }
                    ]);
                }
            }
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
            data: { pageTitle: '注册' }
        })
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

function subHashFilter () {
    const max_hash_length = 24
    return function(h) {
        if (h && h.length > max_hash_length) {
            return h.substr(0, max_hash_length) + '...';
        }
        return h
    }
}

function FileSizeFilter() {
    return function (size) {
        var arr = ['B', 'KB', 'MB', "GB", 'TB'];
        for (var i in arr) {
            if (size < 1024) {
                return size.toFixed(2) + ' ' + arr[i];
            }
            size /= 1024
        }
        return 'too big';
    }
}

Date.prototype.Format = function (fmt) {  
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function mjDateFilter() {
    return function (ts) {
        if (typeof ts === 'number') {
            var date = new Date(ts);
            console.log('type of ', typeof date);
            return date.Format("yyyy-MM-dd hh:mm:ss.S");
        }
        if (typeof ts === 'object') {
            return date.Format("yyyy-MM-dd hh:mm:ss.S");
        }
    }
}

angular
    .module('inspinia')
    .config(config)
    .filter('subhash', subHashFilter)
    .filter('filesize', FileSizeFilter)
    .filter('mjdate', mjDateFilter)
    .factory('httpProvider', httpProvider)
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpProvider');
    }])
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
