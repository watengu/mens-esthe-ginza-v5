$(document).ready(function () {

  /**
   * -------------------
   * スクロールが100に達したらボタン表示
   * -------------------
   */
  var showFlag = false;
  var topBtn = $('#pagetop');
  topBtn.css('opacity', '0');
  var showFlag = false;
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      if (showFlag == false) {
        showFlag = true;
        topBtn.stop().animate({ 'opacity': '1' }, 500);
      }
    } else {
      if (showFlag) {
        showFlag = false;
        topBtn.stop().animate({ 'opacity': '0' }, 500);
      }
    }
  });

  /**
 * -------------------
 * スクロールしてトップ
 * -------------------
 */
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });
  $('a[href*="#top"]').click(function () {
    $('html,body').animate({
      scrollTop: 0
    }, 400);
    return false;
  });

/**
* -------------------
* プロフィール画像切り替え
* -------------------
*/
  $('#profile_img_thumb div img').click(function () {
    var imgs = $(this).attr('src');
    $('#profile_img_big >img').fadeOut("normal", function () {
      $('#profile_img_big >img').attr("src", imgs);
      $('#profile_img_big >img').fadeIn();
    });
    return false;
  });

  // 自動切り替え
  $(function () {
    var imgNum = 3;
    var imgSize = 800;
    var time = 1000;
    var current = 0;

    setInterval(function () {
      if (current < imgNum - 1) {
        current++;
        $("#profile_img_thumb p img").animate({
          marginLeft: parseInt($("#profile_img_thumb p img").css("margin-left")) - imgSize + "px"
        }, "fast");
      } else {
        $("#profile_img_thumb p img").animate({
          marginLeft: parseInt($("#profile_img_thumb p img").css("margin-left")) + (imgSize * (imgNum - 1)) + "px"
        }, "fast");
        current = 0;
      }
    }, time);
  });

/**
* -------------------
* 特大スライド
* -------------------
*/

  if ($(".bigbanner-slider").length && $(".bigbanner-slider .swiper-slide").length > 1) {
    swiper = new Swiper('.bigbanner-slider', {
      loop: true,
      effect: "fade",
      autoplay: {
        delay: 2300,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination-bigbanner',
        clickable: true,
        type: 'bullets',
        dynamicBullets: true,
      },
      speed: 2300,
    });
  }


/**
* -------------------
* TOPスライド
* -------------------
*/
if ($(".topslide").length && $(".topslide .swiper-slide").length > 1) {
  var swiper = new Swiper('.topslide', {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true
    },
    pagination: {
      el: '.swiper-pagination',
      //clickable: true,
      type: 'bullets',
      dynamicBullets: true,
    },
    breakpoints: {
      1200: {
        slidesPerView: 2,
        spaceBetween: 10,
      }
    }
  });
}

/**
* -------------------
* 写メスライド
* -------------------
*/
if ($(".diarySlide").length && $(".diarySlide .swiper-slide").length > 1) {
  var swiper = new Swiper('.diarySlide .swiper-container', {
    slidesPerView: 2.5,
    spaceBetween: 10,
    speed: 900,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 3.5,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 4.5,
        spaceBetween: 10,
      }
    }
  });
}

