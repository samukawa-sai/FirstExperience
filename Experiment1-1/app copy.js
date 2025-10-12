//jspsychの初期化
const jsPsych = initJsPsych({
  display_element: 'jspsych-target',
});

// 1) 受験者ID入力トライアル
const idTrial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p style="font-size: 24px; margin: 40px 0;">受験者IDを入力してください</p>
    <input type="text" id="subject-id" style="font-size: 20px; width: 200px;">
    <p>入力後、Enterキーを押してください</p>
  `,
  choices: ['Enter'],
  on_finish: function(data) {
    // 入力値を取得してデータに保存
    const input = document.getElementById('subject-id');
    if (input) {
      jsPsych.data.addProperties({subject_id: input.value});
    }
  }
};

//画像ファイルリスト
const images = [
  'tb0f.jpeg',
  'tb5f.jpeg',
  'tb10f.jpeg',
];

//画像プリロード
const preload = {
  type: jsPsychPreload,
  images,
};

// 2) 画像提示＋スライダー回答トライアル
const imageTrials = images.map((path, i) => {
  let msg;
  if (i === images.length - 1) {
    msg = '終了画面へ';
  } else {
    msg = '次の画像へ';
  }
  return {
    type: jsPsychHtmlSliderResponse,
    stimulus: `
      <img src="${path}" 
           style="max-width: 90vw; max-height: 80vh; display: block; margin: 0 auto;" />
    `,
    labels: ['全くそう思わない', 'どちらともいえない', 'とてもそう思う'],
    min: 0,
    max: 100,
    slider_start: 50,
    step: 1,
    prompt: `
      <p style="margin-top: 16px; text-align:center;">
        スライダーで回答し、「次へ」ボタンを押してください。<br>
        ${msg}
      </p>
    `,
    button_label: '次へ',
    require_movement: true,
  };
});

// 3) 終了画面
const theEnd = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <p style="font-size: 28px; margin: 40px 0; text-align:center;">お疲れさまでした</p>
    <p style="text-align:center;">何かキーを押すと終了します。</p>
  `,
};
// 実験の実行
jsPsych.run([idTrial, preload, ...imageTrials, theEnd]);

// 終了時にCSVデータをサーバーへ送信
jsPsych.on('finish', function() {
  const csvData = jsPsych.data.get().csv();
  fetch('http://localhost/save.php', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: csvData
  })
  .then(response => {
    if (response.ok) {
      alert('データがサーバーに保存されました');
    } else {
      alert('データ保存に失敗しました');
    }
  })
  .catch(() => {
    alert('サーバー接続エラー');
  });
});
