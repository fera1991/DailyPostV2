import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4} from "uuid"

const firebaseConfig = {
  apiKey: "AIzaSyCxUot5UPFtOK7UvB6ybfzCcx1f-7uszmc",
  authDomain: "dailypost-73d3c.firebaseapp.com",
  projectId: "dailypost-73d3c",
  storageBucket: "dailypost-73d3c.appspot.com",
  messagingSenderId: "128766977397",
  appId: "1:128766977397:web:18ec6d213f3fcac4169f3c",
  measurementId: "G-ZDCB98ZQ0H"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file) {
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef,file);
    const url = await getDownloadURL(storageRef);
    return url;
}