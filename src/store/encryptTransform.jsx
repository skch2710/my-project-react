import { encryptTransform } from "redux-persist-transform-encrypt";

export const encryptor = encryptTransform({
  secretKey: import.meta.env.VITE_AES_SECRET_KEY,
  whitelist: ["auth"],
  onError: (error) => {
    console.error("Redux Persist Encryption Error:", error);
  },
});
