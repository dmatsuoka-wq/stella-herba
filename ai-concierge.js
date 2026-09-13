/* ==========================================================
   MIE AI コンシェルジュ — Stella Herba
   フローティングチャットUI（全ページ共通）
   ========================================================== */
(function () {
  'use strict';

  var LINE_URL = 'https://line.me/R/ti/p/@999cqzjr';
  var ICON_SRC = '/mie-icon.png';

  /* ── 医療ガードレール ── */
  var MEDICAL_KEYS = [
    '薬', '服薬', '処方', '服用', '診断', '治療', '手術', '病気',
    '症状', 'クスリ', '飲み合わせ', '副作用', '受診', '病院', '医師',
    '医者', '薬局', '通院', 'がん', '癌', '腫瘍', '感染'
  ];
  var MEDICAL_ANSWER =
    'ご質問ありがとうございます。\n医療・薬・診断に関するご相談は、<strong>安全のため医師・薬剤師へのご相談</strong>をお願いしています🏥\nStella Herba は医療機関ではなく、よもぎ蒸し温活による補完的なケアを提供しています。\n体のお悩みはぜひLINEにてMIE本人にご相談ください。';

  /* ── ナレッジベース ── */
  var KB = [
    {
      keys: ['持ち物', '服装', '何を持', '準備', '着替え', '何着', 'タオル'],
      a: '特別な持ち物は不要です！\nサロンでは<strong>施術用のゆったりしたお召し物</strong>をご用意しています👗\nタオルやハンカチをお持ちいただけるとより快適です。そのままお越しください✨'
    },
    {
      keys: ['生理', '月経', '生理中', '出血', '生理痛', '経血', '生理のとき', '月のもの'],
      a: '生理中のご来店については、<strong>状態によってご対応が異なります</strong>🌿\n・生理前後・軽い生理痛 → 施術可能なことが多いです\n・生理初日・出血量が多い日 → 事前にLINEでご確認ください\n\n看護師MIEが安全にご案内しますので、お気軽にご相談を。'
    },
    {
      keys: ['ハーブ読み取り', 'ハーブ', '読み取り', 'herb reading', 'アロマ', '香り'],
      a: '「ハーブ読み取り®」はStella Herba独自のメニューです✨\n複数のハーブをひとつずつ嗅いでいただき、<strong>直感的な反応からその日の体質・状態を読み解く</strong>体験です。\nよもぎ蒸しのブレンドをオーダーメイドで選定します。\n毎回変わるので、リピーターの方にも大人気🌿'
    },
    {
      keys: ['よもぎ蒸し', 'よもぎ', 'ヨモギ', '蒸し', '蒸気', 'よもぎむし', '温活'],
      a: 'よもぎ蒸しは、よもぎなどのハーブを煎じた蒸気を<strong>会陰部・骨盤まわりに当てて温める温活ケア</strong>です🌿\n子宮・卵巣まわりの血行を促進し、冷え・むくみ・自律神経・生理周期のケアに役立てられています。\nStella Herbaでは<strong>国産無農薬よもぎ100%</strong>を使用。'
    },
    {
      keys: ['初めて', '初回', '最初', 'はじめて', '初訪問', '始めて', '体験', '試し'],
      a: '初めての方も安心してお越しください😊\n<strong>初回お試しコース（¥3,500）</strong>\n①ハーブ読み取り体験\n②足湯\n③よもぎ蒸し30分\n④お好みのドリンク付き（約60分）\n\nまずはLINEでお気軽にご連絡ください🌿'
    },
    {
      keys: ['料金', '値段', '価格', 'いくら', '費用', 'コース', 'メニュー', '円'],
      a: '主なコースのご案内：\n・<strong>初回お試しコース</strong>：¥3,500（約60分）\n・<strong>国産無農薬よもぎ蒸し</strong>：¥4,000（約60分）\n・<strong>よもぎ蒸し×カッピング</strong>：LINEでご確認を\n・<strong>ペア蒸しコース</strong>：¥7,000（2名様）\n\n完全個室・完全予約制です😊'
    },
    {
      keys: ['場所', 'アクセス', '住所', '駐車場', 'どこ', '岐南', '岐阜', '羽島', '地図', 'MAP', '道順'],
      a: 'Stella Herba は<strong>岐阜県羽島郡岐南町</strong>にあります🗺️\n羽栗グラウンドのすぐ近くで、<strong>駐車場2台完備</strong>です🚗\n岐阜市・各務原市・羽島市・大垣市・一宮市からもアクセスしやすい立地。\n詳しい道案内はご予約時にLINEでお知らせします。'
    },
    {
      keys: ['予約', '申し込み', '申込', 'booking', 'ライン', '予約方法', '空き', 'キャンセル'],
      a: 'ご予約は<strong>公式LINEのみ</strong>で受け付けています📱\n「予約希望」とメッセージをお送りください。\n看護師MIEが直接ご確認し、ご希望日時をご提案します。\nキャンセルもLINEにてお気軽にどうぞ✉️'
    },
    {
      keys: ['時間', '何分', '所要', 'どのくらい', '何時間'],
      a: '施術の所要時間は<strong>約60分</strong>です⏱️\nカウンセリング＋ハーブ読み取り（約10〜15分）＋足湯＋よもぎ蒸し（約30〜40分）\n初回はお話を丁寧に伺うため少し長くなる場合があります。\n余裕を持ってお越しください。'
    },
    {
      keys: ['妊活', '妊娠', '着床', '排卵', '不妊', '赤ちゃん', '基礎体温'],
      a: '妊活中の方のご来店も多いです🌿\n<strong>看護師MIEが月経周期・体温・体調に合わせた個別サポート</strong>をしています。\nよもぎ蒸しは子宮まわりの血流を促進し、着床環境を整える温活として活用されています。\nタイミングや過ごし方など、LINEでお気軽にご相談を。'
    },
    {
      keys: ['産後', '出産後', '授乳', '産後ケア', '産後養生'],
      a: '産後のよもぎ蒸しも人気です🤱\n産後の体の回復・むくみ・骨盤ケア・疲労回復に役立てられています。\n<strong>産後の回復具合によって開始時期が異なります</strong>ので、まずLINEにてお体の状態をご相談ください。\nMIEが安全にご案内します。'
    },
    {
      keys: ['更年期', '閉経', 'ほてり', 'のぼせ', 'ホットフラッシュ'],
      a: '更年期のお悩みをお持ちの方もいらっしゃいます。\nよもぎ蒸しで骨盤まわりを温め、<strong>自律神経・ホルモンバランスのケア</strong>をサポートします🌿\n個別の体質に合わせてアプローチしますので、LINEでお気軽にご相談ください。'
    },
    {
      keys: ['カッピング', 'cupping', '吸い玉'],
      a: '「よもぎ蒸し×カッピングコース」をご用意しています✨\nよもぎ蒸しで体を温めた後にカッピングを行い、<strong>お腹・腰まわりの血流を集中改善</strong>。\n冷えやむくみが強い方、巡りをリセットしたい方に人気のコースです。\n詳しくはLINEでご相談ください。'
    },
    {
      keys: ['冷え', 'ひえ', '冷え症', '冷えを'],
      a: '冷えのお悩みは多いですね。\nよもぎ蒸しは子宮・骨盤まわりから温め、<strong>全身の血行を促進</strong>します🌿\n特に「よもぎ蒸し×カッピング」は冷えが強い方に人気のコースです。\nまずは初回お試しコース（¥3,500）からどうぞ。'
    },
    {
      keys: ['むくみ', 'むくんで', 'むくみやすい'],
      a: 'むくみのお悩みにもよもぎ蒸しが役立ちます。\nリンパ・血液の巡りを温活で整え、<strong>骨盤まわりのむくみを根本からケア</strong>します🌿\nカッピングとの組み合わせも効果的です。LINEでお気軽にご相談ください。'
    },
    {
      keys: ['合う', 'おすすめ', 'どれ', '何がいい', '選び方', 'どのコース', '迷って'],
      a: 'お悩みに合わせてご提案します😊\n・<strong>冷え・むくみが強い方</strong> → よもぎ蒸し×カッピング\n・<strong>初めての方・体質を知りたい方</strong> → 初回お試し＋ハーブ読み取り®\n・<strong>生理・ホルモンバランスのケア</strong> → オーダーメイド温活コース\n\nサイトの「AI温活チェック」も参考にどうぞ✨'
    },
    {
      keys: ['禁忌', '受けられない', 'ペースメーカー', '心臓', '受けられますか'],
      a: '安全のため、以下の場合はご相談ください：\n・心疾患・ペースメーカー使用中の方\n・重篤な疾患の治療中の方\n・感染症・皮膚疾患がある方\n\n不安なことがあればLINEにてご相談ください。看護師として安全を最優先にご案内します🌿'
    },
    {
      keys: ['MIE', 'みえ', 'オーナー', '看護師', 'セラピスト', 'スタッフ'],
      a: 'MIEは元救命救急看護師👩‍⚕️\n医療の知識を活かして女性の体の不調に寄り添います。\nよもぎ蒸し・ハーブ読み取り®・カッピングを組み合わせた<strong>オーダーメイドの温活サポート</strong>が得意です。\nお気軽に何でもご相談ください🌿'
    },
    {
      keys: ['駐車場', '車', '止め', 'パーキング', '停め'],
      a: '<strong>駐車場2台</strong>をご用意しています🚗\n詳しい場所はご予約時にLINEでお知らせします。\n満車の際はご連絡ください。'
    },
    {
      keys: ['営業時間', '時間帯', '何時', 'オープン', '営業', '定休'],
      a: '営業時間は<strong>完全予約制</strong>のため、ご希望の日時をLINEでお知らせいただくと、空き状況をすぐにご確認できます📱\n土日祝・平日問わずご相談ください。'
    },
    {
      keys: ['足湯', 'あしゆ', 'フットバス'],
      a: '足湯はよもぎ蒸し施術前のプレウォーミングとして行います🌿\n足元から体を温めることで、よもぎ蒸しの効果をより高めます。\n初回お試しコース（¥3,500）にも含まれています。'
    },
    {
      keys: ['ペア', '二人', '友達', 'カップル', '2名'],
      a: '2名様で一緒に受けられる<strong>ペア蒸しコース（¥7,000）</strong>があります✨\nお友達・ご夫婦・お母さんと一緒にいかがですか？\n個室なのでリラックスしてお過ごしいただけます。詳しくはLINEへ。'
    }
  ];

  var DEFAULT_ANSWER =
    'ありがとうございます。少し難しいご質問でした💦\n詳しくはLINEにてMIE本人にお気軽にご相談ください。\nサロンや施術、体のことなど何でもお答えします✨';

  var GREETING =
    'こんにちは！MIE AIコンシェルジュです✨<br>Stella Herbaについてのご質問に24時間お答えします🌿<br>下のボタンを選ぶか、自由に入力してみてください。';

  var QUICK_QS = [
    { label: '初めてです。持ち物は？',   q: '初めてですが持ち物は何が必要ですか' },
    { label: '生理中でも大丈夫？',       q: '生理中でもよもぎ蒸しを受けられますか' },
    { label: 'ハーブ読み取り®とは？',   q: 'ハーブ読み取りとはどんな体験ですか' },
    { label: '自分に合うメニューは？',   q: '自分のお悩みに合うコースはどれですか' }
  ];

  /* ── 回答検索 ── */
  function normalize(s) { return (s || '').replace(/\s/g, '').toLowerCase(); }

  function findAnswer(userInput) {
    var q = normalize(userInput);
    for (var m = 0; m < MEDICAL_KEYS.length; m++) {
      if (q.indexOf(normalize(MEDICAL_KEYS[m])) !== -1) return MEDICAL_ANSWER;
    }
    for (var i = 0; i < KB.length; i++) {
      for (var j = 0; j < KB[i].keys.length; j++) {
        if (q.indexOf(normalize(KB[i].keys[j])) !== -1) return KB[i].a;
      }
    }
    return DEFAULT_ANSWER;
  }

  /* ══════════════════════════════════════════════
     CSS
  ══════════════════════════════════════════════ */
  var CSS = [

    /* ── フローティングボタン（FAB）── */
    /* PC: bottom:240px で promo-pop(≈224px) を完全クリア */
    '#mie-fab{',
      'position:fixed;right:24px;bottom:240px;z-index:9100;',
      'display:flex;flex-direction:column;align-items:flex-end;gap:10px;',
      'cursor:pointer;-webkit-tap-highlight-color:transparent;',
    '}',

    /* 吹き出しラベル */
    '#mie-fab-bubble{',
      'background:#fffdf9;color:#5a6b4a;',
      'font-size:12.5px;font-weight:700;',
      'padding:6px 14px;border-radius:20px;',
      'box-shadow:0 3px 16px rgba(90,107,74,.24);',
      'white-space:nowrap;position:relative;',
      'border:1px solid rgba(90,107,74,.2);',
      'font-family:"Zen Maru Gothic",sans-serif;letter-spacing:.03em;',
    '}',
    '#mie-fab-bubble::after{',
      'content:"";position:absolute;bottom:-8px;right:28px;',
      'border:5px solid transparent;border-top-color:#fffdf9;',
    '}',

    /* アイコンリング：78px（ひと回り大きく）*/
    '#mie-fab-ring{',
      'width:78px;height:78px;border-radius:50%;',
      'border:3.5px solid #b39362;',
      'box-shadow:0 6px 28px rgba(90,107,74,.38),0 2px 8px rgba(0,0,0,.12);',
      'overflow:hidden;',
      'transition:transform .22s cubic-bezier(.34,1.56,.64,1),box-shadow .22s;',
      'background:#eef1e6;flex-shrink:0;',
    '}',
    '#mie-fab:hover #mie-fab-ring{',
      'transform:scale(1.08);',
      'box-shadow:0 10px 36px rgba(90,107,74,.5),0 4px 12px rgba(0,0,0,.14);',
    '}',
    '#mie-fab-img{width:78px;height:78px;border-radius:50%;object-fit:cover;display:block;}',

    /* ── 背景オーバーレイ（PC・スマホ共通）── */
    '#mie-overlay{',
      'display:none;position:fixed;inset:0;',
      'background:rgba(20,16,12,.6);',
      'z-index:99990;',
      'backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);',
      'transition:opacity .25s ease;',
    '}',
    '#mie-overlay.mie-open{display:block;}',

    /* ══ チャットモーダル：PC ══ */
    /* 画面中央配置・大画面ポップアップ */
    '#mie-modal{',
      'position:fixed;',
      'top:50%;left:50%;',
      'width:min(660px,calc(100vw - 48px));',
      'height:min(78vh,760px);',
      'background:#fffdf9;',
      'border-radius:22px;',
      'box-shadow:0 24px 80px rgba(0,0,0,.22),0 4px 20px rgba(90,107,74,.18);',
      'z-index:99999;',
      'display:flex;flex-direction:column;overflow:hidden;',
      'overscroll-behavior:none;touch-action:manipulation;',
      /* 閉じた状態 */
      'transform:translate(-50%,-46%) scale(0.9);',
      'opacity:0;pointer-events:none;',
      'transition:transform .3s cubic-bezier(.34,1.4,.64,1),opacity .22s ease;',
    '}',
    '#mie-modal.mie-open{',
      'transform:translate(-50%,-50%) scale(1);',
      'opacity:1;pointer-events:auto;',
    '}',

    /* ── モーダルヘッダー ── */
    '#mie-modal-header{',
      'background:linear-gradient(135deg,#4a5a3a,#5a6b4a);',
      'padding:18px 20px;',
      'display:flex;align-items:center;gap:14px;flex-shrink:0;',
    '}',
    '#mie-hdr-img{',
      'width:54px;height:54px;border-radius:50%;',
      'object-fit:cover;',
      'border:2.5px solid rgba(255,255,255,.55);',
      'flex-shrink:0;display:block;',
    '}',
    '.mie-title-wrap{flex:1;min-width:0;}',
    '.mie-title-main{',
      'color:#fff;font-size:15px;font-weight:700;',
      'font-family:"Shippori Mincho",serif;line-height:1.3;',
    '}',
    '.mie-title-sub{',
      'color:rgba(255,255,255,.72);font-size:11px;',
      'margin-top:4px;',
      'font-family:"Zen Maru Gothic",sans-serif;line-height:1.5;',
    '}',
    '#mie-close-btn{',
      'background:rgba(255,255,255,.18);border:none;color:#fff;',
      'font-size:20px;width:34px;height:34px;border-radius:50%;',
      'cursor:pointer;display:flex;align-items:center;justify-content:center;',
      'flex-shrink:0;transition:background .15s;padding:0;line-height:1;',
    '}',
    '#mie-close-btn:hover{background:rgba(255,255,255,.32);}',

    /* ── LINE 相談バンド ── */
    '#mie-line-band{',
      'background:#edf8ee;border-bottom:1px solid #c4e0c4;',
      'padding:10px 18px;',
      'display:flex;align-items:center;gap:10px;flex-shrink:0;',
    '}',
    '#mie-line-band a{',
      'display:flex;align-items:center;gap:9px;text-decoration:none;',
      'color:#06C755;font-size:13px;font-weight:700;',
      'font-family:"Zen Maru Gothic",sans-serif;flex:1;line-height:1.2;',
    '}',
    '.mie-line-note{',
      'font-size:11px;color:#999;',
      'font-family:"Zen Maru Gothic",sans-serif;',
      'white-space:nowrap;flex-shrink:0;',
    '}',

    /* ── メッセージエリア ── */
    '#mie-messages{',
      'flex:1;overflow-y:auto;',
      'padding:20px 18px 8px;',
      'display:flex;flex-direction:column;gap:16px;',
      'scroll-behavior:smooth;',
      'overscroll-behavior:contain;-webkit-overflow-scrolling:touch;',
    '}',
    /* スクロールバーを細くシンプルに */
    '#mie-messages::-webkit-scrollbar{width:4px;}',
    '#mie-messages::-webkit-scrollbar-track{background:transparent;}',
    '#mie-messages::-webkit-scrollbar-thumb{background:rgba(90,107,74,.25);border-radius:4px;}',

    '.mie-msg{display:flex;gap:10px;max-width:88%;}',
    '.mie-msg.mie-user{align-self:flex-end;flex-direction:row-reverse;}',
    '.mie-msg-icon{',
      'width:36px;height:36px;border-radius:50%;',
      'object-fit:cover;border:1.5px solid #b39362;',
      'flex-shrink:0;display:block;',
    '}',
    '.mie-bubble{',
      'background:#eef1e6;color:#4a463f;',
      'padding:12px 16px;',
      'border-radius:4px 16px 16px 16px;',
      'font-size:14px;line-height:1.8;',
      'font-family:"Zen Maru Gothic",sans-serif;',
      'word-break:break-word;',
    '}',
    '.mie-msg.mie-user .mie-bubble{',
      'background:#5a6b4a;color:#fff;',
      'border-radius:16px 4px 16px 16px;',
    '}',

    /* ── タイピングインジケーター ── */
    '.mie-typing-wrap{',
      'padding:12px 16px;',
      'display:flex;gap:5px;align-items:center;',
    '}',
    '.mie-dot{',
      'width:7px;height:7px;border-radius:50%;',
      'background:#7c8c63;animation:mieDot 1.2s infinite;',
    '}',
    '.mie-dot:nth-child(2){animation-delay:.22s;}',
    '.mie-dot:nth-child(3){animation-delay:.44s;}',
    '@keyframes mieDot{',
      '0%,80%,100%{transform:scale(.45);opacity:.4;}',
      '40%{transform:scale(1);opacity:1;}',
    '}',

    /* ── クイック質問チップ ── */
    '#mie-quick{',
      'padding:4px 18px 12px;',
      'display:flex;flex-wrap:wrap;gap:7px;flex-shrink:0;',
    '}',
    '.mie-chip{',
      'background:#fff;border:1.5px solid #7c8c63;color:#5a6b4a;',
      'border-radius:20px;padding:7px 14px;',
      'font-size:12.5px;font-weight:700;cursor:pointer;',
      'transition:background .15s,color .15s,border-color .15s;',
      'font-family:"Zen Maru Gothic",sans-serif;white-space:nowrap;',
    '}',
    '.mie-chip:hover{background:#5a6b4a;color:#fff;border-color:#5a6b4a;}',

    /* ── 入力エリア ── */
    '#mie-input-area{',
      'display:flex;gap:10px;',
      'padding:12px 18px;',
      'border-top:1px solid #e0dbd2;',
      'background:#fff;flex-shrink:0;',
    '}',
    '#mie-input{',
      'flex:1;border:1.5px solid #c8c2b6;border-radius:24px;',
      'padding:10px 18px;',
      'font-size:16px;outline:none;',
      'font-family:"Zen Maru Gothic",sans-serif;',
      'color:#4a463f;background:#fffdf9;',
      'transition:border-color .15s;min-width:0;',
    '}',
    '#mie-input:focus{border-color:#7c8c63;}',
    '#mie-send-btn{',
      'background:#5a6b4a;color:#fff;border:none;',
      'border-radius:24px;padding:10px 18px;',
      'font-size:14px;font-weight:700;cursor:pointer;',
      'font-family:"Zen Maru Gothic",sans-serif;',
      'transition:background .15s;white-space:nowrap;flex-shrink:0;',
    '}',
    '#mie-send-btn:hover{background:#7c8c63;}',

    /* ══ スマホ: ボトムシート型 ══ */
    '@media(max-width:680px){',

    /* FAB: floatbar(height≈65px)の上 */
    '#mie-fab{right:16px;bottom:82px;}',
    '#mie-fab-ring{width:66px;height:66px;}',
    '#mie-fab-img{width:66px;height:66px;}',

    /* モーダル: 全幅ボトムシート（後ろ要素を完全に覆う）*/
    '#mie-modal{',
      'top:auto;left:0;right:0;bottom:0;',
      'width:100%;max-width:100%;',
      'height:92dvh;max-height:92dvh;',
      'border-radius:22px 22px 0 0;',
      /* スマホはY軸スライドインのみ */
      'transform:translateY(40px);',
    '}',
    '#mie-modal.mie-open{transform:translateY(0);}',

    /* メッセージ・入力のサイズ調整 */
    '#mie-messages{padding:16px 14px 6px;}',
    '.mie-bubble{font-size:13.5px;padding:11px 14px;}',
    '#mie-input-area{padding:10px 14px;}',
    /* font-size:16px → iOSズーム防止（16px未満でフォーカス時に自動ズームが発生する） */
    '#mie-input{font-size:16px;padding:9px 14px;}',
    '#mie-send-btn{font-size:14px;padding:9px 14px;}',

    '}'

  ].join('');

  /* ── DOM 構築 ── */
  function buildDOM() {
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    /* オーバーレイ */
    var overlay = document.createElement('div');
    overlay.id = 'mie-overlay';
    document.body.appendChild(overlay);

    /* FAB */
    var fab = document.createElement('div');
    fab.id = 'mie-fab';
    fab.setAttribute('role', 'button');
    fab.setAttribute('tabindex', '0');
    fab.setAttribute('aria-label', 'MIE AIコンシェルジュを開く');
    fab.innerHTML =
      '<div id="mie-fab-bubble">MIE AIに質問✨</div>' +
      '<div id="mie-fab-ring">' +
        '<img id="mie-fab-img" src="' + ICON_SRC + '" alt="MIEアイコン">' +
      '</div>';

    /* Modal */
    var modal = document.createElement('div');
    modal.id = 'mie-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'MIE AIコンシェルジュ');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      /* ヘッダー */
      '<div id="mie-modal-header">' +
        '<img id="mie-hdr-img" src="' + ICON_SRC + '" alt="MIEアイコン">' +
        '<div class="mie-title-wrap">' +
          '<div class="mie-title-main">MIE AIコンシェルジュ</div>' +
          '<div class="mie-title-sub">24時間受付中｜看護師MIEの知識を反映したAIです<br>※MIE本人へのご相談はLINEへ</div>' +
        '</div>' +
        '<button id="mie-close-btn" aria-label="チャットを閉じる">×</button>' +
      '</div>' +
      /* LINE バンド */
      '<div id="mie-line-band">' +
        '<a href="' + LINE_URL + '" target="_blank" rel="noopener">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="#06C755"><path d="M20.9 9.6C20.6 5.5 16.8 2.3 12 2.3S3.4 5.5 3.1 9.6c-.2 2.4.8 4.6 2.7 6.2l.5.4-.3 2.6 2.4-1.3.5.2c1 .4 2.1.7 3.1.7 4.8 0 8.7-3.2 9-7.2v-.6z"/></svg>' +
          'MIE本人にLINEで直接相談する' +
        '</a>' +
        '<span class="mie-line-note">無料✨</span>' +
      '</div>' +
      /* メッセージエリア */
      '<div id="mie-messages"></div>' +
      /* クイック質問 */
      '<div id="mie-quick"></div>' +
      /* 入力エリア */
      '<div id="mie-input-area">' +
        '<input id="mie-input" type="text"' +
          ' placeholder="質問を入力してください…（Enterで送信）"' +
          ' autocomplete="off"' +
          ' enterkeyhint="send"' +
          ' inputmode="text">' +
        '<button id="mie-send-btn">送信</button>' +
      '</div>';

    document.body.appendChild(fab);
    document.body.appendChild(modal);
  }

  /* ── チャットロジック ── */
  var chatOpen    = false;
  var quickActive = true;

  function $ (id) { return document.getElementById(id); }

  function openModal() {
    chatOpen = true;
    var m = $('mie-modal');
    m.classList.add('mie-open');
    m.setAttribute('aria-hidden', 'false');
    $('mie-overlay').classList.add('mie-open');
    document.body.style.overflow = 'hidden';
    $('mie-fab').setAttribute('aria-label', 'MIE AIコンシェルジュを閉じる');
    setTimeout(function () { var inp = $('mie-input'); if (inp) inp.focus(); }, 320);
  }

  function closeModal() {
    chatOpen = false;
    var m = $('mie-modal');
    m.classList.remove('mie-open');
    m.setAttribute('aria-hidden', 'true');
    $('mie-overlay').classList.remove('mie-open');
    document.body.style.overflow = '';
    $('mie-fab').setAttribute('aria-label', 'MIE AIコンシェルジュを開く');
  }

  function scrollDown() {
    var msgs = $('mie-messages');
    if (msgs) msgs.scrollTop = msgs.scrollHeight;
  }

  function addMsg(html, isUser) {
    var msgs = $('mie-messages');
    if (!msgs) return;
    var div = document.createElement('div');
    div.className = 'mie-msg' + (isUser ? ' mie-user' : '');
    if (isUser) {
      div.innerHTML = '<div class="mie-bubble">' + escHtml(html) + '</div>';
    } else {
      div.innerHTML =
        '<img class="mie-msg-icon" src="' + ICON_SRC + '" alt="MIE">' +
        '<div class="mie-bubble">' + html.replace(/\n/g, '<br>') + '</div>';
    }
    msgs.appendChild(div);
    scrollDown();
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function showTyping() {
    var msgs = $('mie-messages');
    if (!msgs) return;
    var div = document.createElement('div');
    div.className = 'mie-msg';
    div.id = 'mie-typing';
    div.innerHTML =
      '<img class="mie-msg-icon" src="' + ICON_SRC + '" alt="MIE">' +
      '<div class="mie-bubble"><div class="mie-typing-wrap">' +
        '<span class="mie-dot"></span>' +
        '<span class="mie-dot"></span>' +
        '<span class="mie-dot"></span>' +
      '</div></div>';
    msgs.appendChild(div);
    scrollDown();
  }

  function hideTyping() {
    var t = $('mie-typing');
    if (t) t.remove();
  }

  function clearQuick() {
    var q = $('mie-quick');
    if (q) q.innerHTML = '';
    quickActive = false;
  }

  function handleSend(text) {
    text = (text || '').trim();
    if (!text) return;
    var inp = $('mie-input');
    if (inp) inp.value = '';
    if (quickActive) clearQuick();
    addMsg(text, true);
    showTyping();
    var delay = Math.min(800 + text.length * 15, 1600);
    setTimeout(function () {
      hideTyping();
      addMsg(findAnswer(text), false);
    }, delay);
  }

  /* ── 初期化 ── */
  function init() {
    buildDOM();

    /* グリーティング */
    addMsg(GREETING, false);

    /* クイック質問チップ */
    var qDiv = $('mie-quick');
    if (qDiv) {
      QUICK_QS.forEach(function (item) {
        var btn = document.createElement('button');
        btn.className = 'mie-chip';
        btn.textContent = item.label;
        btn.addEventListener('click', function () { handleSend(item.q); });
        qDiv.appendChild(btn);
      });
    }

    /* FAB */
    var fab = $('mie-fab');
    fab.addEventListener('click', function () { chatOpen ? closeModal() : openModal(); });
    fab.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chatOpen ? closeModal() : openModal(); }
    });

    /* 閉じるボタン */
    $('mie-close-btn').addEventListener('click', closeModal);

    /* オーバーレイクリックで閉じる */
    $('mie-overlay').addEventListener('click', closeModal);

    /* ── 送信ボタン ── */
    $('mie-send-btn').addEventListener('click', function () {
      handleSend($('mie-input').value);
    });

    /* ── Enter キー送信（Shift+Enter は送信しない）── */
    $('mie-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend(e.target.value);
      }
    });

    /* ── スマホ: compositionend 後の送信 ── */
    /* IME確定後に再度Enterが来た場合も正常送信できるよう isComposing を確認 */
    var isComposing = false;
    var inp = $('mie-input');
    inp.addEventListener('compositionstart', function () { isComposing = true; });
    inp.addEventListener('compositionend',   function () { isComposing = false; });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
        e.preventDefault();
        handleSend(e.target.value);
      }
    }, true);  /* capture phase で compositionend の後に確実に動かす */

    /* ESC */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && chatOpen) closeModal();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
