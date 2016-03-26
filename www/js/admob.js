angular.module('feedscrapper.services')
.factory('AdMob', function () {
  if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
  } else {
    initApp();
  }

  function initApp() {
    initAd();
    console.log('view display');
    // window.plugins.AdMob.createInterstitialView();
  }

  function initAd(){

    if ( window.plugins && window.plugins.AdMob ) {
      var ad_units = {
        ios : {
          banner: '',
          interstitial: ''
        },
        android : {
          banner: 'ca-app-pub-2927668463677743/1972305310',
          interstitial: 'ca-app-pub-2927668463677743/3449038510'
        },
        wp8 : {
          banner: '',
          interstitial: ''
        }
      };

      var admobid;
      if( /(android)/i.test(navigator.userAgent) ) {
        admobid = ad_units.android;
      } else if(/(iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = ad_units.ios;
      } else {
        admobid = ad_units.wp8;
      }
      window.plugins.AdMob.setOptions( {
        publisherId: admobid.banner,
        interstitialAdId: admobid.interstitial,
        bannerAtTop: false, // set to true, to put banner at top
        overlap: true, // set to true, to allow banner overlap webview
        offsetTopBar: false, // set to true to avoid ios7 status bar overlap
        isTesting: false, // receiving test ad
        autoShow: true // auto show interstitial ad when loaded
      });
      window.plugins.AdMob.createBannerView();
      registerAdEvents();

    } else {
      // alert( 'admob plugin not ready' );
    }
  }

  function registerAdEvents() {
    document.addEventListener('onReceiveAd', function(){});
    document.addEventListener('onFailedToReceiveAd', function(data){});
    document.addEventListener('onPresentAd', function(){});
    document.addEventListener('onDismissAd', function(){ });
    document.addEventListener('onLeaveToAd', function(){ });
    document.addEventListener('onReceiveInterstitialAd', function(){ });
    document.addEventListener('onPresentInterstitialAd', function(){ });
    document.addEventListener('onDismissInterstitialAd', function(){ });
  }

  return {
    init: initApp
  }
})
