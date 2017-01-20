/// Services

/// api
/// 
function APIService($http) {
  const API_ROOT = 'http://wallet.conseweb.com:9375/api';
  const API_ROUTER = {
    getUser: API_ROOT + '/account',
    login: API_ROOT + '/account/login',
    logout: API_ROOT + '/account/logout',
    preSignup: function (typ) {
      return API_ROOT + '/signup/' +(typ==='phone'?'phone':'email');
    },
    signup: API_ROOT + '/signup',

    // contacts
    contacts: API_ROOT + '/account/contacts',
    contactOne: function (id) {
      return API_ROOT + '/account/contacts/'+id
    },

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
      if (typ === 'phone') {
        return $http.post(API_ROUTER.preSignup(typ), {phone: val});
      } else {
        return $http.post(API_ROUTER.preSignup(typ), {email: val});
      }
    },
    signup: function (body) {
      return $http.post(API_ROUTER.signup, body)
    },

    /// contacts.
    addContact: function (body) {
      return $http.post(API_ROUTER.contacts, body)
    },
    listContacts: function () {
      return $http.get(API_ROUTER.contacts)
    },
    updateContact: function (id, body) {
      return $http.patch(API_ROUTER.contactOne(id), body)
    },
    removeContact: function (id) {
      return $http.delete(API_ROUTER.contactOne(id))
    },

    /// Lepuscoin
    deployLepuscoin: function () {
      return $http.post(API_ROUTER.ldeploy);
    },
    invokeCoinbase: function (addr) {
      return $http.post(API_ROUTER.lcoinbase, {addrs: [addr]});
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
    positionClass: 'toast-top-right',
    showDuration: 400,
    hideDuration: 1000,
    timeOut: 5000,
    extendedTimeOut: 1000,
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
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
      var errMsg = '无法连接到服务器'
      if (resp.data) { 
        errMsg = resp.data.error
      }
      toastr.warning(errMsg, '请求错误');
      console.log('alert: ', errMsg, "请求错误")
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

  var store = {
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
      var addrs = [];
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

function ContactService ($q, api, alert) {
  const STORE_KEY = 'farmer-ui-contacts';

  var store = {
    person: [],
    inited: false,

    get: function () {
      var deferred = $q.defer();

      if (!store.inited) {
        store.inited = true;
        api.listContacts().then(function (resp) {
          store.person = resp.data
        }, alert.httpFailed)
      }

      deferred.resolve(store.person);

      return store.person;
    },

    add: function (u) {
      var deferred = $q.defer();

      store.person.push(u);

      deferred.resolve(store.person);

      return deferred.promise;
    },

    sync: function () {
      var deferred = $q.defer();

      api.listContacts().then(function (resp) {
        store.person = resp.data
        alert.success(resp.data, resp.status)
      }, alert.httpFailed)
      
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
