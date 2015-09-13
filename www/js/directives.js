angular.module('feedscrapper.directives', [])
.directive('webList', function () {
  function renderTemplate (argument) {
    var codeLines = [
      '<a ng-click="homePageWebsite(categories)" menu-close><div class="item item-divider">Home</div></a>',
      '<ion-item collection-repeat="category in categories" menu-close ng-href="#/app/categories/{{category.id}}">{{category.name}}</ion-item>'
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
      '<div class="card">',
        '<div class="item item-divider"><strong>{{ngModel.name}}</strong></div>',
        '<a ng-repeat="content in contents track by $index" class="item item-thumbnail-left" href="#/app/contents/{{content.id}}">',
          '<img src="{{content.thumnail}}">',
          '<h2>{{content.name}}</h2>',
          '<p>{{content.text}}</p>',
        '</a>',
        '<ion-item ng-href="#/app/categories/{{ngModel.id}}">Read More</ion-item>',
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
      Category.get($scope.ngModel.id,0,2).then(function (res) {
        $scope.contents = res.data.contents
      },
      function (err) {
        alert(err.data)
      })
    },
    template: renderTemplate
  };
})