import { reincarnationResults } from './reincarnationResults';

export function calcDiagnosis(scores) {
  // scores = { [type]: point, ... } 例：{偉人: 5, 動物: 3, ...}
  // 最大値のtypeを抽出（同点の場合はランダム）
  const maxScore = Math.max(...Object.values(scores));
  const topTypes = Object.keys(scores).filter(type => scores[type] === maxScore);
  const type = topTypes[Math.floor(Math.random() * topTypes.length)];

  // 結果候補からランダムで1つ
  const candidates = reincarnationResults.filter(item => item.type === type);
  const result = candidates[Math.floor(Math.random() * candidates.length)];
  return result;
}
