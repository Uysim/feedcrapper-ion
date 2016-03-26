angular.module('feedscrapper.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, Websites) {

  $scope.website={
    id: 1
  }
})


.controller('HomeCtrl',function ($scope,$stateParams,$ionicSlideBoxDelegate,HomePage,Webcategories) {

  //TODO: Webcategories.get($stateParams.id)
  Webcategories.get($stateParams.id).then(function (res) {
    $scope.website = res.data;
    $ionicSlideBoxDelegate.update();
    $ionicSlideBoxDelegate.loop(true);
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

.controller('CategoriesCtrl', function ($scope,$stateParams,Category,$location) {
  //TODO: Category.get($stateParams.id)
  $scope.contents=[];
  page=0;

  $scope.is_continue=true;
  $scope.name=$location.search().name;
  $scope.loadMore=function () {
    if ($scope.is_continue) {
      Category.get($stateParams.id,page,5).then(
        function (res) {
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