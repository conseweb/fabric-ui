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
        };
        const readDoc = function (docBody, err) {
            if (!docBody) {
                alert.error('未找到文件信息');
                if (!err) {
                    $scope.error = {title: '未找到文件信息', content: ''}
                } else {
                    $scope.error = err;
                }
                return;
            }
            if (docBody.doc) {
                docBody = docBody.doc;
            }
            $scope.doc.blockDigest = docBody.blockDigest;
            $scope.doc.submitTime = docBody.submitTime;
            $scope.doc.proofTime = docBody.proofTime/1000/1000;
            $scope.doc.txid = docBody.txid;
            $scope.doc.sign = docBody.sign;

            var meta = JSON.parse(docBody.metadata);
            if (!meta) {
                alert.error('获取附加信息错误');
                if (!err) {
                    return;
                }
            } else {
                $scope.doc.name = meta.name;
                $scope.doc.size = meta.size;
                $scope.doc.lastModified = meta.lastModified;
                $scope.doc.type = meta.type===''?'未知':meta.type;
                $scope.doc.desc = meta.desc;
                $scope.doc.sha256 = meta.sha256;
            }

            if (!err) {
                $scope.isOK = true;
            } else {
                $scope.error = err;
            }
        };
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
            readDoc(resp.data.doc);
            console.log('doc', $scope.doc);
        }, function (resp) {
            console.log('bad response:', resp.data.message[0], resp.data.error);
            switch (resp.status) {
                case 400:
                    readDoc(resp.data.message[0], {title: "验证失败", content: resp.data.error});
                    break;
                case 404:
                    readDoc(resp.data.message[0], {title: "文件不存在", content: resp.data.error});
                    break;
                case 406:
                    readDoc(resp.data.message[0], {title: "文件正在排队中", content: resp.data.error});
                    break;
                case 500:
                    readDoc(resp.data.message[0], {title: "服务端错误", content: resp.data.error});
                    break;
                default:
                    readDoc(resp.data.message[0], {title: "未知的错误", content: resp.data.error});
                    break;
            }
            console.log('[data]', $scope.error)
        });
    }

}(angular));