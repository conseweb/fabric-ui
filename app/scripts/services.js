/// Services

/// api
/// 
function APIService($http) {
  const API_ROOT = 'http://192.168.5.105:9694/api/v1';
  
  const API_ROUTER = {
    docs: API_ROOT + '/documents',
    result: API_ROOT + '/documents/result',
    state: function (id) {
      return API_ROOT + '/documents/' + id + "/status"
    },
    getDoc: function (id) {
      return API_ROOT + '/documents/' + id + "/result"
    }
  };

  return {
    checkDoc: function (doc) {
      return $http.post(API_ROUTER.result, {rawDocument: doc});
    },
    getDocList: function (count, type) {
      if (!count || count < 0) {
        count = 10;
      }
      if (!type) {
        return $http.get(API_ROUTER.docs + '?count=' + count);
      } else if (type != 'register') {
        type = 'proof';
      }
      return $http.get(API_ROUTER.docs + '?count=' + count + '&type=' + type);
    },
    newDoc: function (doc, cost, meta) {
      return $http.post(API_ROUTER.docs, {proofWaitPeriod: cost,rawDocument: doc, metadata: JSON.stringify(meta)});
    },
    checkState: function (id) {
      return $http.get(API_ROUTER.state(id));
    },
    getDoc: function (id) {
      return $http.get(API_ROUTER.getDoc(id));
    }
  };
};

function AlertService(){
  toastr.options = {
    closeButton: true,
    progressBar: true,
    showMethod: 'slideDown',
    positionClass: 'toast-top-center',
    timeOut: 4000
  };

  return {
    success: function (c, t) {
      toastr.success(c, t);
      console.log('success:', c, t);
    },
    error: function (c, t) {
      toastr.error(contet, title)
      console.log('error: ', c, t);
    },
    warn: function (c, t) {
      toastr.warning(c, t)
      console.log('warning: ', c, t);
    },
    httpFailed: function (resp) {
      var errmsg = "";
      if (resp.data) { 
        errmsg = resp.data.error;
      } else {
        errmsg = "无法连接到服务器";
      }
      toastr.warning(errmsg, '请求错误');
      console.log('alert: ', errmsg, "请求错误")
    }
  };
}

function CryptoService() {
  const fmt = function (val) {
    return val.toString(CryptoJS.enc.Hex)
  };

  const cryp = {
    md5: function (res) {
      return fmt(CryptoJS.MD5(res));
    },
    sha3: function (res) {
      return fmt(CryptoJS.SHA3(res, {outputLength: 512}));
    },
    hash: function (res) {
      return cryp.sha3(res);
    },
    sha1File: function (file, callback) {
      var sha1 = CryptoJS.algo.SHA1.create();
      var read = 0;
      var unit = 1024 * 1024;
      var blob;
      var reader = new FileReader();
      reader.readAsArrayBuffer(file.slice(read, read + unit));
      reader.onload = function(e) {
        var bytes = CryptoJS.lib.WordArray.create(e.target.result);
        sha1.update(bytes);
        read += unit;
        if (read < file.size) {
            blob = file.slice(read, read + unit);
            reader.readAsArrayBuffer(blob);
        } else {
            var hash = sha1.finalize();
            callback(hash.toString(CryptoJS.enc.Hex)); // print the result
        }
      }      
    },
    sha256File: function (file, callback) {
      var sha256 = CryptoJS.algo.SHA256.create();
      var read = 0;
      var unit = 1024 * 1024;
      var blob;
      var reader = new FileReader();
      reader.readAsArrayBuffer(file.slice(read, read + unit));
      reader.onload = function(e) {
        var bytes = CryptoJS.lib.WordArray.create(e.target.result);
        sha256.update(bytes);
        read += unit;
        if (read < file.size) {
            blob = file.slice(read, read + unit);
            reader.readAsArrayBuffer(blob);
        } else {
            var hash = sha256.finalize();
            callback(hash.toString(CryptoJS.enc.Hex)); // print the result
        }
      }      
    },
    sha3File: function (file, callback) {
      var sha3 = CryptoJS.algo.SHA3.create();
      var read = 0;
      var unit = 1024 * 1024;
      var blob;
      var reader = new FileReader();
      var retHash = '';
      reader.readAsArrayBuffer(file.slice(read, read + unit));
      reader.onload = function(e) {
        var bytes = CryptoJS.lib.WordArray.create(e.target.result);
        sha3.update(bytes);
        read += unit;
        if (read < file.size) {
            blob = file.slice(read, read + unit);
            reader.readAsArrayBuffer(blob);
        } else {
            var hash = sha3.finalize();
            callback(hash.toString(CryptoJS.enc.Hex));
        }
      }
    },
    hashFile: function (file, callback) {
      return cryp.sha256File(file, callback);
    }
  }
  return cryp
}

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

angular
  .module('inspinia')
  .factory('alert', AlertService)
  .factory('crypto', CryptoService)
  .factory('filetype', FiletypeService)
  .factory('api', APIService)
