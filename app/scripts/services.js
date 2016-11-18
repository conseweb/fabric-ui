/// Services

/// api
/// 
function APIService($http) {
  const API_ROOT = 'http://192.168.5.105:9375/api';
  const API_ROUTER = {
    login: API_ROOT + '/account/login',
    logout: API_ROOT + '/account/logout',
    preSignup: function (typ) {
      return API_ROOT + '/signup/' +(typ==='phone'?'phone':'email');
    },
    signup: API_ROOT + '/signup',

    // lepuscoin
    ldeploy: API_ROOT + "/lepuscoin/deploy",
    lcoinbase: API_ROOT + "/lepuscoin/coinbase",
    ltransfer: API_ROOT + "/lepuscoin/transfer",
    lquery_addrs: function (addrs) {
      return API_ROOT + "/lepuscoin/balance?format=true&addrs=" + addrs.join(',');
    },

  };

  return {
    loginEmail: function (email, password) {
      return $http.post(API_ROUTER.login, {email: email, password: password, type: 'email'})
    },
    logout: function () {
      return $http.delete(API_ROUTER.logout)
    },
    preSignup: function (val, typ) {
      let body = typ==='phone'?{phone: val}:{email: val};
      return $http.post(API_ROUTER.preSignup(typ), body);
    },
    signup: function (body) {
      return $http.post(API_ROUTER.signup, body)
    },

    /// Lepuscoin
    deployLepuscoin: function () {
      return $http.post(API_ROUTER.ldeploy)
    },
    invokeCoinbase: function () {
      return $http.post(API_ROUTER.lcoinbase)
    },
    invokeTransfer: function (body) {
      return $http.post(API_ROUTER.ltransfer, body)
    },
    queryBalances: function (addrs) {
      return $http.get(API_ROUTER.lquery_addrs(addrs))
    }
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
    success: function () {
      setTimeout(function(content, title) {
        toastr.success(content, title);
      }, 1300);
    },
    error: function (content, title) {
      setTimeout(function() {
        toastr.error(content, title);
      }, 1300);
    },
    warn: function (content, title) {
      setTimeout(function() {
        toastr.warning(content, title);
      }, 1300);
    },
    httpFailed: function (resp) {
      let errmsg = "";
      if (resp.data) { 
        errmsg = resp.data.error;
      } else {
        errmsg = "无法连接到服务器";
      }
      setTimeout(function() {
        toastr.warning(errmsg, "请求错误");
      }, 1300);
    }
  };
}

function StoreService($http) {
  return {
    store: {},
  }
};

function UserService($q) {
  const STORE_KEY = 'farmer-ui';

  let  store = {
    user: {},

    _getFromLocalStorage: function () {
      return JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
    },

    _saveToLocalStorage: function (u) {
      localStorage.setItem(STORE_KEY, JSON.stringify(u));
    },

    get: function () {
      var deferred = $q.defer();

      if (!store.user.id) {
        angular.copy(store._getFromLocalStorage(), store.user);
      }
      deferred.resolve(store.user);

      return store.user;
    },

    set: function (u) {
      var deferred = $q.defer();

      for (var k in u) {
        store.user[k] = u[k];
      }

      store._saveToLocalStorage(store.user);
      
      deferred.resolve(store.user);

      return deferred.promise;
    },

    isLogined: function () {
      if (store.get().id) {
        console.log("is logined,")
        return true
      }
      return false
    },

    allAddrs: function () {
      let addrs = [];
      if (store.user.devices) {
        for (var index in store.user.devices) {
          addrs.push(store.user.devices[index].address);
        }
      }
      return addrs;
    }
  }

  return store;
}

function LepuscoinService(api, user) {
  return {
    test: function (){
      console.log('api', api)
      console.log('user:', user)
    }
  }
}

angular
  .module('inspinia')
  .factory('alert', AlertService)
  .factory('api', APIService)
  .factory('user', UserService)
  .factory('lepuscoin', LepuscoinService)