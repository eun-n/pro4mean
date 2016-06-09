angular.module('MusicCtrls', ['MusicServices'])
.controller('HomeCtrl', ['$scope', 'Music', function($scope, Music) {

  Music.query(function success(data) {
    $scope.musics = data;
  }, function error(data) {
    console.log(data);
  });

  $scope.deleteMusic = function(id, musicIdx) {
    Music.delete({id: id}, function success(data) {
      $scope.music.splice(musicIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  }
}])
.controller('ShowCtrl', ['$scope', '$stateParams', 'Music', function($scope, $stateParams, Music) {
  $scope.music = {};

  Music.get({id: $stateParams.id}, function success(data) {
    $scope.music = data;
  }, function error(data) {
    console.log(data);
  });
}])
.controller('NewCtrl', ['$scope', '$location', 'Music', function($scope, $location, Music) {
  $scope.music = {
    title: '',
    artist: '',
    album: '', 
    url: ''
  };

  $scope.createMusic = function() {
    Music.save($scope.music, function success(data) {
      $location.path('/');
    }, function error(data) {
      console.log(data);
    });
  }
}])
.controller('NavCtrl', ['$scope', 'Auth', '$state', 'Alerts', function($scope, Auth, $state, Alerts) {
  $scope.Auth = Auth;
  $scope.logout = function() {
    Auth.removeToken();
    Alerts.add('success', 'Logged out!');
    $state.reload();
  }
}])
.controller('SignupCtrl', ['$scope', '$http', '$location', 'Alerts', function($scope, $http, $location, Alerts) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success(res) {
      Alerts.add('success', 'Signed up in!');
      $location.path('/');
    }, function error(res) {
      Alerts.add('danger', 'Error. See console');
      console.log(res);
    });
  }
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', 'Alerts', function($scope, $http, $location, Auth, Alerts) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      Alerts.add('success', 'Logged in!');
      console.log('Token:', res.data.token);
      $location.path('/');
    }, function error(res) {
      Alerts.add('danger', 'Incorrect email/password');
      console.log(res);
    });
  }
}])
.controller('AlertCtrl', ['$scope', 'Alerts', function($scope, Alerts) {
  $scope.Alerts = Alerts;
}]);


