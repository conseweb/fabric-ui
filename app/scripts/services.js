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
    signup: API_ROOT + '/signup'
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
    }
  };
};

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
      return JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
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

      return deferred.promise;
    },

    set: function (u) {
      var deferred = $q.defer();

      for (var k in u) {
        store.user[k] = u[k];
      }

      store._saveToLocalStorage(store.user);
      
      deferred.resolve(store.user);

      return deferred.promise;
    }
  }

  return store;
}


angular
  .module('inspinia')
  .factory('api', APIService)
  .factory('user', UserService)