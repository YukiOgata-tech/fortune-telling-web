const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const nodemailer = require('nodemailer');
const functions = require('firebase-functions');
const cors = require('cors')({ origin: ["https://neo-oracle-17f26.web.app"], });
const admin = require("firebase-admin");
// v2 Scheduler import (for cron jobs)
const { onSchedule } = require("firebase-functions/v2/scheduler");

admin.initializeApp();
const db = admin.firestore();
const client = new SecretManagerServiceClient();

async function getSecret(secretName) {
  const [version] = await client.accessSecretVersion({
    name: `projects/223143268834/secrets/${secretName}/versions/latest`,
  });
  return version.payload.data.toString('utf8');
}

// キャッシュされた transporter を返す
let transporterPromise;
async function getTransporter() {
  if (!transporterPromise) {
    transporterPromise = (async () => {
      const [user, pass] = await Promise.all([
        getSecret("MAILU"),
        getSecret("MAILP"),
      ]);
      return nodemailer.createTransport({
        service: "gmail",
        auth: { user, pass },
      });
    })();
  }
  return transporterPromise;
}
// 運勢ページへのリンク生成
const buildFortuneUrl = () => `${process.env.PUBLIC_SITE_URL || "https://neo-oracle-17f26.web.app"}/daily`;


// onRequest + CORS対応
exports.sendContactMail = functions
  .https.onRequest((req, res) => {
    cors(req, res, async () => {
      if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
      }
      try {
        const { name, email, message } = req.body;

        if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof message !== "string" ||
        name.length > 50 ||
        message.length > 2000 ||
        !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
      ) {
        return res.status(400).json({ status: "error", message: "Invalid input" });
      }
        // シークレット取得
        const user = await getSecret('MAILU');
        const pass = await getSecret('MAILP');

        // メール送信
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user, pass }
        });

        await transporter.sendMail({
          from: `"Contact neo-oracle" <${user}>`,
          to: 'reallywannaknowthings@gmail.com',
          subject: `新しいお問い合わせ from ${name}`,
          text: `メッセージ:\n${message}\n\n返信先: ${email}`,
          headers: { "Content-Type": "text/plain; charset=UTF-8" }
        });

        return res.status(200).json({ status: 'ok' });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ status: 'error', message: err.message });
      }
    });
  });


/* ───────────── 2) sendWelcomeEmail (Callable) ───────────── */
exports.sendWelcomeEmail = functions.https.onCall(async (data, context) => {
  const { email, displayName = "" } = data;
  if (!email) throw new functions.https.HttpsError("invalid-argument", "Email is required.");

  const transporter = await getTransporter();
  const user = await getSecret("MAILU");

  const html = `
    <p>${displayName || "占い好きなあなた"} さん、はじめまして！</p>
    <p>Neo‑Oracle へご登録ありがとうございます。下のボタンから <strong>今日の運勢</strong> を早速チェックしましょう。</p>
    <p style="text-align:center; margin: 32px 0;">
      <a href="${buildFortuneUrl()}" style="background:#4f46e5;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;">今日の運勢を見る</a>
    </p>
    <p>Good luck! 🌟</p>`;

  await transporter.sendMail({
    from: `Neo‑Oracle <${user}>`,
    to: email,
    subject: "🎴 ようこそ！今日の運勢を引いてみましょう",
    html,
  });

  return { status: "ok" };
});

/* ───────────── 3) dailyFortuneDigest (Cron) ───────────── */
exports.dailyFortuneDigest = onSchedule(
  {
    // JST 08:00 毎日
    schedule: "0 8 * * *",
    timeZone: "Asia/Tokyo",
    region: ["us-central1"],
  },
  async () => {
    const transporter = await getTransporter();
    const userAddr = await getSecret("MAILU");
    const url = buildFortuneUrl();
    const subject = "🌅 おはようございます！今日の運勢をチェック";

    const snapshot = await db.collection("users").get();
    const sendTasks = snapshot.docs.map((doc) => {
      const { email, displayName = "" } = doc.data();
      if (!email) return Promise.resolve();

      const html = `
        <p>${displayName || "占い好きなあなた"} さん、おはようございます！</p>
        <p>今日も Neo-Oracle で <strong>運勢診断</strong> をどうぞ。</p>
        <p style="text-align:center; margin: 32px 0;">
          <a href="${url}" style="background:#4f46e5;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;">今日の運勢を見る</a>
        </p>
        <p>Have a great day ✨</p>`;

      return transporter
        .sendMail({ from: `Neo-Oracle <${userAddr}>`, to: email, subject, html })
        .catch(console.error);
    });

    await Promise.all(sendTasks);
    console.log(`Daily digest attempted for ${sendTasks.length} users.`);
    return null;
  }
);
