/**
 * 作者: bullub
 * 日期: 2016/12/15 12:49
 * 用途:
 */
"use strict";
(function (angular, undefined) {

    angular.module("controllers").controller("POEListCtrl", POEListCtrl);

    function POEListCtrl($scope, $timeout, api, alert, filetype) {
        $scope.docList = {};
        $scope.info = {
            blocks: 0,
            total: 0,
            totalToday: 0,
            proofing: 0,
        };
        $scope.listDocs = function () {
            api.getDocList(15, 'proof').then(function (resp) {
                var docs = resp.data.docs;
                for (var i in docs) {
                    var doc = docs[i];
                    if (doc.metadata !== null) {
                        var meta = JSON.parse(doc.metadata);
                        for (var k in meta) {
                            doc[k] = meta[k];
                        }
                        doc.filetype = filetype.get(doc);
                        doc.proofTime = doc.proofTime / 1000 / 1000;
                        doc.submitTime = doc.submitTime / 1000 / 1000;
                        $scope.docList[doc.id] = doc;
                    }
                }
            }, alert.httpFailed)
        };
        $scope.jumpPage = function (url) {
            console.log('jump to', url);
            window.open(url);
        };
        $scope.updateInfo = function () {
            api.getInfo().then(function (resp) {
                $scope.info.blocks = 123;
                $scope.info.total = resp.data.totalStat.totalDocs;
                $scope.info.totalToday = resp.data.todayStat.totalDocs;
                $scope.info.proofing = resp.data.totalStat.totalDocs - resp.data.totalStat.proofedDocs;
            }, api.httpFailed);
        };
        $scope.updateInfo();
        $scope.listDocs();
    }

}(angular));
