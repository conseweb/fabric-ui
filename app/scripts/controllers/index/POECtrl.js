/**
 * 作者: bullub
 * 日期: 2016/12/15 09:32
 * 用途:
 */
"use strict";
(function (angular, undefined) {
    angular.module("controllers")
        .controller("POECtrl", POECtrl);

    function POECtrl($scope, alert, api, crypto) {
        const State = {
            OK: '<i class="fa fa-check text-navy"></i>已完成',
            Ready: '<i class="fa fa-circle-o text-navy"></i>已就绪',
            Applying: '<i class="fa fa-spinner fa-spin text-navy"></i>申请中',
            Waiting: '<i class="fa fa-soccer-ball-o fa-spin text-navy" aria-hidden="true"></i>处理中',
            Unknown: '<i class="fa fa-question text-navy" aria-hidden="true"></i>未知',
        };

        $scope.costMap = {
            '1440 c': '1m',
            '144 c': '10m',
            '48 c': '30m',
            '24 c': '1h',
            '8 c': '3h',
            '2 c': '12h',
            '1 c': '24h'
        };
        $scope.costDesc = '期待文件证明完成所需代价,即完成证明所要的时间,代价值越高，等待时间越短,相对应的API请求次数越少,或者请求代价越高。';
        $scope.docList = [];
        const Docs = {
            add: function(d) {
                for (var i in $scope.docList) {
                    let doc = $scope.docList[i];
                    if (doc.hash === d.hash) {
                        doc = d;
                        console.log('docList update', d);
                        return;
                    }
                }
                console.log('docList add', d);
                $scope.docList.push(d);
            },
            setState: function (id, state) {
                for (var i in $scope.docList) {
                    let doc = $scope.docList[i];
                    if (doc.id === id) {
                        doc.state = state;
                        doc.isReady = false;
                        if (state === State.OK) {
                            doc.perdictTime = '';
                            doc.isOK = true;
                        }
                        return;
                    }
                }
                console.error('can not found file', hash, state);
            },
        };
        $scope.upload = function (doc) {
            if (!doc.hash) {
                alert.warn('哈希不能为空');
                return
            }
            var meta = {
                name: doc.name,
                size: doc.size,
                lastModified: doc.lastModified,
                type: doc.type,
                desc: doc.desc,
                sha256: doc.hash,
            }
            var docContent = doc.hash + ':' + doc.size;
            api.newDoc(docContent, doc.cost, meta).then(function (resp) {
                alert.success(resp.data.documentId);
                doc.id = resp.data.documentId;
                doc.perdictTime = resp.data.perdictProofTime * 1000;
                doc.state = State.Applying;
                $scope.addDoc(doc);
            }, alert.httpFailed);
        };
        $scope.addDoc = function (doc) {
            if (!doc.id) {return}
            Docs.add(doc);
            var getStatus = function (id, tty) {
                return function () {
                    if (tty) {
                        if (tty <= 0) {
                            alert.error(id, "查询超时")
                            return
                        }
                    } else {
                        tty = 10
                    }

                    api.checkState(id).then(function (resp) {
                        console.log('status', resp.data)
                        if (resp.data.status === 'wait') {
                            Docs.setState(id, State.Waiting);
                            setTimeout(getStatus(id, 10), 5 * 1000);
                        } else if (resp.data.status === 'ok') {
                            Docs.setState(id, State.OK);
                            console.log('ok', id)
                        }
                    }, function (resp) {
                        if (resp.status === 404) {
                            Docs.setState(id, State.Applying);
                            setTimeout(getStatus(id, tty--), 1500)
                        }
                    })
                }
            }
            setTimeout(getStatus(doc.id), 1500)
        }
        $scope.test = function (val) {
            console.log('input: ', val);
            console.log('docs', $scope.docList);
            console.log('md5 hello:', crypto.hash('hello'))
        };
        $scope.getHash = function (input) {
            console.log('file', input)
            //支持chrome IE10
            if (window.FileReader) {
                console.log('use window.FileReader');
                var file = input.files[0];
                crypto.hashFile(file, function (fileHash) {
                    var d = {
                        name: file.name,
                        size: file.size,
                        lastModified: file.lastModified,
                        type: file.type,
                        hash: fileHash,
                        desc: '',
                        state: State.Ready,
                        cost: '1m',
                        isReady: true,
                    };
                    Docs.add(d);
                    $scope.$digest();
                    console.info('added.', $scope.docList);
                });
                // }
                // //支持IE 7 8 9 10
                // else if (typeof window.ActiveXObject != 'undefined'){
                //     console.log('use window.ActiveXObject');
                //     var xmlDoc;
                //     xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                //     xmlDoc.async = false;
                //     xmlDoc.load(input.value);
                //     console.log(xmlDoc.xml);
                // }
                // //支持FF
                // else if (document.implementation && document.implementation.createDocument) {
                //     console.log('use document.implementation');
                //     var xmlDoc;
                //     xmlDoc = document.implementation.createDocument("", "", null);
                //     xmlDoc.async = false;
                //     xmlDoc.load(input.value);
                //     console.log(xmlDoc.xml);
            } else {
                console.log('error');
            }
        };
        $scope.checkDoc = function (doc) {
            api.checkDoc(doc.hash+":"+doc.size).then(function (resp) {
                console.log('check doc', 'ok', resp);
                if (resp.data.status === 'valid') {
                    alert.success(resp.data.doc.id, 'OK');
                    doc.id = resp.data.doc.id;
                    doc.isOK = true;
                    Docs.add(doc);
                } else {
                    alert.warn(resp.data.message, resp.data.status);
                }
            }, function (resp) {
                console.log('[data]', 'check failed', resp);
                if (resp.data) {
                    alert.warn(resp.data.message, resp.data.status);
                } else {
                    alert.httpFailed(resp);
                }
            })
        };
        $scope.removeDoc = function (doc) {
            var index = $scope.docList.indexOf(doc);
            
            if (index >= 0) {
                $scope.docList.splice(index, 1);
            }
        };

        $scope.handleFileSelect = function (evt) {
            evt.stopPropagation();
            evt.preventDefault();

            var files = evt.dataTransfer.files; // FileList object.

            // files is a FileList of File objects. List some properties.
            var output = [];
            for (var i = 0, f; f = files[i]; i++) {
                output.push(
                    '<li><strong>', 
                    escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                    '</li>'
                );
                $scope.getHash({files: [f]});
            }
            document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
        };
        $scope.handleDragOver = function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        };
        $scope.handleChange = function (evt) {
            console.log('handleChange:', evt);
            $scope.getHash(this);
        };

        // Setup the dnd listeners.
        var dropZone = document.getElementById('drop_zone');
        var upfile = document.getElementById('upfile');
        dropZone.addEventListener('dragover', $scope.handleDragOver, false);
        dropZone.addEventListener('drop', $scope.handleFileSelect, false);
        upfile.addEventListener('change', $scope.handleChange, false);
    }
}(angular));