/**
* -------------------
* ギャラリースライド (Swiper 8 + lightGallery)
* -------------------
*/
$(window).on("load", function () {
  if ($(".galleryslide").length && $(".galleryslide .swiper-slide").length > 0) {
    const $caption = $(".gallery_inner .caption");
    const $title = $(".gallery_inner .title");
    const slideCount = $(".galleryslide .swiper-slide").not(".swiper-slide-duplicate").length;

    function updateCaption(swiper) {
      const $currentSlide = $(swiper.slides[swiper.activeIndex]);
      const captionText = $currentSlide.find("a[data-caption]").data("caption") || "";
      $caption.html(captionText);
    }

    function updateTitle(swiper) {
      const $currentSlide = $(swiper.slides[swiper.activeIndex]);
      const titleText = $currentSlide.find("a[data-title]").data("title") || "";
      $title.html(titleText);
    }

    const swiperOptions = {
      loop: slideCount > 1,
      slidesPerView: slideCount > 1 ? 1.5 : 1,
      centeredSlides: true,
      autoplay: slideCount > 1 ? {
        delay: 3000,
        disableOnInteraction: true
      } : false,
      on: {
        init: function () {
          updateCaption(this);
          updateTitle(this);
        },
        slideChange: function () {
          updateCaption(this);
          updateTitle(this);
        },
      },
      breakpoints: {
        769: slideCount > 1
            ? { slidesPerView: 2.0 }
            : { slidesPerView: 1.5 },
        1200: slideCount > 1
            ? {
                slidesPerView: 2.0,
                coverflowEffect: {
                    rotate: 10, depth: 250, stretch: 15,
                    modifier: 1, scale: 1, slideShadows: false,
                },
              }
            : { slidesPerView: 1.5 },
      },
    };

    if (slideCount > 1) {
      swiperOptions.effect = "coverflow";
      swiperOptions.coverflowEffect = {
        rotate: 10, depth: 250, stretch: 15,
        modifier: 1, scale: 1, slideShadows: false,
      };
      swiperOptions.pagination = {
        el: ".swiper-pagination-insta",
        type: "bullets",
        dynamicBullets: true,
      };
    }

    const swiper = new Swiper(".galleryslide", swiperOptions);

    const lgItems = [];
    $(".galleryslide .swiper-slide").not(".swiper-slide-duplicate").each(function () {
      const $link = $(this).find("a");
      lgItems.push({
        src: $link.attr("href"),
        thumb: $link.find("img").attr("src") || $link.attr("href"),
        subHtml: `<h4>${$link.data("title") || ""}</h4><p>${$link.data("caption") || ""}</p>`
      });
    });

    const lg = lightGallery(document.querySelector(".galleryslide"), {
      subHtmlSelectorRelative: true,
      dynamic: true,
      dynamicEl: lgItems,
      speed: 500,
      download: false,
      counter: true,
      loop: true,
      controls: false,
      plugins: [lgThumbnail],
      thumbnail: true,
      animateThumb: true,
      currentPagerPosition: 'middle',
      thumbWidth: 80,
      thumbHeight: '60px',
      swipeThreshold: 50,
      enableSwipe: true,
      enableDrag: true,
      mobileSettings: {
        showCloseIcon: true,
        download: false,
        rotate: false,
        enableSwipe: true,
        swipeThreshold: 50,
      },
    });

    // ===== ここから追加 =====
function syncThumbPosition(index) {
  setTimeout(() => {
    const thumbItems = document.querySelectorAll('.lg-thumb-item');
    const thumbOuter = document.querySelector('.lg-thumb-outer');
    const thumbInner = document.querySelector('.lg-thumb');

    if (!thumbInner || !thumbItems.length) return;

    // アクティブクラスの付け替え
    thumbItems.forEach((item, i) => {
      item.classList.remove('active');
      if (i === index) item.classList.add('active');
    });

    // 各アイテムの実際の幅＋marginで計算
    const itemWidth = 80 + 5; // thumbWidth + marginRight
    const thumbOuterWidth = thumbOuter.offsetWidth;
    const targetPos = index * itemWidth;

    // アクティブを中央に
    const newPos = -(targetPos - (thumbOuterWidth / 2) + (itemWidth / 2));
    const minPos = -(thumbInner.offsetWidth - thumbOuterWidth);
    const clampedPos = Math.min(0, Math.max(minPos, newPos));

    thumbInner.style.transition = 'transform 0.3s ease';
    thumbInner.style.transform = `translate3d(${clampedPos}px, 0px, 0px)`;
  }, 100);
}

    lg.outer.on('lgAfterOpen', function() {
      const currentIndex = lg.index || 0;
      syncThumbPosition(currentIndex);
    });

    lg.outer.on('lgAfterSlide', function(e, prevIndex, index) {
      syncThumbPosition(index);
    });
    // ===== ここまで追加 =====

    $(".galleryslide").on("click", ".swiper-slide a", function (e) {
      e.preventDefault();

      const clickedHref = $(this).attr("href");
      const index = lgItems.findIndex(item => item.src === clickedHref);

      if (index !== -1) {
        lg.openGallery(index);
        // 開いた後に補正を走らせる
        setTimeout(() => syncThumbPosition(index), 300);
      }
    });
  }
});


  /*フルサイズ画像*/
  $(function () {
    var slideOffset = 0;
    if($('.fullImg').length) slideOffset = 750;
  
    var $body = $('body'),
      $navTypeA = $('.nav--typeA'),
      navTypeAOffsetTop = $navTypeA.offset().top + slideOffset;
  
    $(window).on('scroll', function () {
      if ($(this).scrollTop() > navTypeAOffsetTop) {
        $body.addClass('is-fixed');
      } else {
        $body.removeClass('is-fixed');
      }
    });
  });

  $(function () {

    /**
    * ----------------
    * スクロールが20に達したらボタン表示
    * ----------------
    */
    var showFlag = false;
    var topBtn = $('#following');
    topBtn.css('bottom', '-150px');
    var showFlag = false;
    $(window).scroll(function () {
      if ($(this).scrollTop() > 20) {
        if (showFlag == false) {
          showFlag = true;
          topBtn.stop().animate({ 'bottom': '0' }, 200);
        }
      } else {
        if (showFlag) {
          showFlag = false;
          topBtn.stop().animate({ 'bottom': '-150px' }, 200);
        }
      }
    });

      /**
  * ----------------
  * スクロールしてトップ
  * ----------------
  */
  $('a[href^="#top"]').click(function () {
    $('body,  html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });

});

});

/**
* -------------------
* 新人スライド番号
* -------------------
*/
$(window).on("load", function () {
  function formatNumber(num, length = 2) {
    return num >= 10 ? String(num) : String(num).padStart(length, '0');
  }

  $('.js-slide_num').each(function () {
    let num = $(this).text().trim();
    if (!isNaN(num)) $(this).text(formatNumber(Number(num)));
  });

  /**
  * -------------------
  * 新人スライド
  * -------------------
  */
  if ($(".topNewface_list").length) {
    const originalSlideCount = $(".topNewface_list .swiper-slide").length;

    // スタイル調整
    if (originalSlideCount < 4) {
      // ★ Swiper8は .swiper-container → .swiper に変更
      $('.topNewface .newface_inner .swiper .swiper-wrapper').css('justify-content', 'flex-start');
    }

    // スライドが3枚以下ならループ用に複製
    if (originalSlideCount <= 3 && originalSlideCount > 1) {
      const $swiperWrapper = $(".topNewface_list .swiper-wrapper");
      for (let i = 0; i < originalSlideCount; i++) {
        const clonedSlide = $(`.topNewface_list .swiper-slide:eq(${i})`).clone();
        $swiperWrapper.append(clonedSlide);
      }
    }

    // ★ Swiper8はquerySelectorの対象クラスも .swiper に統一
    const swiperWrapper = document.querySelector(".topNewface_list .swiper-wrapper");
    const lastSwiperSlide = document.querySelector(".topNewface_list .swiper-slide:last-of-type");

    const swiper = new Swiper('.topNewface_list', {
      loop: originalSlideCount > 1,
      slidesPerView: 'auto',
      centeredSlides: false,
      spaceBetween: 30,
      slidesOffsetAfter: originalSlideCount > 1
        ? swiperWrapper.clientWidth - lastSwiperSlide.clientWidth
        : 0,
      autoplay: originalSlideCount > 1 ? {
        delay: 3000,
        disableOnInteraction: true,
      } : false,

      pagination: {
        el: ".swiper-pagination-number",
        type: "fraction",
        formatFractionCurrent: function (number) {
          const adjustedNumber = originalSlideCount <= 3
            ? ((number - 1) % originalSlideCount) + 1
            : number;
          return formatNumber(adjustedNumber);
        },
        formatFractionTotal: function () {
          return formatNumber(originalSlideCount);
        },
      },

      on: {
        init: function () {
          $('.newface_info_inner .c-panel__profile').removeClass('active');
          const profileIndex = originalSlideCount <= 3
            ? this.realIndex % originalSlideCount
            : this.realIndex;
          $('.newface_info_inner .c-panel__profile').eq(profileIndex).addClass('active');
        },
        // ★ Swiper8は slideChangeTransitionEnd → slideChangeTransitionEnd は同じだが
        //    realIndexの取得方法が変わるため this.realIndex で統一
        slideChangeTransitionEnd: function () {
          $('.newface_info_inner .c-panel__profile').removeClass('active');
          const profileIndex = originalSlideCount <= 3
            ? this.realIndex % originalSlideCount
            : this.realIndex;
          $('.newface_info_inner .c-panel__profile').eq(profileIndex).addClass('active');
        },
      },
    });
  }
});

/**
 * ----------
 * ピックアップスライド
 * ----------
 */
$(window).on("load", function () {
  const slideCount = $(".js-pickupSlide .pickup_inner .swiper-slide").length;

  if (slideCount === 1) {
    $('.pickup_frame .swiper-button-prev').addClass('nondisplay');
    $('.pickup_frame .swiper-button-next').addClass('nondisplay');
  }

  // ★ Swiper8は options を var/let/const で宣言
  const options = slideCount > 1
    ? {
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        speed: 700,
        autoplay: {
          delay: 3000,
          disableOnInteraction: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      }
    : {
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        loop: false,
      };

  new Swiper('.js-pickupSlide .pickup_inner', options);

  // スライダー初期化後にトリガー位置を再計算（リロード時の表示ズレ対策）
  if (window.ScrollTrigger) {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }
});

$(document).ready(function () {
  /**
  * -------------------
  * バリデート
  * -------------------
  */
  if ($("#reserveForm").length) {
    $("#reserveForm").validationEngine('attach', { autoPositionUpdate: true, autoHidePrompt: true, autoHideDelay: "8000" });
  }
});


/**
* -------------------
* グローバルメニューヘッダー固定
* -------------------
*/
$(function () {

  var navPos = $('#js_nav_fixed').offset().top;
  var navHeight = $('#js_nav_fixed').outerHeight();
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > navPos) {
      $('body').css('padding-top', navHeight);
      $('#js_nav_fixed').addClass('m_fixed');
    } else {
      $('body').css('padding-top', 0);
      $('#js_nav_fixed').removeClass('m_fixed');
    }
  });

});

