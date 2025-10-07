//jspsychの初期化
const jsPsych = initJsPsych({
  //htmlのbody内にあるidを指定している
  display_element: 'jspsych-target', // bodyでもOKだが、明示すると管理しやすい
});

//一つ目の課題の作成
const helloTrial = {
  //htmlファイル内で読み込んだプラグインを指定
  type: jsPsychHtmlKeyboardResponse,
  //刺激の内容を記述
  stimulus: `
    <p style="font-size: 28px; margin: 40px 0;">Hello world!</p>
    <p>なにかキーを押すと終了します。</p>
  `,
};

//課題の実行
jsPsych.run([helloTrial]);
