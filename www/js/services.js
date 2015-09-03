angular.module('feedscrapper.services', [])
.factory('Websites', function ($http) {
  return {
    get: function () {
      return $http.get('http://128.199.65.71:3000/websites.json')
    }
  }
})
.factory('HomePage', function () {
  var catgories;
  return {
    get_categories: function () {
      return catgories;
    },
    set_categories: function (value) {
      catgories = value;
    }
  }
})
.factory('Webcategories', function ($http) {
  return {
    get: function (webid) {
      return $http.get('http://128.199.65.71:3000/websites/'+webid+'.json')
    }
  }
})

.factory('Category', function ($http) {
  return {
    get: function (category_id) {
      return $http.get('http://128.199.65.71:3000/categories/'+category_id+'.json?page=0&items=2')
    }
  }
})

.factory('Content', function ($http) {
  return {
    get: function (content_id) {
      return $http.get('http://128.199.65.71:3000/contents/'+content_id+'.json')
    }
  }
})