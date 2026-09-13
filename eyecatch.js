(function () {
  'use strict';

  // HTML ファイル名（.html なし）→ 画像ファイル名（.jpg なし）のマップ
  // ツボ系は HTML に長い suffix が付くが画像名は短い
  var HREF_TO_IMG = {
    'tsubo-katakori-onkatsu':      'tsubo-katakori',
    'tsubo-mukumi-saninkou':       'tsubo-mukumi',
    'tsubo-jiritsushinkei-hyakue': 'tsubo-jiritsushinkei',
    'tsubo-seiritsuu-kekkai':      'tsubo-seiritsuu',
    'tsubo-ichou-ashisanri':       'tsubo-ichou',
    'tsubo-zutsuu-goukoku':        'tsubo-zutsuu',
    'tsubo-koshitsuu-jinyu':       'tsubo-koshitsuu',
    'tsubo-hie-taikei':            'tsubo-hie',
    'tsubo-pms-taisho':            'tsubo-pms',
    'tsubo-shitsumin-shimendou':   'tsubo-shitsumin',
    'tsubo-hadaare-shikyu':        'tsubo-hadaare',
    'tsubo-binyo-chukan':          'tsubo-binyo',
    'tsubo-kafun-geika':           'tsubo-kafun',
    'tsubo-me-dougan':             'tsubo-me',
    'tsubo-mensetsu-neiguan':      'tsubo-mensetsu',
    'tsubo-kodachi-yusen':         'tsubo-kodachi',
    'tsubo-ketsueki-katsurin':     'tsubo-ketsueki',
    'tsubo-seiri-taitsuu':         'tsubo-seiri',
    'tsubo-miken-yintang':         'tsubo-miken',
  };

  function getImgName(base) {
    return HREF_TO_IMG[base] || base;
  }

  /* ================================================
     column.html — カードに画像サムネイルを注入
     ================================================ */
  var cards = document.querySelectorAll('.col-card');
  if (cards.length) {
    cards.forEach(function (card) {
      var href = card.getAttribute('href') || '';
      var base = href.replace(/\.html$/, '').replace(/.*\//, '');
      var imgName = getImgName(base);
      var imgPath = 'images/column/' + imgName + '.jpg';

      // 既存の子要素を .col-card-body でラップ
      var body = document.createElement('div');
      body.className = 'col-card-body';
      while (card.firstChild) { body.appendChild(card.firstChild); }

      // カテゴリ・タイトルを取得（body 移動後）
      var catEl2 = body.querySelector('.cat');
      var h3El2  = body.querySelector('h3');
      var catTxt = catEl2 ? catEl2.textContent.replace(/✦/g, '').trim() : '';
      var h3Txt  = h3El2  ? h3El2.textContent.trim() : '';
      var dispT  = h3Txt.length > 38 ? h3Txt.slice(0, 37) + '…' : h3Txt;
      function esc2(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }

      // サムネイル div を生成
      var thumb = document.createElement('div');
      thumb.className = 'col-card-thumb';
      var img = document.createElement('img');
      img.src = imgPath;
      img.alt = h3Txt;
      img.loading = 'lazy';
      img.decoding = 'async';
      img.onerror = function () { thumb.style.display = 'none'; };
      thumb.appendChild(img);

      // テキストオーバーレイ（グラデーション帯）
      var tov = document.createElement('div');
      tov.className = 'col-thumb-overlay';
      tov.innerHTML =
        (catTxt ? '<span class="col-thumb-tag">' + esc2(catTxt) + '</span>' : '') +
        '<p class="col-thumb-title">' + esc2(dispT) + '</p>';
      thumb.appendChild(tov);

      card.prepend(thumb);
      card.appendChild(body);
      card.classList.add('has-thumb');
    });
    return;
  }

  /* ================================================
     記事ページ — og:image からアイキャッチを注入
     ================================================ */
  var ogImg = document.querySelector('meta[property="og:image"]');
  var articleHero = document.querySelector('.article-hero');
  if (!ogImg || !articleHero) return;

  var fullUrl = ogImg.getAttribute('content') || '';
  var imgPath = fullUrl.replace(/^https?:\/\/[^/]+\//, '');
  if (!imgPath || imgPath.indexOf('images/column/') === -1) return;

  var h1El    = document.querySelector('.article-hero h1');
  var catEl   = document.querySelector('.article-hero .cat');
  var rawTitle = h1El ? h1El.textContent.trim() : '';
  var catText  = catEl ? catEl.textContent.replace(/✦/g, '').trim() : '';
  var dispTitle = rawTitle.length > 46 ? rawTitle.slice(0, 45) + '…' : rawTitle;

  function esc(s) { return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }

  var eyecatch = document.createElement('div');
  eyecatch.className = 'article-eyecatch';
  eyecatch.innerHTML =
    '<img class="eyecatch-img" src="' + esc(imgPath) + '" alt="' + esc(rawTitle) + '" loading="lazy" decoding="async">' +
    '<div class="eyecatch-overlay">' +
    (catText ? '<span class="eyecatch-tag">' + esc(catText) + '</span>' : '') +
    '<p class="eyecatch-title">' + esc(dispTitle) + '</p>' +
    '</div>';

  articleHero.insertAdjacentElement('afterend', eyecatch);
})();
