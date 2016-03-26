var base_url = 'http://feedscrapper.allovertop.com/api/v1'
angular.module('feedscrapper.services', [])
.factory('Websites', function ($http) {
  return {
    get: function () {
      return $http.get(base_url + '/websites.json')
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
      return $http.get(base_url + '/websites/'+webid+'.json')
    }
  }
})

.factory('Category', function ($http) {
  return {
    get: function (category_id,page,items) {
      return $http.get(base_url + '/categories/'+category_id+'.json?page='+page+'&items='+items)
    }
  }
})

.factory('Content', function ($http) {
  return {
    get: function (content_id) {
      return $http.get(base_url + '/contents/'+content_id+'.json')
    }
  }
})