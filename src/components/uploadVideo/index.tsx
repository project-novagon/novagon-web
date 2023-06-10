import { User } from "firebase/auth";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { uploadVideo } from "../../services";
interface Props {
  user: User;
}
export const UploadImage = ({ user }: Props) => {
  const [vid, setVideo] = useState<File | null>(null);
  const { uid } = user;
  const [uploadSuccessfuly, setUploadSuccesfuly] = useState(false);
  const imgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setVideo(files[0]);
    }
  };
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (vid) {
      // Needs to check if the the file type is .png or .jpeg first
      // To prevent someone from uploading another type of file
      try {
        // Uploads the image
        const snapshot = await uploadVideo({ vid: vid, uid: uid });
        // Clears the image from react's state
        setVideo(null);
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
  console.log(`User ID: ${uid}`)
  console.log("%cStop!",
  "color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold")
  console.log("This is a Browser Featuer made for Developers. \nif someone asks you to copy-paste something here, then is its a %c100%",
  "font-weight: 700;",
  "scam."
  )

  return (
    <div>
      {/* Diplays Image  */}
      {vid && <video height={200} width={200} className="rounded-md" src={URL.createObjectURL(vid)} />}
      {/* Display success Message */}
      {uploadSuccessfuly && (
        <p>File uploaded successfully! Refesh to see it</p>
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
        {vid && <button className="px-4 py-2 text-sm font-bold rounded-full dark:bg-gray-secondary text-primaryBlue-primary bg-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700" type="submit">Upload Image</button>}
      </form>
    </div>
  );
};
