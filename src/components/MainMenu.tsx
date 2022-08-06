import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import React from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyB6YpcLlowvaCVSPUfpxrflvdi1wqzwdDs",
  authDomain: "polygon-social.firebaseapp.com",
  projectId: "polygon-social",
  storageBucket: "polygon-social.appspot.com",
  messagingSenderId: "1040413982197",
  appId: "1:1040413982197:web:d8b8a70509ec88c50274bc",
  measurementId: "G-3L8NZ3JVB5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export function MainMenu() {
  // upload a file using firebase
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  // now make an input to upload a file
  const handleFileChange = (e: { target: { files: React.SetStateAction<null>[]; }; }) => {
    setFile(e.target.files[0]);
  }
  const handleUpload = () => {
    setIsUploading(true);
    const uploadTask = ref(`images/${v4()}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      }
    );
    uploadTask.then(() => {
      setIsUploading(false);
      setIsUploaded(true);
      setProgress(0);
      setFile(null);
      setUrl(null);
    }
    ).catch((error) => {
      setIsUploading(false);
      setIsUploaded(false);
      setError(error.message);
    }
    );
  }
  const handleDownload = () => {
    storage.ref("images/").listAll().then((res) => {
      res.items.forEach((item) => {
        item.getDownloadURL().then((url) => {
          console.log(url);
        }
        );
      }
      );
    }
    ).catch((error) => {
      console.log(error);
    }
    );
  }
  const handleDelete = () => {
    storage.ref("images/").listAll().then((res) => {
      res.items.forEach((item) => {
        item.delete().then(() => {
          console.log("deleted");
        }
        );
      }
      );
    }
    ).catch((error) => {
      console.log(error);
    }
    );
  }
  const handleUploadClick = () => {
    if (file) {
      handleUpload();
    }
  }
  const handleDownloadClick = () => {
    if (url) {
      window.open(url);
    }
  }
  const handleDeleteClick = () => {
    if (url) {
      handleDelete();
    }
  }
  useEffect(() => {
    if (isUploaded) {
      ref(storage, "images/").listAll().then((res) => {
        res.items.forEach((item) => {
          item.getDownloadURL().then((url) => {
            setUrl(url);
          }
          );
        }
        );
      }
      ).catch((error: any) => {
        console.log(error);
      }
      );
    }
  }
  , [isUploaded]);
  return (
    <>
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleUploadClick}>Upload</button>
    {isUploading && <p>Uploading... {progress}%</p>}
    {isUploaded && <p>Uploaded!</p>}
    {error && <p>Error: {error}</p>}
    <h2>Images</h2>
    {url && <img src={url} alt="uploaded" />}
    <h2>Videos</h2>
    <h2>Posts</h2>
    </>
  );
}