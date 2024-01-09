import CryptoJS from "crypto-js";

export function encryptMessage(message, secretKey) {
  const ciphertext = CryptoJS.AES.encrypt(message, secretKey).toString();
  return ciphertext;
}

export function decryptMessage(ciphertext, secretKey) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const originalMessage = bytes.toString(CryptoJS.enc.Utf8);
  return originalMessage;
}

export function generateSecretKey() {
  const keySize = 64;
  const key = CryptoJS.lib.WordArray.random(keySize / 8);
  return key.toString();
}
