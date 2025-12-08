const ENCRYPTION_KEY = import.meta.env.VITE_AES_SECRET_KEY;
const GCM_IV_LENGTH = 12;
const GCM_TAG_LENGTH = 128;

async function getCryptoKey() {
  const rawKey = Uint8Array.from(atob(ENCRYPTION_KEY), (c) => c.charCodeAt(0));
  return await crypto.subtle.importKey(
    "raw",
    rawKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(data) {
  try {
    const cryptoKey = await getCryptoKey();
    const iv = crypto.getRandomValues(new Uint8Array(GCM_IV_LENGTH));
    const encoder = new TextEncoder();

    const encryptedData = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv, tagLength: GCM_TAG_LENGTH },
      cryptoKey,
      encoder.encode(data)
    );

    // Combine IV and encrypted data for output
    const combined = new Uint8Array(iv.byteLength + encryptedData.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedData), iv.byteLength);

    return btoa(String.fromCharCode(...combined)); // Base64 encode
  } catch (error) {
    console.error("Encryption error:", error);
    return "";
  }
}

export async function decrypt(ciphertext) {
  try {
    const cryptoKey = await getCryptoKey();
    const dataBuffer = Uint8Array.from(atob(ciphertext), (c) =>
      c.charCodeAt(0)
    );

    // Extract IV and encrypted data
    const iv = dataBuffer.slice(0, GCM_IV_LENGTH);
    const encryptedData = dataBuffer.slice(GCM_IV_LENGTH);

    const decryptedData = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv, tagLength: GCM_TAG_LENGTH },
      cryptoKey,
      encryptedData
    );

    return new TextDecoder().decode(decryptedData);
  } catch (error) {
    console.error("Decryption error:", error);
    return "";
  }
}
