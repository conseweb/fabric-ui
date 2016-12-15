/**
 * 作者: bullub
 * 日期: 2016/12/14 11:26
 * 用途: 基础过滤器，首屏需要的过滤器
 */
"use strict";
(function (angular, undefined) {
    var filterModule = angular.module("filters", [])
        .config(config);

    function config($filterProvider) {
        filterModule.filter = $filterProvider.register;
    }

}(angular));