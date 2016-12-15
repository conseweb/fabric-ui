/**
 * 作者: bullub
 * 日期: 2016/12/15 12:49
 * 用途:
 */
"use strict";
(function (angular, undefined) {

    angular.module("controllers").controller("POEListCtrl", POEListCtrl);

    function POEListCtrl($scope, api, alert) {
        $scope.docList = {
            '123123': {
                name: 'testfiel',
                state: '以证明',
            },
        };
        $scope.listDocs = function () {
            api.getDocList(15, 'proof').then(function (resp) {
                console.log('doclist: ', resp.data);
                var docs = resp.data;
                for (var i in docs) {
                    var doc = docs[i];
                    $scope.docList[doc.id] = doc;
                }
            }, alert.httpFailed)
        };
        $scope.jumpPage = function (url) {
            console.log('jump to', url);
            // window.open(url);
        };
    }

}(angular));
