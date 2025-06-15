
/* eslint-disable camelcase */
import tracery from "tracery-grammar";
import seedrandom from "seedrandom";
import { dailyFortuneGrammar } from "@/data/dailyFortuneGrammar";
import { fortuneAddons } from "@/data/fortuneAddons";
import { dailyOverallComments } from "@/data/dailyOverallComments";

/* ───────── Lucky Pools ───────── */
export const luckyItemsPool = [
  "青いハンカチ","イヤホン","レモン味のキャンディ","万年筆","腕時計","ブックマーカー","革のキーケース",
  "ミントタブレット","折りたたみ傘","ポケットティッシュ","カラビナ","小さな鏡","サングラス","エコバッグ",
  "パワーストーンブレスレット","星形のキーホルダー","ミニサボテン","幸運のコイン","紅茶のティーバッグ",
  "香水サンプル","スケッチブック","リップクリーム","カフェラテ","アロマオイル","ホットチョコレート",
  "手帳","緑色のボールペン","シルクのスカーフ","ステンレスボトル","ワイヤレスマウス","USBメモリ",
  "星座チャーム","チョコレートクッキー","ネイルオイル","カラフルなマグカップ","バッジピン",
  "パズルキーホルダー","麦わら帽子","デニムトート","付箋セット","スマホスタンド","ミニLEDライト",
  "ポケットサイズのノート","レザーコードホルダー","竹製歯ブラシ","マスキングテープ","シトラス系ハンドソープ",
  "ウクレレピック","アボカドトースト","メタリック定規","折り紙","ビー玉","小さな風鈴","シルバーリング",
  "月の写真","トラベルタグ","木製スプーン","便箋セット","サボテン柄の靴下","サテンリボン","ペンライト",
  "カセットテープ","琥珀のペンダント","さくらんぼ柄ハンカチ","メモクリップ","USB-Cケーブル",
  "ミニ温度計","ロケットペンダント","陶器の箸置き","ビーズブレスレット","紙せっけん","クッキー缶",
  "Bluetoothスピーカー","星空のポストカード","ルームフレグランス","クローバーの押し花",
  "パインアップル柄ポーチ","スクラッチカード","ダイス","レコード型コースター","メタルストロー",
  "カカオ70%チョコ","アルファベットマグネット","ミニ砂時計","ビタミンCサプリ","ラベンダーサシェ",
  "木製クリップ","スノードーム","ハート形付箋","アヒルのラバートイ","ヒノキのコースター",
  "レインボーペン","サクランボのイヤーカフ","蓄光シール","カフェオレボウル","ローズクォーツ",
  "ミニトート","フルーツグミ","トラベルミラー","珈琲豆ストラップ","紙風船","ナンバーキャンドル",
  "磁器ボタン","ミツロウラップ","ハーブソルト","ミニティンキャンドル","お守り袋"
];

export const luckyColorsPool = [
  "#FF6EC7","#FFD700","#00C9A7","#7C83FD","#FF934F","#5BE7C4","#FFC0CB","#40E0D0",
  "#BA55D3","#32CD32","#FF4500","#1E90FF","#FF1493","#20B2AA","#9370DB","#228B22",
  "#FFA500","#4169E1","#DC143C","#00FA9A","#8A2BE2","#48D1CC","#FFDAB9","#4682B4",
  "#C71585","#00FF7F","#6A5ACD","#8FBC8F","#FF8C00","#6495ED","#FF69B4","#66CDAA",
  "#DDA0DD","#2E8B57","#FF7F50","#00BFFF","#DB7093","#3CB371","#FF6347","#87CEFA",
  "#E9967A","#00CED1","#DA70D6","#6B8E23","#FFA07A","#DC8CFF","#1ABC9C","#E1FF00",
  "#CC0066","#99FFCC","#0099FF","#FFB347","#C6FFDD","#B19CD9","#F08080","#8F00FF",
  "#FFE4B5","#008080","#FFB6C1","#CD5C5C","#F5DEB3","#00FFFF","#FA8072","#90EE90"
];

/* ───────── helper ───────── */
const getStars = rng => 1 + Math.floor(rng() * 5);
const sampleUnique = (arr, n, rng) => {
  const copy = [...arr];
  const result = [];
  for (let i=0;i<n && copy.length;i++){
    const idx = Math.floor(rng()*copy.length);
    result.push(copy.splice(idx,1)[0]);
  }
  return result;
};

/* ───────── main ───────── */
export const createDailyFortune = (birthday, gender, dateStr) => {
  const seed = `${birthday}_${gender}_${dateStr}`;
  const baseRng = seedrandom(seed);

  const categories = ["love","money","work","health"];
  const details = {};

  categories.forEach((cat, idx) => {
    const rng   = seedrandom(seed + "_" + idx);
    const stars = getStars(rng);

    /* 1st sentence */
    const first = tracery.createGrammar(dailyFortuneGrammar[cat][stars])
                         .flatten("#origin#");
    /* 2nd & 3rd */
    const addG  = tracery.createGrammar(fortuneAddons[cat][stars]);
    const second= addG.flatten("#s2#");
    const third = addG.flatten("#s3#");

    details[cat] = { stars, text: [first,second,third].join("\n") };
  });

  /* overall */
  const average =
    (details.love.stars+details.money.stars+details.work.stars+details.health.stars)/4;

  const band = average>=4.5?"excellent":average>=3.5?"good":average>=2.5?"fair":
               average>=1.5?"low":"veryLow";

  const commentList = dailyOverallComments[band];
  const overallComment = commentList[Math.floor(baseRng()*commentList.length)];

  /* lucky elements */
  const luckyItems = sampleUnique(luckyItemsPool,3,baseRng);
  const luckyColor = luckyColorsPool[Math.floor(baseRng()*luckyColorsPool.length)];

  return {
    date: dateStr,
    average: Number(average.toFixed(1)),
    overallComment,
    luckyItems,
    luckyColor,
    ...details
  };
};
/* eslint-enable camelcase */
