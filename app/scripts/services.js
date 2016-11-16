function APIService($http) {
  const API_ROOT = 'http://192.168.5.105:9375/api';
  const API_ROUTER = {
    login: API_ROOT + '/account/login',
    logout: API_ROOT + '/account/logout'
  };

  return {
    loginEmail: function (email, password) {
      return $http.post(API_ROUTER.login, {email: email, password: password, type: 'email'})
    },
    logout: function () {
      return $http.delete(API_ROUTER.logout)
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
      if (!store.user.id) {
        angular.copy(store._getFromLocalStorage(), store.user);        
      }

      return store.user;
    },

    set: function (u) {
      for (var k in u) {
        store.user[k] = u[k];
      }

      store._saveToLocalStorage(store.user);
    }
  }

  return store;
}


angular
  .module('inspinia')
  .factory('api', APIService)
  .factory('user', UserService)