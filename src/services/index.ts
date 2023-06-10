import { User } from "firebase/auth";
import {
  getStorage,
  listAll,
  ListResult,
  ref,
  uploadBytes,
  UploadResult,
} from "firebase/storage";
// Documentation for uploading Images
// https://firebase.google.com/docs/storage/web/upload-files#upload_from_a_blob_or_file
const storage = getStorage();
interface UploadImage {
  img: File;
  uid: User["uid"];
}
/**
 * Uploads the image to firebase storage, and names the file uid_file.name
 * @param {UploadImage['img']} img The img File
 * @param {UploadImage['uid']} uid The uid string from the user
 * @return {Promise<UploadResult>} The Upload Result object from the uploadBytes method.
 */
export const uploadImage = async ({
  img,
  uid,
}: UploadImage): Promise<UploadResult> => {
  try {
    const imageName = `images/${uid}_${img.name}`;
    const storageRef = ref(storage, imageName);
    const snapshot = await uploadBytes(storageRef, img);
    return snapshot;
  } catch (error) {
    throw error;
  }
};

export const fetchAllImages = async ():Promise<ListResult> => {
  try {
    const images: string[] = [];
    const storageFolderRef = ref(storage, "images");
    return await listAll(storageFolderRef);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const uploadVideo = async ({
  vid,
  uid,
}: UploadImage): Promise<UploadResult> => {
  try {
    const imageName = `images/${uid}_${vid.name}`;
    const storageRef = ref(storage, imageName);
    const snapshot = await uploadBytes(storageRef, vid);
    return snapshot;
  } catch (error) {
    throw error;
  }
};

export const fetchAllVideos = async ():Promise<ListResult> => {
  try {
    const images: string[] = [];
    const storageFolderRef = ref(storage, "videos");
    return await listAll(storageFolderRef);
  } catch (error) {
    console.error(error);
    throw error;
  }
};


