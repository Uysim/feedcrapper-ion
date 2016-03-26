// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('feedscrapper', ['ionic', 'feedscrapper.controllers','feedscrapper.services','feedscrapper.directives'])

.run(function($ionicPlatform) {
  var admobid = {};
  if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
      admobid = {
        banner: 'ca-app-pub-2927668463677743/1972305310',
        interstitial: 'ca-app-pub-2927668463677743/3449038510'
      };
  } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
      admobid = {
        banner: '', // or DFP format "/6253334/dfp_example_ad"
        interstitial: ''
      };
  } else { // for windows phone
      admobid = {
        banner: '', // or DFP format "/6253334/dfp_example_ad"
        interstitial: ''
      };
  }

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // console.log('***************************')
    // console.log(window.cordova.plugins.AdMob);
    // if(window.cordova && window.cordova.plugins.AdMob){
    //   window.cordova.plugins.AdMob.createBanner( {
    //   adId: admobid.banner,
    //   position: AdMob.AD_POSITION.BOTTOM_CENTER,
    //   autoShow: true });
    // }
    if (window.AdMob) {
      AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        autoShow: true,
        isTesting: true
      });
      window.AdMob.createBanner( {
        adId: admobid.banner,
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        autoShow: true,
        // remove on production
        isTesting: true
      });
    };
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  // $ionicConfigProvider.scrolling.jsScrolling(false);

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    controllerAs: 'vm'
  })

  .state('app.websites', {
    url: '/websites/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.content', {
    url: '/contents/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/content.html',
        controller: 'ContentCtrl'
      }
    }
  })
  .state('app.categories', {
    url: '/categories/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/category.html',
        controller: 'CategoriesCtrl'
      }
    }
  })
  .state('app.aboutus', {
    url: '/aboutus',
    views: {
      'menuContent': {
        templateUrl: 'templates/aboutus.html'
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/websites/1');
});
