/// Services

/// api
/// 
function APIService($http) {
  const API_ROOT = 'http://192.168.5.105:9375/api';
  const API_ROUTER = {
    getUser: API_ROOT + '/account',
  };

  return {
    getAccount: function () {
      return $http.get(API_ROUTER.getUser)
    },
  };
};

function AlertService(){
  toastr.options = {
    closeButton: true,
    progressBar: true,
    showMethod: 'slideDown',
    positionClass: 'toast-top-full-width',//'toast-top-center',
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
      let errmsg = "";
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

angular
  .module('inspinia')
  .factory('alert', AlertService)
  .factory('api', APIService)
