angular.module('feedscrapper.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Websites) {

  Websites.get().success(function(data) {
        $scope.websites = data;
    })
    .error(function(err) {
        console.log(err);
    });
  // .then(function (res) {
  //   $scope.websites = res.data;
  // },
  // function (err) {
  //   alert(err.data);
  // });
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('HomeCtrl',function ($scope,$stateParams,HomePage,Webcategories) {
  $scope.categories = HomePage.get_categories();
  if ($scope.categories == undefined) {
    //TODO: Webcategories.get($stateParams.id)
    Webcategories.get($stateParams.id).then(function (res) {
      $scope.categories = res.data.categories;
    },
    function (err) {
      console.log(err);
    })
  };
})


.controller('ContentCtrl',function ($scope,$state,Content) {
  //TODO: Content.get($stateParams.id)
  Content.get(1).then(function (res) {
    $scope.content = res.data;
    console.log(res.data);  
  },
  function (err) {
    console.log(err);
  })
})

.controller('CategoriesCtrl', function ($scope,Category) {
  //TODO: Category.get($stateParams.id)
  Category.get(1).then(function (res) {
    $scope.contents = res.data.contents;
  },
  function (err) {
    console.log(err);
  })
})