/**
* -------------------
* メニュー切り替え
* -------------------
*/
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("#h_menu"); // メニュー全体
  const button = document.querySelector("#h_menu_btn"); // トリガーボタン
  const overlay = document.querySelector("#h_menu_overlay"); // オーバーレイ

  // 初期設定
  gsap.set(menu, {
    clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", // メニューを非表示状態に
  });

  // メニューを開く・閉じる関数
  const openMenu = () => {
    // メニューを開くアニメーション
    gsap.to(menu, {
      clipPath: "polygon(-50% 0%, 110% 0%, 100% 100%, 0% 100%)",
      duration: 1.3,
      ease: "power1.inOut",
    });

    // クラスを追加
    button.classList.add("active");
    menu.classList.add("active");
    overlay.classList.add("active");
    // iOS Safari対策: #container の overflow-x を展開中だけ解除(fixedメニューが footer/追従フッターに潜る対策)
    document.body.classList.add("is-menuOpen");

    // メニューアイテムのアニメーション
    const menuItems = document.querySelectorAll("#h_menu.active #h_menu_list li");
    gsap.set(menuItems, {
      y: "50%",
      opacity: 0,
    });

    menuItems.forEach((item, index) => {
      gsap.to(item, {
        y: 10,
        opacity: 1,
        delay: 0.1 * index,
        duration: 0.6,
        ease: "power1.out",
      });
    });
  };

  const closeMenu = () => {
    // メニューアイテムを閉じるアニメーション
    const menuItems = document.querySelectorAll("#h_menu.active #h_menu_list li");
    const timeline = gsap.timeline();
    timeline.to(menuItems, {
      y: "100%",
      opacity: 0,
      duration: 0.25,
      ease: "power1.in",
    });

    // メニューを閉じるアニメーション
    timeline.to(menu, {
      clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      duration: 1,
      ease: "power2.inOut",
    });

    // クラスを削除（アニメーション終了後に実行）
    timeline.add(() => {
      button.classList.remove("active");
      menu.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("is-menuOpen");
    });
  };

  // ボタンのクリックイベント
  button.addEventListener("click", () => {
    if (!button.classList.contains("active")) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // オーバーレイのクリックイベント
  overlay.addEventListener("click", () => {
    if (button.classList.contains("active")) {
      closeMenu();
    }
  });
});

//ローディングアニメーション
// ヘッドライン（流れ文字）- 各liをリレー形式で独立スクロール
let tickerReady = false;
function getTickerProgressRatio(ticker) {
  const prevPositions = ticker._positions;
  const prevTotalLoopWidth = ticker._totalLoopWidth;
  const prevContainerWidth = ticker._containerWidth;

  if (!prevPositions || !prevPositions.length || !prevTotalLoopWidth) return 0;

  let shift = prevContainerWidth - prevPositions[0];
  shift = ((shift % prevTotalLoopWidth) + prevTotalLoopWidth) % prevTotalLoopWidth;
  return shift / prevTotalLoopWidth;
}

function initTicker(options = {}) {
  const ticker = document.querySelector("#ticker");
  if (!ticker) return;
  const preserveProgress = Boolean(options.preserveProgress);
  const progressRatio = preserveProgress ? getTickerProgressRatio(ticker) : 0;

  const ul = ticker.querySelector("ul");
  const items = ul.querySelectorAll("li");
  if (!items.length) return;

  gsap.killTweensOf(items);
  if (ticker._rafId) {
    cancelAnimationFrame(ticker._rafId);
    ticker._rafId = null;
  }
  if (ticker._io) ticker._io.disconnect();
  if (ticker._visibilityHandler) {
    document.removeEventListener("visibilitychange", ticker._visibilityHandler);
  }

  // ★ 非表示にしてから幅計測
  gsap.set(items, { visibility: "hidden", position: "static", x: 0 });

  const containerWidth = ticker.clientWidth;
  const isMobile = window.innerWidth <= 768;
  const speed = isMobile ? 40 : 60;
  const gap = 80;

  const itemWidths = Array.from(items).map(item => item.offsetWidth);
  const totalLoopWidth = itemWidths.reduce((sum, w) => sum + w + gap, 0);

  // ★ 初期位置を確定させてからabsolute＆表示
  const positions = itemWidths.map((_, index) => {
    return containerWidth + itemWidths
      .slice(0, index)
      .reduce((sum, w) => sum + w + gap, 0);
  });

  if (preserveProgress && totalLoopWidth > 0) {
    const shift = progressRatio * totalLoopWidth;
    positions.forEach((_, index) => {
      positions[index] -= shift;
      while (positions[index] < -itemWidths[index]) {
        positions[index] += totalLoopWidth;
      }
    });
  }

  items.forEach((item, index) => {
    gsap.set(item, {
      position: "absolute",
      top: 0,
      x: positions[index],
      visibility: "visible", // ★ 位置確定後に表示
    });
  });

  // lastTimeを「前フレームの時刻」として初期化しないことで初回deltaを0にする
  let lastTime = null;

  function tick(timestamp) {
    if (lastTime === null) {
      lastTime = timestamp; // 初回はdeltaを0として処理
    }
    const delta = Math.min((timestamp - lastTime) / 1000, 0.05); // ★ 最大50msでクランプ（タブ非アクティブ対策）
    lastTime = timestamp;

    items.forEach((item, index) => {
      positions[index] -= speed * delta;

      if (positions[index] < -itemWidths[index]) {
        positions[index] += totalLoopWidth;
      }

      gsap.set(item, { x: positions[index] });
    });

    ticker._rafId = requestAnimationFrame(tick);
  }

  ticker._positions = positions;
  ticker._totalLoopWidth = totalLoopWidth;
  ticker._containerWidth = containerWidth;

  function startTicker() {
    if (ticker._rafId || document.hidden) return;
    ticker._rafId = requestAnimationFrame(tick);
  }

  function stopTicker() {
    if (!ticker._rafId) return;
    cancelAnimationFrame(ticker._rafId);
    ticker._rafId = null;
  }

  ticker._visibilityHandler = () => {
    if (document.hidden) {
      stopTicker();
    } else {
      startTicker();
    }
  };
  document.addEventListener("visibilitychange", ticker._visibilityHandler, { passive: true });

  if ("IntersectionObserver" in window) {
    ticker._io = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (entry.isIntersecting) {
        startTicker();
      } else {
        stopTicker();
      }
    });
    ticker._io.observe(ticker);
  } else {
    startTicker();
  }
}

