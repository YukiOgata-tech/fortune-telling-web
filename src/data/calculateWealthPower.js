import { getResultMessage } from "./resultMessages";
import { generateWealthAmount } from "./generateWealthAmount";

export function calcWealthPower(answers) {
  // 各選択肢→点数変換
  const powerMap = [
    // 質問1
    { A: 5, B: 3, C: 1, D: 2 },
    // 質問2
    { A: 4, B: 1, C: 3, D: 0 },
    // 質問3
    { A: 3, B: 5, C: 2, D: 1 },
  ];
  return answers.reduce((acc, v, i) => acc + (powerMap[i][v] || 0), 0);
}

// 結果ロジックを1関数に
export function getWealthResult(form) {
  const power = calcWealthPower(form.answers);
  console.log("answers:", form.answers);

  const amount = generateWealthAmount(power);
  console.log({ power, amount }); // ← 確認
  const message = getResultMessage(power, amount);

  return { power, amount, message };
}
