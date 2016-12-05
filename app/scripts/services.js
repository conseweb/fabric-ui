/// Services

/// api
/// 
function APIService($http) {
  const API_ROOT = 'http://192.168.5.105:9694/api/v1';
  const API_ROUTER = {
    docs: API_ROOT + '/documents',
    result: API_ROOT + '/documents/result',
    state: function (id) {
      if (id) {
        return API_ROOT + '/documents/' + id + "/status"
      }
    }
  };

  return {
    getDoc: function (doc) {
      return $http.post(API_ROUTER.result, {rawDocument: doc})
    },
    getDocList: function (count, type) {
      if (!count || count < 0) {
        count = 10
      }
      if (!type || type != 'register') {
        type = 'proof'
      }
      return $http.get(API_ROUTER.docs + '?count=' + count + '&type=' + type)
    },
    newDoc: function (doc, cost) {
      return $http.post(API_ROUTER.docs, {proofWaitPeriod: cost,rawDocument: doc})
    },
    checkState: function (id) {
      return $http.get(API_ROUTER.state(id))
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

angular
  .module('inspinia')
  .factory('alert', AlertService)
  .factory('api', APIService)
