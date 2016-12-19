/**
 * 作者: bullub
 * 日期: 2016/12/14 11:26
 * 用途: 基础过滤器，首屏需要的过滤器
 */
"use strict";
(function (angular, undefined) {
    var filterModule = angular.module("filters", [])
        .config(config)
        .filter('subhash', subHashFilter)
        .filter('filesize', FileSizeFilter)
        .filter('mjdate', mjDateFilter);

    function config($filterProvider) {
        filterModule.filter = $filterProvider.register;
    }

    function subHashFilter() {
        const max_hash_length = 24
        return function (h) {
            if (h && h.length > max_hash_length) {
                return h.substr(0, max_hash_length) + '...';
            }
            return h
        }
    }

    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    function mjDateFilter() {
        return function (ts) {
            console.log('format time', ts, typeof ts);
            if (typeof ts === 'number') {
                var date = new Date(ts);
                console.log('type of ', typeof date);
                return date.Format("yyyy-MM-dd hh:mm:ss.S");
            }
            if (typeof ts === 'object') {
                return date.Format("yyyy-MM-dd hh:mm:ss.S");
            }
            return ts;
        }
    }

    function FileSizeFilter() {
        return function (size) {
            var arr = ['B', 'KB', 'MB', "GB", 'TB'];
            for (var i in arr) {
                if (size < 980) {
                    return size.toFixed(2) + ' ' + arr[i];
                }
                size /= 1024
            }
            return 'too big';
        }
    }

}(angular));