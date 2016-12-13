/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 * Contains several global data used in different view
 *
 */
/// Services' functions

/// Controllers
function MainCtrl($scope, $http) {
    this.userName = '飞骐';
};

function XCtrl($scope) {
    $scope.title = 'My Contacts';
}

/**
 * flotChartCtrl - Controller for data for All flot chart
 * used in Flot chart view
 */

function flotChartCtrl() {
    /**
     * Bar Chart data
     */
    var chartData = [
        {
            label: "bar",
            data: [
                [201606, 10],
                [201607, 234],
                [201608, 456],
                [201609, 504],
                [201610, 984],
                [201611, 1125],
                [201612, 3859],
            ]
        }
    ];

    /**
     * Pie Chart Data
     */
    var pieData = [
        {
            label: "媒体文件",
            data: 21,
            color: "#d3d3d3"
        },
        {
            label: "代码文件",
            data: 3,
            color: "#bababa"
        },
        {
            label: "word文档",
            data: 15,
            color: "#79d2c0"
        },
        {
            label: "文本文件",
            data: 12,
            color: "#3ac2a4"
        },
        {
            label: "excel表格",
            data: 13,
            color: "#1ab394"
        },
        {
            label: "其它",
            data: 27,
            color: "#1ab284"
        },
    ];

    /**
     * Pie Chart Options
     */
    var pieOptions = {
        series: {
            pie: {
                show: true
            }
        },
        grid: {
            hoverable: true
        },
        tooltip: true,
        tooltipOpts: {
            content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
            shifts: {
                x: 20,
                y: 0
            },
            defaultTheme: false
        }
    };

    /**
     * Line Chart Options
     */
    var lineOptions = {
        series: {
            lines: {
                show: true,
                lineWidth: 2,
                fill: true,
                fillColor: {
                    colors: [
                        {
                            opacity: 0.0
                        },
                        {
                            opacity: 0.0
                        }
                    ]
                }
            }
        },
        xaxis: {
            tickDecimals: 0
        },
        colors: ["#1ab394"],
        grid: {
            color: "#999999",
            hoverable: true,
            clickable: true,
            tickColor: "#D4D4D4",
            borderWidth: 0
        },
        legend: {
            show: false
        },
        tooltip: true,
        tooltipOpts: {
            content: "x: %x, y: %y"
        }
    };

    /**
     * Definition of variables
     * Flot chart
     */
    this.flotChartData = chartData;
    this.flotLineOptions = lineOptions;
    this.flotPieData = pieData;
    this.flotPieOptions = pieOptions;
}

const POEState = {
    OK: '<i class="fa fa-check text-navy"></i>已完成',
    Ready: '<i class="fa fa-circle-o text-navy"></i>已就绪',
    Applying: '<i class="fa fa-spinner fa-spin text-navy"></i>申请中',
    Waiting: '<i class="fa fa-soccer-ball-o fa-spin text-navy" aria-hidden="true"></i>处理中',
    Unknown: '<i class="fa fa-question text-navy" aria-hidden="true"></i>未知',
};

function POEListCtrl($scope, api, alert, filetype) {
    $scope.docList = {};
    $scope.listDocs = function () {
        api.getDocList(15, 'proof').then(function (resp) {
            console.log('doclist: ', resp.data);
            var docs = resp.data.docs;
            for (var i in docs) {
                var doc = docs[i];
                var meta = JSON.parse(doc.metadata);
                for (var k in meta) {
                    doc[k] = meta[k];
                }
                doc.filetype = filetype.get(doc);
                doc.proofTime = doc.proofTime / 1000 / 1000;
                doc.submitTime = doc.submitTime / 1000 / 1000;
                $scope.docList[doc.id] = doc;
            }
        }, alert.httpFailed)
    };
    $scope.jumpPage = function (url) {
        console.log('jump to', url);
        window.open(url); 
    };
    $scope.listDocs();
}

function POECtrl($scope, alert, api, crypto) {
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
                doc = $scope.docList[i];
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
                doc = $scope.docList[i];
                if (doc.id === id) {
                    doc.state = state;
                    doc.isReady = false;
                    if (state === POEState.OK) {
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
            doc.state = POEState.Applying;
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
                        Docs.setState(id, POEState.Waiting);
                        setTimeout(getStatus(id, 10), 5 * 1000);
                    } else if (resp.data.status === 'ok') {
                        Docs.setState(id, POEState.OK);
                        console.log('ok', id)
                    }
                }, function (resp) {
                    if (resp.status === 404) {
                        Docs.setState(id, POEState.Applying);
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
                    state: POEState.Ready,
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
    $scope.handleFileSelect = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files; // FileList object.

        // files is a FileList of File objects. List some properties.
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
          output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                      f.size, ' bytes, last modified: ',
                      f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                      '</li>');
          $scope.getHash(f);
        }
        document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
    };
    $scope.handleDragOver = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    };
    $scope.handleChange = function (evt) {
        console.log(evt);
        $scope.getHash(this);
    };

    // Setup the dnd listeners.
    var dropZone = document.getElementById('drop_zone');
    var upfile = document.getElementById('upfile');
    dropZone.addEventListener('dragover', $scope.handleDragOver, false);
    dropZone.addEventListener('drop', $scope.handleFileSelect, false);
    upfile.addEventListener('change', $scope.handleChange, false);
}

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

/**
 *
 * Pass all functions into module
 */
angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('XCtrl', XCtrl)
    .controller('POEListCtrl', POEListCtrl)
    .controller('POECtrl', POECtrl)
    .controller('CertCtrl', CertCtrl)
    .controller('flotChartCtrl', flotChartCtrl);
