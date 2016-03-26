angular.module('feedscrapper.directives', [])
.directive('webList', function () {
  function renderTemplate (argument) {
    var codeLines = [
      '<ion-item menu-close ng-href="#/app/websites/1" class="item-dark">Home</ion-item>',
      '<ion-item collection-repeat="category in categories" menu-close ng-href="#/app/categories/{{category.id}}?name={{category.name}}" class="item-dark">',
        '{{category.name}}',
      '</ion-item>'
    ]
    return codeLines.join("");
  }
  return {
    restrict: 'E',
    scope: {
      ngModel: "="
    },
    controller: function ($scope,$state,Webcategories,HomePage) {
      Webcategories.get($scope.ngModel.id).then(function (res) {
        $scope.categories = res.data.categories;
      },
      function (err) {
        alert(err.data);
      });
      $scope.homePageWebsite = function (categories) {
        $state.go('app.websites',{id: 1})
      }


    },
    template: renderTemplate
  };
})

.directive('catHomeList', function () {
  function renderTemplate () {
    var codeLines = [
      '<div class="list">',
        '<div class="item item-divider"><strong>{{ngModel.name}}</strong></div>',
        '<a ng-repeat="content in contents track by $index" class="item item-home" href="#/app/contents/{{content.id}}">',
          '<img ng-src="{{content.thumnail}}">',
          '<h2>{{content.name}}</h2>',
          '<p>{{content.created_at}}</p>',
        '</a>',
        '<a ng-href="#/app/categories/{{ngModel.id}}?name={{ngModel.name}}" class="item item-divider white-divider">Read More</a>',
      '</div>'
    ]
    return codeLines.join("");
  }
  return {
    restrict: 'E',
    scope: {
      ngModel: "="
    },
    controller: function ($scope,$state,Category) {
      //TODO: Category.get($scope.ngModel.id)
      Category.get($scope.ngModel.id,0,5).then(function (res) {
        $scope.contents = res.data.contents
      },
      function (err) {
        alert("Can not get category with id " + $scope.ngModel.id)
      })
    },
    template: renderTemplate
  };
})