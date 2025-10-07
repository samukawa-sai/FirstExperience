//jspsychの初期化
const jsPsych = initJsPsych({
  //htmlのbody内にあるidを指定している
  display_element: 'jspsych-target', // bodyでもOKだが、明示すると管理しやすい
});

//一つ目の課題の作成
const images = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
];

//プリロードの設定
const preload = {
  type: jsPsychPreload,
  images,
};

// 3) 画像提示 → 何かキーで次へ、のトライアルを4つ自動生成
const imageTrials = images.map((path, i) => ({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <img src="${path}" 
         style="max-width: 90vw; max-height: 80vh; display: block; margin: 0 auto;" />
  `,
  prompt: `
    <p style="margin-top: 16px; text-align:center;">
      何かキーを押すと${i === images.length - 1 ? '終了画面へ' : '次の画像へ'}
    </p>
  `,
  choices: "ALL_KEYS",          // どのキーでもOK
  // trial_duration: null,      // タイムアウトなし（必要ならms指定）
  // post_trial_gap: 250,       // 次刺激までの間隔（必要ならms指定）
}));

// 4) 終了画面（最後にキーを押すと実験終了）
const theEnd = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p style="font-size: 28px; margin: 40px 0; text-align:center;">お疲れさまでした</p>
    <p style="text-align:center;">何かキーを押すと終了します。</p>
  `,
};

//課題の実行
jsPsych.run([preload, ...imageTrials, theEnd]);