// リサイズ（debounce付き・二重呼び出し防止）
let resizeTimer;
window.addEventListener("resize", () => {
  if (!tickerReady) return;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => initTicker({ preserveProgress: true }), 300);
});

//GSAPコンテンツアニメーション
window.addEventListener("DOMContentLoaded", async () => {
  gsap.registerPlugin(ScrollTrigger);
  const stagger = 0.05;
  const mm = gsap.matchMedia();//画面サイズ

  // スクロール復元（リロード/戻る）対策
  // ※ load / pageshow / scroll は loader の fadeOut を await する前に登録する。
  //    await 後に登録すると待機中に発火したイベントを取り逃し、再計算が効かないため。
  // リロード・戻る時のみ積極的に「表示域内の要素」を強制表示する（通常遷移の演出は維持）。
  const navEntry = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0]) || null;
  const legacyNavType = (performance.navigation && performance.navigation.type);
  const isRestoreNav =
    (!!navEntry && (navEntry.type === "reload" || navEntry.type === "back_forward")) ||
    legacyNavType === 1 /* reload */ || legacyNavType === 2 /* back_forward */;

  // 開始位置(top 100%)を通過＝表示域内/上方にある timeline系トリガーを完了状態へ
  const revealInViewTriggers = () => {
    if (!window.ScrollTrigger) return;
    ScrollTrigger.getAll().forEach((st) => {
      const el = st && st.trigger;
      if (!el || typeof el.getBoundingClientRect !== "function") return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        if (st.animation) st.animation.progress(1); // .js-box等のcreate系はrefreshのonRefreshで表示
      }
    });
  };

  const refreshScrollAnimations = () => {
    if (!window.ScrollTrigger) return;
    const run = () => {
      ScrollTrigger.refresh();           // create系(.js-box)は onRefresh で表示
      if (isRestoreNav) revealInViewTriggers();
    };
    requestAnimationFrame(run);
    setTimeout(run, 120);
    setTimeout(run, 400);
    setTimeout(run, 1000);
  };
  window.addEventListener("load", refreshScrollAnimations);
  window.addEventListener("pageshow", refreshScrollAnimations);
  // スクロール復元はload後に起きることがあるため、復元ナビ時は最初のscrollでも再評価
  if (isRestoreNav) {
    window.addEventListener("scroll", refreshScrollAnimations, { once: true, passive: true });
  }

  // ローディング要素の存在確認
  const loader = document.getElementById("loader");

// ローディング中はtickerを非表示
  const tickerUl = document.querySelector("#ticker ul");
  if (tickerUl) {
    gsap.set(tickerUl, { visibility: "hidden" });
  }

  if (loader) {
    await new Promise(resolve => {
      $("#loader").fadeOut("slow", function () {
        ScrollTrigger.refresh();
        resolve();
      });
    });
    //await fadeComplete;
  }

  // ★ fadeOut完了後に無条件でinitTicker（readyState分岐を削除）
  tickerReady = true;
  initTicker();

  // ローダー消化後にも一度再計算（即時）
  refreshScrollAnimations();

  //コンセプト（PC）
  mm.add("(min-width: 769px)", () => {
  gsap.utils.toArray("#concept").forEach((el) => {
    const q = gsap.utils.selector(el);
    gsap.timeline({
        scrollTrigger: {
          trigger: el,
          // trigger: '#concept',
          //start: "top<-=200%",
          start: 'top 100%',
          end: 'bottom 50%',
          toggleActions: "play none none none", //一回だけの時最後をnoneにする
          once: true,
          //markers: true,
          //fastScrollEnd: true,
        },
      })
      .fromTo(
        el,
        {
          x: "-100%", // 左からスライドイン
        },
        {
          x: "0%", // 最終位置
          duration: 1.2,
          ease: "power3.out",
        },
        //"-=0.1",
        //"<",
      )
      .fromTo(
        // 縦書きタイトル
        q(".tatekaki_title"),
        {
          y: "120%",
        },
        {
          y: "0%",
          duration: 0.75,
          delay: 0.01,
          stagger,
          ease: "power3.out",
        },
        "-=0.65",
        //"<",
      )
      .fromTo(
        q("#concept h4"),
        {
          alpha: 0,
        },
        {
          alpha: 1,
          duration: 0.3,
          //delay: 0.01,
          stagger,
        },
        //"<",
        "-=0.45",
      )
      .fromTo(
        q("#concept p"),
        {
          alpha: 0,
          y: 32,
        },
        {
          alpha: 1,
          y: 0,
          duration: 0.75,
          //delay: 0.01,
          stagger,
          ease: "power3.out",
        },
        "-=0.45",
        //"<",
      );
  });
});

//コンセプト（SP）
mm.add("(max-width: 768px)", () => {
  gsap.utils.toArray("#concept").forEach((el) => {
    const q = gsap.utils.selector(el);
    gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 100%",
          end: "bottom 50%",
          toggleActions: "play none none none",
          once: true,
          //markers: true,
        },
      })
      .fromTo(
        el,
        {
          x: "-100%", // 左からスライドイン
        },
        {
          x: "0%", // 最終位置
          duration: 1.2,
          ease: "power3.out",
        }
      )
      .fromTo(
        // 縦書きタイトル
        q(".tatekaki_title"),
        {
          alpha: 0,
        },
        {
          alpha: 1,
          duration: 1,
          //delay: 0.05,
          stagger,
          ease: "power3.out",
        },
        "-=0.65",
      )
      .fromTo(
        q("#concept h4"),
        {
          y: "30%",
          alpha: 0,
        },
        {
          y: "0%",
          alpha: 1,
          duration: 0.3,
          //delay: 0.2,
          //delay: 0.15,
          stagger,
        },
        //"<",
        "-=0.45",
      )
      .fromTo(
        q("#concept p"),
        {
          alpha: 0,
          y: 32,
          },
        {
          alpha: 1,
          y: 0,
          duration: 0.75,
          //delay: 0.3,
          //delay: 0.2,
          stagger,
          ease: "power3.out",
        },
        //"<",
        "-=0.45",
      );
  });
});

