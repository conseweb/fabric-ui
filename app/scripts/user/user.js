/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * UserCtrl - controller
 */

// const API_ROOT = (process.env.NODE_ENV === 'production') ? '/api' : 'http://192.168.5.105:9375/api';
const API_ROOT = 'http://192.168.5.105:9375/api';

export default UserCtrl = function ($scope, $http) {

  $scope.nickname = '';
  $scope.email = '';
  $scope.phone = '';
  $scope.signType = '';
  $scope.password = '';
  $scope.captcha = '';
  $scope.login = function () {
    console.log('login func');
    console.log('email', $scope.email);
    $http.post(API_ROOT + '/account/login', {email: $scope.email, password: $scope.password, type: 'email'})
      .then(function (resp) {
      console.log('login', resp);
      $scope.id = response.id;
    }, function (resp) {
      console.log('login failed', resp.error);
    });
    return false;
  };
  $scope.logout = function () {
    $http.delete(API_ROOT + '/account/logout');
  };

};
