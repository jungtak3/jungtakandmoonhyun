
(function(){
  "use strict";
  var LANG = (document.documentElement.lang || "ko").slice(0, 2);
  var T = {
    ko: {
      copied:    "링크를 복사했습니다",
      copyFail:  "복사하지 못했습니다",
      addrDone:  "주소를 복사했습니다",
      dday:      "예식까지 {n}일 남았습니다",
      ddayToday: "오늘입니다",
      share:     "주정탁 ♥ 장문현의 결혼식에 초대합니다. 2027년 3월 1일 월요일 낮 12시 30분, 메종 드 아나하.",
      shareTitle:"주정탁 ♥ 장문현"
    },
    en: {
      copied:    "Link copied",
      copyFail:  "Could not copy",
      addrDone:  "Address copied",
      dday:      "{n} days to go",
      ddayToday: "Today",
      share:     "Joo Jungtak and Jang Moonhyun are getting married. Monday 1 March 2027, 12:30 PM, Maison de Anaha, Seoul.",
      shareTitle:"Joo Jungtak ♥ Jang Moonhyun"
    }
  };
  var S = T[LANG] || T.ko;
  var toastEl = document.getElementById("toast");
  var toastTimer;
  function toast(msg){
    toastEl.textContent = msg;
    toastEl.classList.add("on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ toastEl.classList.remove("on"); }, 2000);
  }

  function legacyCopy(value, done){
    var ta = document.createElement("textarea");
    ta.value = value;
    ta.setAttribute("readonly","");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); }
    catch(e){ toast(S.copyFail); }
    document.body.removeChild(ta);
  }
  function copyText(value, done){
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(value).then(done).catch(function(){ legacyCopy(value, done); });
    } else {
      legacyCopy(value, done);
    }
  }


  /* 지도 열기: 설치된 앱이 있으면 앱으로, 없으면 웹 지도로 */
  var VENUE = "메종 드 아나하";
  var LAT = "37.5042815", LNG = "127.0415425";
  var NAVER_WEB = "https://map.naver.com/p/search/" + encodeURIComponent(VENUE + " 언주로 517");
  var KAKAO_WEB = "https://map.kakao.com/link/map/" + encodeURIComponent(VENUE) + "," + LAT + "," + LNG;

  var mapBtn = document.getElementById("open-map");
  if (mapBtn){
    mapBtn.addEventListener("click", function(){
      var ua = navigator.userAgent;
      var isIOS = /iPhone|iPad|iPod/i.test(ua);
      var isAndroid = /Android/i.test(ua);
      var left = false;

      function goWeb(){ if (!left){ left = true; window.open(NAVER_WEB, "_blank", "noopener"); } }

      if (!isIOS && !isAndroid){ goWeb(); return; }

      /* leaving the page = the app took over; staying = fall back to the next target */
      function onHide(){ if (document.hidden) left = true; }
      document.addEventListener("visibilitychange", onHide);
      window.addEventListener("pagehide", onHide);

      function cleanup(){
        document.removeEventListener("visibilitychange", onHide);
        window.removeEventListener("pagehide", onHide);
      }

      /* 네이버지도 app first */
      var naverApp = "nmap://place?lat=" + LAT + "&lng=" + LNG
                   + "&name=" + encodeURIComponent(VENUE) + "&appname=jungtakandmoonhyun.com";
      location.href = naverApp;

      setTimeout(function(){
        if (left){ cleanup(); return; }
        /* 네이버 app absent -> try 카카오 app */
        var kakaoApp = isIOS
          ? "kakaomap://look?p=" + LAT + "," + LNG
          : "kakaomap://open?p=" + LAT + "," + LNG + "&n=" + encodeURIComponent(VENUE);
        location.href = kakaoApp;

        setTimeout(function(){
          cleanup();
          if (!left) location.href = NAVER_WEB;
        }, 750);
      }, 750);
    });
  }

  /* 주소 복사 */
  var addrBtn = document.getElementById("addr-copy");
  if (addrBtn){
    addrBtn.addEventListener("click", function(){
      copyText("서울특별시 강남구 언주로 517", function(){ toast(S.addrDone); });
    });
  }

  /* D-day */
  var ddayEl = document.getElementById("dday");
  var WED = new Date(2027, 2, 1);
  function dday(){
    if (!ddayEl) return;
    var now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var days = Math.round((WED - today) / 86400000);
    if (days > 0) ddayEl.textContent = S.dday.replace("{n}", days);
    else if (days === 0) ddayEl.textContent = S.ddayToday;
    else ddayEl.textContent = "";
  }
  dday();

  /* 지도는 프레임이 로드되면 확대에서 안정된다 */
  var gmap = document.querySelector(".gmap");
  if (gmap){
    var settleMap = function(){ gmap.classList.add("loaded"); };
    gmap.addEventListener("load", settleMap);
    /* some webviews fire load before the listener attaches */
    setTimeout(settleMap, 1800);
  }

  /* 공유 */
  var shareText = S.share;
  var shareUrl = location.href.split("#")[0];

  var sn = document.getElementById("share-native");
  if (sn) sn.addEventListener("click", function(){
    if (navigator.share){
      navigator.share({title:S.shareTitle, text:shareText, url:shareUrl}).catch(function(){});
      return;
    }
    copyText(shareUrl, function(){ toast(S.copied); });
  });

  var sc = document.getElementById("share-copy");
  if (sc) sc.addEventListener("click", function(){
    copyText(shareUrl, function(){ toast(S.copied); });
  });
})();
