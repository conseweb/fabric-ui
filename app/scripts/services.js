/// Services

/// api
/// 
function APIService($http) {
  const API_ROOT = 'http://192.168.5.105:9375/api';
  const API_ROUTER = {
    getUser: API_ROOT + '/account',
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
    lqueryTx: function (tx, depth) {
      return API_ROOT + "/lepuscoin/tx/" + tx + "?depth=" + depth;
    },
    lqueryCoin: API_ROOT + "/lepuscoin/coin",

  };

  return {
    getAccount: function () {
      return $http.get(API_ROUTER.getUser)
    },
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
      return $http.post(API_ROUTER.ldeploy);
    },
    invokeCoinbase: function () {
      return $http.post(API_ROUTER.lcoinbase);
    },
    invokeTransfer: function (body) {
      return $http.post(API_ROUTER.ltransfer, body);
    },
    queryBalances: function (addrs) {
      return $http.get(API_ROUTER.lquery_addrs(addrs));
    },
    queryTx: function (tx, depth) {
      return $http.get(API_ROUTER.lqueryTx(tx, depth));
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
    success: function (c, t) {
      var content = c, title = t;
      setTimeout(function() {
        toastr.success(content, title)
        console.log('alert:', content, title);
      }, 1300);
    },
    error: function (c, t) {
      var content = c, title = t;
      setTimeout(function() {
        toastr.error(contet, title)
        console.log('alert: ', content, title);
      }, 1300);
    },
    warn: function (c, t) {
      var content = c, title = t;
      setTimeout(function() {
        toastr.warning(content, title)
        console.log('alert: ', content, title);
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
        toastr.warning(errmsg, '请求错误')
        console.log('alert: ', errmsg, "请求错误")
      }, 1300);
    }
  };
}

function StoreService($http) {
  return {
    store: {},
  }
};

function UserService($q, api) {
  const STORE_KEY = 'farmer-ui';

  let  store = {
    user: {},

    get: function () {
      var deferred = $q.defer();

      if (!store.user.id) {
        api.getAccount().then(function (resp) {
          angular.copy(resp.data, store.user);
        })
      }
      deferred.resolve(store.user);

      return store.user;
    },

    sync: function () {
      var deferred = $q.defer();

      api.getAccount().then(function (resp) {
        angular.copy(resp.data, store.user);
      }, function (resp) {
        console.log('get user failed,', resp)
      });

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

function ContactService ($q) {
  const STORE_KEY = 'farmer-ui-contacts';

  let store = {
    person: [
      {
        name: 'asdf',
        desc: 'a test user',
        addr: 'lalalala'
      }, {
        name: 'fdsa',
        desc: 'another test user',
        addr: 'gagagaga'
      }
    ],

    _getFromLocalStorage: function () {
      return JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    },

    _saveToLocalStorage: function (u) {
      localStorage.setItem(STORE_KEY, JSON.stringify(u));
    },

    get: function () {
      var deferred = $q.defer();

      if (store.person.length === 0) {
        angular.copy(store._getFromLocalStorage(), store.person);
      }

      deferred.resolve(store.person);

      return store.person;
    },

    set: function (u) {
      var deferred = $q.defer();

      store.person.push(u);

      store._saveToLocalStorage(store.person);
      
      deferred.resolve(store.person);

      return deferred.promise;
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
  .factory('contacts', ContactService)
  .factory('lepuscoin', LepuscoinService)
