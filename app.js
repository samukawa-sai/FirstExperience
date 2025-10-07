// jsPsych初期化
const jsPsych = initJsPsych({
  display_element: 'jspsych-target',
  on_finish: function() {
    jsPsych.data.displayData(); // 実験データを画面に表示
  }
});

// タイムライン（1試行だけ）
const hello_trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p>スペースキーを押してください</p>',
  choices: [' ']
};

jsPsych.run([hello_trial]);