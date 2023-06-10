import { User } from "firebase/auth";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { uploadVideo } from "../../services";
interface Props {
  user: User;
}
export const UploadVideo = ({ user }: Props) => {
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
      const allowedTypes = ["	video/mp4", "video/quicktime", "video/x-msvideo", "video/x-ms-wmv"];
      if (allowedTypes.includes(vid.type)) {
        try {
          const snapshot = await uploadVideo({ vid, uid });
          setVideo(null);
          setUploadSuccesfuly(true);
          console.log(snapshot);
          console.log("Uploaded a blob or file!");
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("Please select a .mp4, .mov, .avi, or .wmv video.");
      }
    }
  };

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