//出勤
gsap.utils.toArray("#topschedule").forEach((el) => {
    const q = gsap.utils.selector(el);
    gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          //start: "top<-=60%",
          start: 'top 100%',
          end: 'bottom 50%',
          toggleActions: "play none none none",
          once: true,
          //markers: true,
        },
      })
      .fromTo(
        //日付の帯
        q(".today"),
        {
          x: "-100%",
        },
        {
          x: "0%",
          duration: 0.1,
          stagger,
          ease: "power3.inout",
        },
      )
      .fromTo(
        q(".today p, .today span"),
        {
          alpha: 0,
          y: 32,
          force3D: false,
        },
        {
          alpha: 1,
          y: 0,
          duration: 0.6,
          delay: 0.1,
          stagger,
          ease: "power3.out",
        },
      )
      .fromTo(
        q(".c-panel"),
        {
          alpha: 0,
          y: 32,
        },
        {
          alpha: 1,
          y: 0,
          duration: 1,
          //delay: 0.3,
          ease: "power3.out",
          stagger: {
            each: .15,// amount: 1 // 処理する個数 / amountの値
            from: "start"
          }
        },
      );
});


//コンテンツをふわっと
gsap.utils.toArray(".js-box:not(.pickupSlides)").forEach((el) => {
  const reveal = () => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 2.5,
      ease: "power4.out",
      overwrite: "auto",
    });
  };

  gsap.set(el, { opacity: 0, y: 24 });

  ScrollTrigger.create({
    trigger: el,
    start: "top 100%",
    end: "bottom 50%",
    once: true,
    onEnter: reveal,
    onRefresh: (self) => {
      // リロード時に開始位置を通過済みなら即表示
      const rect = el.getBoundingClientRect();
      const passedStart = rect.top <= window.innerHeight;
      if (self.progress > 0 || self.isActive || passedStart) {
        gsap.set(el, { opacity: 1, y: 0 });
        self.kill(false);
      }
    },
    //markers: true,
  });
});

//ピックアップは個別制御
gsap.utils.toArray(".pickupSlides").forEach((el) => {
  let revealed = false;
  const reveal = () => {
    if (revealed) return;
    revealed = true;
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 2.5,
      ease: "power4.out",
      overwrite: "auto",
    });
  };

  gsap.set(el, { opacity: 0, y: 24 });

  ScrollTrigger.create({
    trigger: el,
    start: "top 100%",
    end: "bottom 50%",
    once: true,
    onEnter: reveal,
    onRefresh: () => {
      const rect = el.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      if (isInView) {
        revealed = true;
        gsap.set(el, { opacity: 1, y: 0 });
      }
    },
    //markers: true,
  });
});

//ランキング
gsap.utils.toArray("#top_ranking .ranking_box_inner").forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    y: 24,
    duration: 2.5,
    ease: "power4.out",
    // スクロールトリガーの設定
    scrollTrigger: {
      trigger: el, // 対象物
      start: "top center",
      toggleActions: "play none none none",
      once: true,
      //markers: true,
    },
  });
});

//パネル
gsap.utils.toArray("#girls_inner").forEach((el) => {
  const panels = el.querySelectorAll(".c-panel");
  if (!panels.length) return;

  gsap.set(panels, { opacity: 0, y: 32 });

  ScrollTrigger.batch(panels, {
    start: "top 92%",
    once: true,
    interval: 0.08,
    batchMax: 8,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        delay: 0.12,
        ease: "power3.out",
        overwrite: "auto",
        stagger: {
          each: 0.15,
          from: "start",
        },
      });
    },
    //markers: true,
  });
});

//料金表
gsap.utils.toArray("#system_inner").forEach((el) => {
  const q = gsap.utils.selector(el);
  gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        //start: "top<-=110%",
        start: "top 100%",
        end: "bottom 50%",
        toggleActions: "play none none none",
        once: true,
        //markers: true,
      },
    })
    .fromTo(
      q(".articleWrap"),
      {
        alpha: 0,
        y: 32,
      },
      {
        alpha: 1,
        y: 0,
        duration: 1,
        delay: 0.1,
        ease: "power3.out",
        stagger: {
          each: .15,// amount: 1 // 処理する個数 / amountの値
          from: "start"
        }
      },
    );
});

//リンク
gsap.utils.toArray(".banner_area").forEach((el) => {
  const q = gsap.utils.selector(el);
  gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 100%',
        end: 'bottom 50%',
        toggleActions: "play none none none",
        once: true,
        //markers: true,
      },
    })
    .fromTo(
      q("ul li"),
      {
        alpha: 0,
        y: 32,
      },
      {
        alpha: 1,
        y: 0,
        duration: 1,
        delay: 0.1,
        ease: "power3.out",
        stagger: {
          each: .15,// amount: 1 // 処理する個数 / amountの値
          from: "start"
        }
      },
    );
});

//ニュース、ピックアップ
gsap.utils.toArray("#topnews,.pickup_frame,#topevent, .news_frame, .campaign_frame").forEach((el) => {
  const q = gsap.utils.selector(el);
  const targets = q(".news_border");
  if (!targets.length) return;

  const reveal = () => {
    gsap.to(targets, {
      alpha: 1,
      y: 0,
      duration: 1,
      delay: 0.1,
      ease: "power3.out",
      overwrite: "auto",
      stagger: {
        each: .15,// amount: 1 // 処理する個数 / amountの値
        from: "start"
      }
    });
  };

  gsap.set(targets, {
    alpha: 0,
    y: 32,
  });

  ScrollTrigger.create({
    trigger: el,
    start: "top 100%",
    end: "bottom 50%",
    once: true,
    onEnter: reveal,
    onRefresh: (self) => {
      // リロードで既に開始位置を通過している場合は即表示にする
      if (self.progress > 0 || self.isActive) {
        gsap.set(targets, { alpha: 1, y: 0 });
        self.kill(false);
      }
    },
    //markers: true,
  });
});

//イベント
gsap.utils.toArray("#topevent").forEach((el) => {
  const q = gsap.utils.selector(el);
  gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 100%",
        end: "bottom 50%",
        toggleActions: "play none none none",
        once: true,
        //markers: true,
      },
    })
    .fromTo(
      q(".topevent_in"),
      {
        alpha: 0,
        y: 32,
      },
      {
        alpha: 1,
        y: 0,
        duration: 1,
        delay: 0.1,
        ease: "power3.out",
        stagger: {
          each: .15,// amount: 1 // 処理する個数 / amountの値
          from: "start"
        }
      },
    );
});


