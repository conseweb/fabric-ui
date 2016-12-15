/**
 * 作者: bullub
 * 日期: 2016/12/14 13:24
 * 用途: 首页的控制器
 */
"use strict";
(function (angular, undefined) {

    var controllerModule = angular.module("controllers", [])
        .config(config)
        .controller("MainCtrl", MainCtrl)
        .controller("XCtrl", XCtrl);

    //配置控制器模块
    function config($controllerProvider) {
        controllerModule.controller = $controllerProvider.register;
    }

    function MainCtrl($scope, $http) {
        this.userName = '飞骐';
    }

    function XCtrl($scope) {
        $scope.title = 'My Contacts';
    }
}(angular));




