/**
 * 作者: bullub
 * 日期: 2016/12/18 18:58
 * 用途:
 */
"use strict";
module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        // 下面files里的基础目录
        basePath: './',
        // 测试环境需要加载的JS信息
        files: [
            'app/js/jquery/jquery-2.1.1.min.js',
            'app/js/plugins/jquery-ui/jquery-ui.js',
            'app/js/bootstrap/bootstrap.min.js',
            'app/js/plugins/metisMenu/jquery.metisMenu.js',
            'app/js/plugins/slimscroll/jquery.slimscroll.min.js',
            'app/js/plugins/pace/pace.min.js',
            "app/js/angular/angular.min.js",
            "app/js/angular/angular-mocks.js",
            "app/js/angular/angular-sanitize.js",
            "app/js/plugins/oclazyload/dist/ocLazyLoad.min.js",
            "app/js/angular-translate/angular-translate.min.js",
            "app/js/ui-router/angular-ui-router.min.js",
            "app/js/bootstrap/ui-bootstrap-tpls-1.1.2.min.js",
            "app/js/plugins/angular-idle/angular-idle.js",
            "app/js/plugins/toastr/toastr.min.js",
            "app/scripts/inspinia.js",
            "app/scripts/directives/BasicDirectives.js",
            "app/scripts/services/BasicServices.js",
            "app/scripts/controllers/BasicControllers.js",
            "app/scripts/filters/BasicFilters.js",
            "app/scripts/app.js",
            "app/scripts/config.js",
            "app/scripts/translations.js",
            "test/**/*.js"
        ],
        preprocessors : {
            'app/scripts/**/*.js': 'coverage'
        },
        // 是否自动监听上面文件的改变自动运行测试
        // autoWatch: true,
        // 用到的插件,比如chrome浏览器与jasmine插件
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-html-reporter'
        ],
        htmlReporter: {
            outputDir: 'reporters/unit-test', // where to put the reports
            templatePath: null, // set if you moved jasmine_template.html
            focusOnFailures: true, // reports show failures on start
            namedFiles: true, // name files instead of creating sub-directories
            pageTitle: null, // page title for reports; browser info by default
            urlFriendlyName: true, // simply replaces spaces with _ for files/dirs
            reportName: 'reports', // report summary filename; browser info by default
            // experimental
            preserveDescribeNesting: true, // folded suites stay folded
            foldAll: true, // reports start folded (only with preserveDescribeNesting)
        },
        coverageReporter: {
            type : 'html',
            dir : 'reporters/coverage/'
        },
        // 测试内容的输出以及导出用的模块名
        reporters: ['progress', 'html', 'coverage'],
        // 设置输出测试内容文件的信息
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};