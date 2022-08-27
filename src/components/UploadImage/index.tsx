import { User } from "firebase/auth";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { uploadImage } from "../../services";
interface Props {
  user: User;
}
export const UploadImage = ({ user }: Props) => {
  const [img, setImage] = useState<File | null>(null);
  const { uid } = user;
  const [uploadSuccessfuly, setUploadSuccesfuly] = useState(false);
  const imgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (img) {
      // Needs to check if the the file type is .png or .jpeg first
      // To prevent someone from uploading another type of file
      try {
        // Uploads the image
        const snapshot = await uploadImage({ img: img, uid: uid });
        // Clears the image from react's state
        setImage(null);
        // Triggers the message
        setUploadSuccesfuly(true);
        console.log(snapshot);
        console.log("Uploaded a blob or file!");
      } catch (error) {
        console.error(error);
      }
    }
    return;
  };
  return (
    <div>
      <p>Guest user's ID : {uid}</p>
      {/* Diplays Image  */}
      {img && <img alt="Profile Pic" height={200} width={200} className="rounded-md" src={URL.createObjectURL(img)} />}
      {/* Display success Message */}
      {uploadSuccessfuly && (
        <p>File uploaded successfully! Check Console Log for details</p>
      )}
      {/* The form to accept the image input */}
      <form  className="p-1" onSubmit={submitHandler}>
        <label>
          Upload Image:
        <input
          type="File"
          required
          id="image"
          form="img"
          name="image"
          onChange={imgHandler}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold dark:file:bg-gray-secondary file:text-primaryBlue-primary dark:hover:file:bg-zinc-700 hover:file:bg-zinc-200 file:bg-zinc-100"
          multiple
          />
          </label>
        {img && <button className="dark:bg-gray-secondary px-4 rounded-full text-primaryBlue-primary font-bold bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm py-2" type="submit">Upload Image</button>}
      </form>
    </div>
  );
};
