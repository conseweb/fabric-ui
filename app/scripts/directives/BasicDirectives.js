/**
 * 作者: bullub
 * 日期: 2016/12/14 11:26
 * 用途: 基础的自定义指令集
 */
"use strict";
(function (angular, undefined) {

    var directiveModule = angular.module("directives", [])
        .config(config)
        .directive("pageTitle", pageTitle)
        .directive("sideNavigation", sideNavigation);

    function config($compileProvider) {
        directiveModule.directive = $compileProvider.directive;
    }

    /**
     * 页面标题
     * @param $rootScope
     * @param $timeout
     * @returns {{link: link}}
     */
    function pageTitle($rootScope, $timeout) {
        return {
            link: function(scope, element) {
                var listener = function(event, toState, toParams, fromState, fromParams) {
                    // Default title - load on Dashboard 1
                    var title = '信链 | LepCoin';
                    // Create your own title pattern
                    if (toState.data && toState.data.pageTitle) title = '信链 | ' + toState.data.pageTitle;
                    $timeout(function() {
                        element.text(title);
                    });
                };
                $rootScope.$on('$stateChangeStart', listener);
            }
        }
    }

    /**
     *
     * @param $timeout
     * @returns {{restrict: string, link: link}}
     */
    function sideNavigation($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                // Call the metsiMenu plugin and plug it to sidebar navigation
                $timeout(function(){
                    element.metisMenu();
                });
            }
        };
    }



}(angular));