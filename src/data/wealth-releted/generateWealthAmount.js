// src/data/generateWealthAmount.js

// import random from "random";
// import seedrandom from "seedrandom";

// random.use(seedrandom());

// 金運パワー値ごとの分布パラメータ
const paramsTable = [
  { min: 0, max: 5, mu: 18.6, sigma: 0.90 },
  { min: 6, max: 10, mu: 19.0, sigma: 1.0 },
  { min: 11, max: 15, mu: 19.3, sigma: 1.12 },
];

function getParams(wealthPower) {
  return paramsTable.find(({ min, max }) => wealthPower >= min && wealthPower <= max);
}

// 正規分布乱数 (Box-Muller法)
function normalRandom() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// 対数正規分布乱数
function logNormalRandom(mu, sigma) {
  return Math.exp(mu + sigma * normalRandom());
}


export function generateWealthAmount(wealthPower) {
  const params = getParams(wealthPower);
  if (!params) return 0;
  const { mu, sigma } = params;
  let value = Math.floor(logNormalRandom(mu, sigma));
  if (typeof value !== "number" || isNaN(value)) return 0;
  if (value > 100_000_000_000) return "計り知れない生涯年収！";
  if (value < 0) value = 0;
  return value;
}