//新人スライダー
gsap.utils.toArray(".topNewface").forEach((el) => {
  const q = gsap.utils.selector(el);
  gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 100%",
        end: "bottom 50%",
        toggleActions: "play none none none", //一回だけの時最後をnoneにする
        once: true,
        //markers: true,
      },
    })
    .fromTo(
      el,
      {
        x: "100%", // 左からスライドイン
      },
      {
        x: "0%", // 最終位置
        duration: 1.2,
        ease: "power3.out",
      }
    )
    .fromTo(
      // 新人
      q(".newface_info"),
      {
        alpha: 0,
        y: 32,
      },
      {
        alpha: 1,
        y: 0,
        duration: 0.75,
        delay: 0.1,
        stagger,
        ease: "power3.out",
      },
      "-=0.45",
    )
    .fromTo(
      q(".newface_inner"),
      {
        alpha: 0,
        y: 32,
      },
      {
        alpha: 1,
        y: 0,
        duration: 0.75,
        delay: 0.1,
        stagger,
        ease: "power3.out",
      },
      //"<",
      "-=0.45",
    );
  });

  // 全スクロールアニメーション生成後にも再計算。
  // load イベントが生成前に発火していた場合でも、ここで #topschedule 等の
  // トリガー位置を確定させ、リロードで既に表示域内にある場合も確実に発火させる。
  refreshScrollAnimations();
});


$(function () {
  var $body = $('body'),
    $navTypeA = $('.nav--typeA'),
    navTypeAOffsetTop = $navTypeA.offset().top;

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > navTypeAOffsetTop) {
      $body.addClass('is-fixed');
    } else {
      $body.removeClass('is-fixed');
    }
  });
});


/**
* -------------------
* ハンバーガーメニュー現在地を表示する
* -------------------
*/
$(function () {
  var currentPath = window.location.pathname;
  
  // 特殊パスマッピング
  var pathMapping = {
    '/profile': '/girl',
    '/ndetail': '/newslist',
    '/edetail': '/campaign',
    '/diarySingle': '/diary'
  };
  
  // パスから言語部分を除去
  function stripLang(path) {
    return path.replace(/^\/lang\/[^\/]+/, '') || '/';
  }
  
  // TOPページ判定
  function isTopPage(path) {
    var stripped = stripLang(path);
    return ['/', '/top', '/index.html', '/top.html'].includes(stripped) || 
           stripped.endsWith('/') && stripped.split('/').length <= 2;
  }
  
  // 特殊パス判定
  function getTargetPath(path) {
    var stripped = stripLang(path);
    for (var source in pathMapping) {
      if (stripped.startsWith(source) || stripped.startsWith(pathMapping[source])) {
        return pathMapping[source];
      }
    }
    return null;
  }
  
  var specialPath = getTargetPath(currentPath);
  
  $('#h_menu_list li a').not('[href*="#"]').each(function() {
  var linkHost = new URL(this.href).host;
  var currentHost = window.location.host;

  // 外部リンクは除外
  if (linkHost !== currentHost) {
    return; // 何もしない
  }

  var linkPath = new URL(this.href).pathname.replace(/\/$/, '');
  var isTopLink = linkPath.includes('/top') || linkPath === '';
  var $li = $(this).parent();

  if (isTopLink && isTopPage(currentPath)) {
    $li.addClass('active');
  } else if (specialPath && stripLang(linkPath) === specialPath) {
    $li.addClass('active');
  } else if (!isTopLink && !specialPath && 
             (currentPath === linkPath || 
              (linkPath && currentPath.startsWith(linkPath)))) {
    $li.addClass('active');
  } else {
    $li.removeClass('active');
  }
  });
});

/**
* -------------------
* pagetopは下まで行くと消える
* -------------------
*/
$(window).scroll(function () {
  var check = window.pageYOffset; //現在のスクロール位置を取得
  var docHeight = $(document).height(); //ページ全体の高さを取得
  var dispHeight = $(window).height(); //表示されている高さを取得

  hsize = $('footer').height();//フッターの高さを取得

  if (check > docHeight - dispHeight - hsize + 90) {
    $('.pagetop').addClass('active');
  } else {
    $('.pagetop').removeClass('active');
  }
});

/**
* -------------------
* ルーム切り替え
* -------------------
*/
$(function () {
  if ($(".js-mixit").length) {
    var containerEl = document.querySelector('.js-mixit');
    var mixer = mixitup(containerEl);
  }
});


/**
* -------------------
* selectdayに応じたスクロール
* -------------------
*/
$(function () {

  var $btns = $("#day_btns");
  var $selectDay = getParam('day');

  if ($selectDay >= 4) {
    $sc = 100 * ($selectDay - 3);
    var x = $btns.scrollLeft($sc);
  }

  function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
});

/**
* --------------
* Twitter遅延
* --------------
*/
$(function () {
  const settw = document.querySelector(".js-setTwitterOp");
  if (settw) {
    const setUser = settw.dataset.set_user;
    const setLang = settw.dataset.set_lang ? 'data-lang="' + settw.dataset.set_lang + '"' : '';
    const setHeight = settw.dataset.set_height ? ' data-height="' + settw.dataset.set_height + '"' : '';
    const setWidth = settw.dataset.set_width ? ' data-width="' + settw.dataset.set_width + '"' : '';
    const setTheme = settw.dataset.set_theme ? ' data-theme="' + settw.dataset.set_theme + '"' : '';
    const setOp = setLang + setHeight + setWidth + setTheme;

    const twHTML = '<a class="twitter-timeline" ' + setOp + ' href="https://twitter.com/' + setUser + '?ref_src=twsrc%5Etfw">Tweets by ' + setUser + '</a>';

    const twJs = document.createElement('script');
    twJs.src = "https://platform.twitter.com/widgets.js";
    twJs.charset = "utf-8";

    const tw = document.querySelector(".js-loadTwitter");

    let loaded = false;


    const loadTarget = document.querySelector(".js-setTwitter");
    const loadOption = {
      root: null,
      rootMargin: "0px",
      threshold: 0
    };
    const targets = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!loaded) {
            tw.insertAdjacentHTML("beforebegin", twHTML);
            tw.appendChild(twJs);
            loaded = true;
          }
        }
      });
    };
    const loadObserver = new IntersectionObserver(targets, loadOption);
    loadObserver.observe(loadTarget);
    //}
  };
});

/**
 * ----------------
 * 言語メニュー / Google翻訳 レイアウト
 * ----------------
 */
