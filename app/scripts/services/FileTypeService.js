/**
 * 作者: bullub
 * 日期: 2016/12/14 11:23
 * 用途:
 */
"use strict";
(function (angular, undefined) {

    angular.module("services")
        .factory("filetype", FiletypeService);

    function FiletypeService() {
        const ft = {
            FileTypes: {
                Unknown: {
                    name: 'archive',
                    icon: 'file-archive-o',
                },
                Image: {
                    name: 'image',
                    icon: 'file-image-o',
                },
                Sound: {
                    name: 'sound',
                    icon: 'file-sound-o',
                },
                Movie: {
                    name: 'movie',
                    icon: 'file-movie-o',
                },
                Pdf: {
                    name: 'pdf',
                    icon: 'file-pdf-o',
                },
                Excel: {
                    name: 'excel',
                    icon: 'file-excel-o',
                },
                Word: {
                    name: 'word',
                    icon: 'file-word-o',
                },
                Zip: {
                    name: 'zip',
                    icon: 'file-zip-o',
                },
                Text: {
                    name: 'text',
                    icon: 'file-text-o',
                },
                Code: {
                    name: 'code',
                    icon: 'file-code-o',
                },
            },
            getType: function (file) {
                if (file.type !== '') {
                    return ft.getTypeByFType(file.type);
                }
                var fileExt = file.name.substring(file.name.lastIndexOf('.') + 1);
                switch (fileExt) {
                    case 'jpg', 'jpeg', 'png', 'bmp', 'gif':
                        return ft.FileTypes.Image;
                    case 'mp3':
                        return ft.FileTypes.Sound;
                    case 'mp4', 'rmvb', 'wav', 'avi', 'mkv':
                        return ft.FileTypes.Movie;
                    case 'pdf':
                        return ft.FileTypes.Pdf;
                    case 'xls', 'xlsx':
                        return ft.FileTypes.Excel;
                    case 'doc', 'docx', 'docm':
                        return ft.FileTypes.Word;
                    case 'zip', 'rar', '7z', 'gz', 'tgz':
                        return ft.FileTypes.Zip;
                    case 'txt', 'conf':
                        return ft.FileTypes.Text;
                    case 'java', 'go', 'sh', 'html', 'css', 'js', 'py', 'rb', 'php', 'cs':
                        return ft.FileTypes.Code;
                    default:
                        return ft.FileTypes.Unknown;
                }
            },
            getTypeByFType: function (ftype) {
                var typePre = ftype.substring(0, ftype.indexOf('/') + 1);
                switch (typePre) {
                    case 'image':
                        return ft.FileTypes.Image;
                    case 'audio':
                        return ft.FileTypes.Sound;
                    case 'video':
                        return ft.FileTypes.Movie;
                    case 'text':
                        return ft.FileTypes.Text;
                    default:
                        switch (ftype.substring(ftype.indexOf('/') + 1)) {
                            case 'pdf':
                                return ft.FileTypes.Pdf;
                            case 'x-xls', 'vnd.ms-excel':
                                return ft.FileTypes.Excel;
                            case 'msword':
                                return ft.FileTypes.Word;
                            case 'zip':
                                return ft.FileTypes.Zip;
                        }
                }
            }
        };
        return ft.FileTypes.Unknown;
    }
}(angular));