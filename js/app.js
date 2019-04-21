$(document).ready(function () {
    var imPremium = false;
    showInterstitial = true;
    showBanner = true;

    if (typeof inAppBuys != "undefined") {
        if (inAppBuys.productId == "com.poketgcoinflip.noads") {
            imPremium = true;
            $('.adremove').remove();
        }
    }

    var userLang = navigator.language || navigator.userLanguage;
    var isSpanish = false;
    var isSpinning = false;
    var amountHeads = 0,
        amountTails = 0;
    if (userLang.split('-')[0] == "es") {
        isSpanish = true;
    }

    var resultHeads = "Head";
    var resultTails = "Tail";

    var spanish = {
        tails: "Cruz",
        head: "Cara",
        removeAds: "Eliminar Publicidad",
        moreApps: "Más Apps",
        tableHeads: "Caras",
        tableTails: "Cruces",
        touchInfo: "Tocá la Moneda para Empezar",
        start: "Empezar"
    }

    if (isSpanish) {
        $('.adremove > .translate').text(spanish.removeAds);
        $('.moreapps > .translate').text(spanish.moreApps);
        $('.status > p').text(spanish.touchInfo);
        $('.status > h1').text(spanish.start);
        $('.headsInfo').text(spanish.tableHeads);
        $('.tailsInfo').text(spanish.tableTails);
        resultHeads = spanish.head;
        resultTails = spanish.tails;
    }

    $('.adremove').on('click', function () {
        inAppPurchase
            .buy('com.poketgcoinflip.noads')
            .then(function (data) {
                console.log(data); //Enviar a latirus
                jsonData = JSON.parse(data.receipt);
                admob.banner.hide('ca-app-pub-7257837165893054/5537287318');
            })
            .catch(function (err) {
                console.log(err);
            });
    });

    $('.moreapps').on('click', function () {
        window.open("http://latirus.com/api/apps", '_blank', 'location=no');
    });

    $('.flipCoin').on('click', function () {
        flipCoin();
    });

    function flipCoin() {
        if (isSpinning) return;
        playAudio('/android_asset/www/audio/coin.wav');
        var flipResult = Math.random();
        $('#coin').removeClass();
        $('.status > h1').html('<div class="loader"></div>');
        isSpinning = true;
        setTimeout(function () {
            if (flipResult <= 0.5) {
                $('#coin').addClass('heads');
                amountHeads++;
                setTimeout(function () {
                    $('.status > h1').html(resultHeads);
                    $('#amountHeads').text(amountHeads);
                    isSpinning = false;
                    if ((amountHeads + amountTails) % 10 == 0) {
                        if (!(imPremium)) {
                            showInterstitial = true;
                        }
                    }
                }, 1500);
            } else {
                $('#coin').addClass('tails');
                amountTails++;
                setTimeout(function () {
                    $('.status > h1').html(resultTails);
                    $('#amountTails').text(amountTails);
                    isSpinning = false;
                    if ((amountHeads + amountTails) % 10 == 0) {
                        if (!(imPremium)) {
                            showInterstitial = true;
                        }
                    }
                }, 1500);
            }
        }, 100);
    }
});