$(function () {
  var $area = $('.js-langArea');
  if (!$area.length) return;

  var hasLang = String($area.data('lang-menu')) === '1';
  var hasGoogle = String($area.data('google')) === '1';
  var $google = $area.find('.js-languageData');
  var $hamburger = $('#h_menu_list');
  var spMax = 1200;

  if (!hasGoogle || !$google.length) return;

  // style.css が is-both / is-googleOnly 前提のため状態クラスを付与
  $area.addClass(hasLang ? 'is-both' : 'is-googleOnly');

  // google翻訳のみ: 自作言語メニューが無く havelan が付かずボタンが重なるため付与
  if (!hasLang) {
    $('#h_menu_btn, h1').addClass('havelan');
    return; // google翻訳のみは移動不要(CSSだけで対応)
  }

  // 両方(is-both)のみ: SPではGoogle翻訳をハンバーガー展開メニュー(#h_menu_list)の先頭へ移動
  // 復帰用マーカー(Google翻訳の元位置)
  var $home = $('<span class="js-googleHome" style="display:none;"></span>');
  $google.before($home);

  function isSp() {
    return window.innerWidth <= spMax;
  }

  var current = '';
  function layoutLangTools() {
    var next = isSp() ? 'sp' : 'pc';
    if (next === current) return;
    current = next;

    if (next === 'sp' && $hamburger.length) {
      // SP: ハンバーガー展開メニュー内 先頭へ(#h_menu.active のときだけ見える)
      $hamburger.prepend($google.addClass('is-inMenu'));
    } else {
      // PC / ハンバーガー無しページ(ゲート等)は元位置(.js-langArea内)へ戻す
      $google.removeClass('is-inMenu');
      if (!$home.next().is($google)) {
        $home.after($google);
      }
    }
  }

  layoutLangTools();

  var resizeTimer;
  $(window).on('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layoutLangTools, 100);
  });
});

/**
 * ----------------
 * インバウンド 言語切り替えボタン 
 * ----------------
 */
$(function () {
  $langBtn = $('.js-language .btn');

  if ($langBtn.length) {
    $('h1').addClass('havelan');
    $('#h_menu_btn').addClass('havelan');
    $langArea = $('.js-language .btn, .js-language .list');
    langList = '.js-language .list';
    selected = 'selected';
    over_flg = false;

    $langBtn.click(function () {
      $(this).toggleClass(selected).next(langList).slideToggle('fast');
    });

    // マウスカーソルがメニュー上/メニュー外
    $langArea.hover(function () {
      over_flg = true;
    }, function () {
      over_flg = false;
    });

    // メニュー領域外をクリックしたらメニューを閉じる
    $('body').click(function () {
      if (over_flg == false) {
        $langBtn.removeClass(selected);
        $(langList).slideUp('fast');
      }
    });
  };
});

// モーダル表示
$(document).ready(function () {
  // モーダルを開く処理
  $('.open-modal').on('click', function (e) {
    e.preventDefault(); // デフォルトのリンク動作を無効化
    var target = $(this).data('target'); // data-targetの値を取得
    $(target).fadeIn(); // 対象のモーダルを表示
    $('#overlay').fadeIn(); // 背景のオーバーレイを表示
  });

  // モーダルを閉じる処理
  $('.modal, #overlay').on('click', function (e) {
    e.preventDefault(); // デフォルト動作を無効化
    $('.modal').fadeOut(); // すべてのモーダルを非表示
    $('#overlay').fadeOut(); // 背景のオーバーレイを非表示
  });
});


//本日出勤のmoreボタンの判定
$(document).ready(function() {
  if ($('#waiting').length > 0) {
      $('#topschedule .and_more').css('display', 'none');
  }
});

//プロフィール出勤のh3
$(document).ready(function () {
  const $profTable = $(".prof_table");
  const $profTableH3 = $("h3.prof_table_h3");
  const $profileDataList = $(".profile_data_list");

  if ($profTable.length > 0) {
    const hasNondisplay = $profTable.find("tr").hasClass("nondisplay");

    if (hasNondisplay) {
      $profTableH3.addClass("nondisplay");
      $profileDataList.css("margin-bottom", "0");
    }
  }
});


//スマホのアニメーション対策
$(function() {
  const width = $(window).width();
  var $touch = $("#enter");

  if (width <= 1200) {
    $touch.click(function(event) {
      event.preventDefault();

      const $this = $(this);
      $touch.addClass('active');

      // アニメーション完了後に元のリンク動作を実行
      setTimeout(function() {
        const targetUrl = $this.find('a').attr('href');
        console.log(targetUrl);

        // href が undefined でない場合に遷移
        if (targetUrl) {
          window.location.href = targetUrl;
        }
      }, 700);
    });

    $(".news_border").click(function(event) {
      event.preventDefault(); // デフォルトのリンク動作を防ぐ

      const $this = $(this); // .news_border (aタグ)自体
      $this.addClass('active');

      // アニメーション完了後に元のリンク動作を実行
      setTimeout(function() {
        // .news_border は既に a タグなので href を直接取得
        const targetUrl = $this.attr('href');

        console.log(targetUrl);

        if (targetUrl) {
          window.location.href = targetUrl;
        }
      }, 700); // アニメーションの時間
    });
  }
});


