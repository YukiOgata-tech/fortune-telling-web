// Firebase StorageのSDKをプロジェクトにインストール済み前提
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // 画像名衝突防止用（npm install uuid）

export async function uploadImageToStorage(file) {
  const storage = getStorage();
  const storageRef = ref(storage, `blog_images/${uuidv4()}`);
  // fileはFileオブジェクト
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url; // 画像URL
}
