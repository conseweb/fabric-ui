/**
 * 作者: bullub
 * 日期: 2016/12/15 12:51
 * 用途:
 */
"use strict";
(function (angular, undefined) {

    angular.module("controllers")
        .controller("CertCtrl", CertCtrl);

    function CertCtrl($scope, $stateParams, alert, api, crypto) {
        const getDoc = function (id) {
            api()
        }
        $scope.id = $stateParams.id;
        $scope.isOK = false;
        $scope.msg = '';

        $scope.doc = {
            id: $scope.id,
            state: '',
        }

        if (!$scope.id) {
            $scope.state = 'wrong';
            return;
        }

        api.getDoc($scope.id).then(function (resp) {
            console.log('get doc', resp.data);
            $scope.doc.status = resp.data.status;
            $scope.doc.publicKey = resp.data.publicKey;
            var docBody = resp.data.doc;
            if (!docBody) {
                alert.error('未找到文件信息');
                return;
            }
            $scope.doc.blockDigest = docBody.blockDigest;
            $scope.doc.submitTime = docBody.submitTime;
            $scope.doc.proofTime = docBody.proofTime/1000/1000;
            $scope.doc.txid = docBody.txid;
            $scope.doc.sign = docBody.sign;

            var meta = JSON.parse(docBody.metadata);
            if (!meta) {
                alert.error('获取附加信息错误');
                return;
            }
            $scope.doc.name = meta.name;
            $scope.doc.size = meta.size;
            $scope.doc.lastModified = meta.lastModified;
            $scope.doc.type = meta.type===''?'未知':meta.type;
            $scope.doc.desc = meta.desc;
            $scope.doc.sha256 = meta.sha256;

            $scope.isOK = true;
            console.log('doc', $scope.doc);
        }, function (resp) {
            ;
        });
    }

}(angular));