// レスポンシブ動画: 非表示側の動画ブロックのみ DOM から外し、読み込みを止める
(function () {
  var VIDEO_SELECTOR = '.video_bg, video[data-responsive-video="1"]';
  var VIDEO_BLOCK_SELECTOR = '.video_corner .big-video[data-type="pc"], .video_corner .big-video[data-type="sp"]';

  function isPcViewport() {
    return window.matchMedia('(min-width: 1200px)').matches;
  }

  var responsiveBlockStore = new Map();
  var responsiveBlockStoreId = 0;

  window.pruneInactiveDataTypeBlocks = function (isPC) {
    responsiveBlockStore.forEach(function (entry, key) {
      var shouldShow = (entry.dtype === 'pc') ? isPC : !isPC;
      if (!shouldShow || !entry.placeholder || !entry.placeholder.parentNode) {
        return;
      }
      var block = document.createElement('div');
      block.className = entry.className;
      block.setAttribute('data-type', entry.dtype);
      block.innerHTML = entry.html;
      entry.placeholder.parentNode.replaceChild(block, entry.placeholder);
      responsiveBlockStore.delete(key);
    });

    document.querySelectorAll(VIDEO_BLOCK_SELECTOR).forEach(function (block) {
      var dtype = block.getAttribute('data-type');
      var shouldShow = (dtype === 'pc') ? isPC : !isPC;
      if (shouldShow) {
        return;
      }
      if (block.innerHTML.replace(/\s/g, '') === '') {
        block.remove();
        return;
      }
      var placeholder = document.createElement('span');
      placeholder.hidden = true;
      placeholder.setAttribute('data-responsive-placeholder', '1');
      var storeKey = 'rb' + (++responsiveBlockStoreId);
      responsiveBlockStore.set(storeKey, {
        html: block.innerHTML,
        dtype: dtype,
        className: block.className,
        placeholder: placeholder
      });
      block.parentNode.replaceChild(placeholder, block);
    });

    document.querySelectorAll('.video_corner').forEach(function (corner) {
      if (corner.querySelector('.big-video, video[data-responsive-video="1"]')) {
        return;
      }
      if (corner.textContent.replace(/\s/g, '') === '') {
        corner.remove();
      }
    });
  };

  function parentDataType(video) {
    var el = video.closest('[data-type]');
    return el ? el.getAttribute('data-type') : null;
  }

  function shouldActivateVideo(video) {
    if (video.closest('.banner-common')) {
      return true;
    }
    var target = video.getAttribute('data-target');
    if (target === '3') {
      return true;
    }
    if (target === '1') {
      return isPcViewport();
    }
    if (target === '2') {
      return !isPcViewport();
    }
    var dtype = parentDataType(video);
    if (dtype === 'pc') {
      return isPcViewport();
    }
    if (dtype === 'sp') {
      return !isPcViewport();
    }
    return true;
  }

  function getPendingVideoSrc(video) {
    return video.getAttribute('src') || video.dataset.srcHold || video.getAttribute('data-src') || '';
  }

  function suspendVideo(video) {
    if (video.dataset.responsiveActive === '0') {
      return;
    }
    var src = getPendingVideoSrc(video);
    if (src && !video.dataset.srcHold) {
      video.dataset.srcHold = src;
    }
    video.removeAttribute('src');
    video.removeAttribute('data-src');
    video.preload = 'none';
    video.autoplay = false;
    video.pause();
    try {
      video.load();
    } catch (e) {}
    video.dataset.responsiveActive = '0';
  }

  function playSpBigVideoPreview(video) {
    video.muted = true;
    var seekAndPlay = function () {
      try {
        video.currentTime = 0.02;
      } catch (e) {}
      var playPromise = video.play();
      if (playPromise && typeof playPromise.then === 'function') {
        playPromise.then(function () {
          setTimeout(function () {
            video.pause();
            try {
              video.currentTime = 0.02;
            } catch (e) {}
          }, 20);
        }).catch(function () {});
      }
    };
    if (video.readyState >= 1) {
      seekAndPlay();
    } else {
      video.addEventListener('loadeddata', seekAndPlay, { once: true });
    }
  }

  function startVideoPlayback(video) {
    if (!isPcViewport() && video.closest('.big-video') && !video.closest('.banner-common') && !video.classList.contains('video_bg')) {
      playSpBigVideoPreview(video);
      return;
    }
    if (video.hasAttribute('autoplay') || video.classList.contains('video_bg')) {
      video.muted = true;
      var playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {});
      }
    }
  }

  function activateVideo(video) {
    if (video.dataset.responsiveActive === '1') {
      return;
    }
    var url = video.dataset.srcHold || video.getAttribute('data-src');
    if (!url) {
      return;
    }
    if (!video.getAttribute('src')) {
      video.setAttribute('src', url);
    }
    video.preload = 'metadata';
    video.dataset.responsiveActive = '1';
    startVideoPlayback(video);
  }

  var bgMediaStore = new Map();
  var bgMediaStoreId = 0;

  window.pruneInactiveBgMedia = function (isPC) {
    bgMediaStore.forEach(function (entry, key) {
      var shouldShow = (entry.target === '1') ? isPC : !isPC;
      if (!shouldShow || !entry.placeholder || !entry.placeholder.parentNode) {
        return;
      }
      var el = document.createElement(entry.tagName);
      entry.attrs.forEach(function (pair) {
        el.setAttribute(pair.name, pair.value);
      });
      entry.placeholder.parentNode.replaceChild(el, entry.placeholder);
      bgMediaStore.delete(key);
    });

    document.querySelectorAll('video.video_bg[data-target], img.fix_bg[data-target]').forEach(function (el) {
      var target = el.getAttribute('data-target');
      if (target !== '1' && target !== '2') {
        return;
      }
      var shouldShow = (target === '1') ? isPC : !isPC;
      if (shouldShow) {
        return;
      }
      if (el.tagName === 'VIDEO') {
        suspendVideo(el);
      }
      var placeholder = document.createElement('span');
      placeholder.hidden = true;
      placeholder.setAttribute('data-responsive-bg-placeholder', target);
      var storeKey = 'bg' + (++bgMediaStoreId);
      var attrs = [];
      for (var i = 0; i < el.attributes.length; i++) {
        var attr = el.attributes[i];
        attrs.push({ name: attr.name, value: attr.value });
      }
      bgMediaStore.set(storeKey, {
        tagName: el.tagName,
        attrs: attrs,
        target: target,
        placeholder: placeholder
      });
      el.parentNode.replaceChild(placeholder, el);
    });
  };

  window.updateResponsiveVideos = function () {
    document.querySelectorAll(VIDEO_SELECTOR).forEach(function (video) {
      if (shouldActivateVideo(video)) {
        activateVideo(video);
      } else {
        suspendVideo(video);
      }
    });
  };

  window.runResponsiveMediaControl = function () {
    var isPC = isPcViewport();
    window.pruneInactiveDataTypeBlocks(isPC);
    window.pruneInactiveBgMedia(isPC);
    window.updateResponsiveVideos();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.runResponsiveMediaControl);
  } else {
    window.runResponsiveMediaControl();
  }
})();

//画面サイズ取得
document.addEventListener('DOMContentLoaded', function() {
  function updateDisplay() {
    const isPC = window.matchMedia("(min-width: 1200px)").matches;
    const hasCommon_bg = document.querySelector('[data-target="3"]') !== null;

    if (hasCommon_bg) {
      $('[data-target="1"]').hide();
      $('[data-target="2"]').hide();
      $('[data-target="3"]').show();
    } else {
      $('[data-target="1"]').toggle(isPC);
      $('[data-target="2"]').toggle(!isPC);
      $('[data-target="3"]').hide();
    }

    if (typeof window.runResponsiveMediaControl === 'function') {
      window.runResponsiveMediaControl();
    }
  }

  updateDisplay();
  $(window).resize(updateDisplay);
});

//求人テーブル
$(document).ready(function () {
    // 各親要素のtbodyをループでチェック
    $("#recruit_inner table tbody").each(function () {
        var $tbody = $(this); // 現在のtbody要素

        if ($tbody.children().length === 0) { // tbodyが空かどうか確認
            $tbody.addClass("nondisplay"); // 空ならクラスを追加
        } else {
            $tbody.removeClass("nondisplay"); // 子要素があるならクラスを削除
        }
    });
});

//プロフィールの出勤テーブル
$(document).ready(function() {
    // 全ての .prof_table tbody td を取得
    var allCells = $(".prof_table tbody td");

    // 全てのセルが "-" の場合をチェック
    var allDash = allCells.length > 0 && allCells.filter(function() {
        return $(this).text().trim() !== "-";
    }).length === 0;

    if (allDash) {
        $(".prof_table, .prof_table_h3").addClass("nondisplay");
    } else {
        console.log("スケジュールがあります");
    }
});
