import { User } from "firebase/auth";
import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { uploadImage } from "../../services";

interface Props {
  user: User;
}

export const UploadImage = ({ user }: Props) => {
  const [img, setImage] = useState<File | null>(null);
  const { uid } = user;
  const [uploadSuccessfully, setUploadSuccessfully] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setImage(files[0]);
    }
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (img) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (allowedTypes.includes(img.type)) {
        try {
          const snapshot = await uploadImage({ img, uid });
          setImage(null);
          setUploadSuccessfully(true);
          console.log(snapshot);
          console.log("Uploaded a blob or file!");
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("Please select a PNG or JPG image.");
      }
    }
  };

  return (
    <div>
      {/* The form to accept the image input */}
      <form className="p-1" onSubmit={submitHandler}>
        {img && (
          <div className="flex flex-col items-center justify-center w-64 p-4 m-3 space-y-4 rounded-lg  bg-zinc-600 bg-zinc-300">
            {/* Displays Image */}
            <img alt="Preview" height={200} width={200} className="rounded-md" src={URL.createObjectURL(img)} />
            {/* Display success Message */}
            {uploadSuccessfully && (
              <p>File uploaded successfully! Refresh to see it</p>
            )}
            <button className="px-4 py-2 text-sm font-bold rounded-full  bg-gray-secondary text-mauve bg-zinc-100 hover:bg-zinc-200  hover:bg-zinc-700" type="submit">
              Upload Image
            </button>
          </div>
        )}
        <label htmlFor="image" className="file-input-label">
          Select Image:
          <input
            type="file"
            required
            id="image"
            form="img"
            name="image"
            onChange={imgHandler}
            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold  file:bg-gray-secondary file:text-mauve  hover:file:bg-zinc-700 hover:file:bg-zinc-200 file:bg-zinc-100"
            multiple
          />
        </label>
      </form>
    </div>
  );
};
