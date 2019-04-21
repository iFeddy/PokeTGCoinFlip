var showInterstitial = false;
var showBanner = false;
var inAppBuys;

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  StatusBar.backgroundColorByHexString("#c34931");

  window.open = cordova.InAppBrowser.open;
  
  admob.setDevMode(false);

  inAppPurchase
  .getProducts(['com.poketgcoinflip.noads'])
  .then(function (products) {
    inAppPurchase.restorePurchases().then(function(obj){
      if(obj.length == 0){
        showBannerAD();
        showInterAD();        
      }else{
        inAppBuys = obj[0];
      }
    });
  });

}

function showInterAD() {
  setTimeout(function () {
    if (showInterstitial) {
      admob.interstitial.load({
        id: {
          // replace with your ad unit IDs
          android: 'ca-app-pub-7257837165893054/4156880741',
          ios: 'ca-app-pub-7257837165893054/4156880741',
        },
      }).then(() => admob.interstitial.show());
      showInterstitial = false;
    }
    showInterAD();
  }, 1000);
}

function showBannerAD(){
  setTimeout(function () {
    if (showBanner) {
      admob.banner.show({
        id: {
          // replace with your ad unit IDs
          android: 'ca-app-pub-7257837165893054/5537287318',
          ios: 'ca-app-pub-7257837165893054/5537287318',
        },
      });
      showBanner = false;
    }
    showBannerAD();
  }, 1000);
}