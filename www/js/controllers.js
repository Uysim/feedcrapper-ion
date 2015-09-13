angular.module('feedscrapper.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, Websites) {

  $scope.website={
    id: 1
  }
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

  //TODO: Webcategories.get($stateParams.id)
  Webcategories.get($stateParams.id).then(function (res) {
    $scope.categories = res.data.categories;
  },
  function (err) {
    console.log(err);
  })
})

.controller('ContentCtrl',function ($scope,$stateParams,Content) {
  //TODO: Content.get($stateParams.id)
  Content.get($stateParams.id).then(function (res) {
    $scope.content = res.data;
  },
  function (err) {
    console.log(err);
  })
})

.controller('CategoriesCtrl', function ($scope,$stateParams,Category) {
  //TODO: Category.get($stateParams.id)
  $scope.contents=[];
  page=0;
  $scope.is_continue=true;
  $scope.loadMore=function () {
    if ($scope.is_continue) {
      Category.get($stateParams.id,page,10).then(
        function (res) {
          if(!$scope.name){
            $scope.name=res.data.name;
          };
          if (res.data.contents.length) {
            Array.prototype.push.apply($scope.contents, res.data.contents);
          }else{
            $scope.is_continue = false;
          };
        },
        function (err) {
          console.log(err);
        }
      ).finally(function () {
        page=page + 1;
        $scope.$broadcast("scroll.infiniteScrollComplete");
      })
    };
  }
})
.controller('CategoriesCtrl', function ($stateParams,$scope,Category) {
  //TODO: Category.get($stateParams.id)
  Category.get($stateParams.id,0,10).then(function (res) {
    $scope.contents = res.data.contents;
  },
  function (err) {
    console.log(err);
  })
})