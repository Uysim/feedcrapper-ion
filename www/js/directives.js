angular.module('feedscrapper.directives', [])
.directive('webList', function () {
  function renderTemplate (argument) {
    var codeLines = [
      '<a ng-click="homePageWebsite(categories)" menu-close><div class="item item-divider">{{ngModel.name}}</div></a>',
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
      //TODO: change to WebTypes.get($scope.ngModel.id)
      $scope.homePageWebsite = function (categories) {
        Webcategories.get(1).then(function (res) {
          $scope.categories = res.data.categories;
        },
        function (err) {
          alert(err.data);
        });
        HomePage.set_categories(categories)
        // console.log(categories);
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
      '<div class="item item-divider">{{ngModel.name}}<a class="item-icon-right" ng-href="#/app/categories/{{ngModel.id}}"><i class="icon ion-drag"></i></a></div>',
      '<ion-item ng-repeat="content in contents track by $index" ng-href="#/app/contents/{{content.id}}">',
        '<h2>{{content.name}}</h2>',
        '<p>{{content.text}}</p>',
      '</ion-item>',
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
      Category.get(1).then(function (res) {
        $scope.contents = res.data.contents
      },
      function (err) {
        alert(err.data)
      })
    },
    template: renderTemplate
  };
})