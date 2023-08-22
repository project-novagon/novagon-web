import { getDownloadURL } from "firebase/storage";
import { fetchAllImages } from "../../services";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase-config";

interface User {
  username: string;
  photoURL: string;
}

export const ImageGrid = () => {
  const [imgs, setImgs] = useState<string[]>([]);
  const [users, setUsers] = useState<{ [key: string]: User }>({});

  useEffect(() => {
    const getUrlsFromImages = async () => {
      try {
        const images = await fetchAllImages();
        const promises = images.items.map(async (img) => {
          const url = await getDownloadURL(img);
          return url;
        });
        const urls = await Promise.all(promises);
        setImgs(urls);
      } catch (error) {
        console.error(error);
      }
    };

    getUrlsFromImages();
  }, []);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userID = user.uid;
      const username = user.displayName || "Unknown User";
      const photoURL = user.photoURL || "";
      setUsers({ [userID]: { username, photoURL } });
    }
  });
  
  

  return (
    <div className="grid gap-5 md:grid-cols-4 lg:grid-cols-6 sm:grid-cols-2">
      {imgs &&
        imgs.map((img, index) => {
          const decodedURL = decodeURIComponent(img);
          const filename = decodedURL.split("/").pop();
          if (filename) {
            const [userID] = filename.split("_");
            // const { username, photoURL } = users[userID] || { username: userID, photoURL: "" };
            const { username, photoURL } = { username: userID, photoURL: "" };
            return (
              <div key={index} className="justify-center p-2 space-y-2 rounded-lg shadow-xl  bg-zinc-700">
                <div>
                <div className="flex items-center justify-between p-2">
                {username && <p>By {username}</p>} 
                {photoURL && <img src={photoURL} alt={username} className="h-8 rounded-full"/>}
                
                </div>
                <div className="flex items-center justify-center w-full">
                  <img
                    className="rounded"
                    height={200}
                    width={200}
                    src={img}
                    alt="Image"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            );
          }
          return null;
        })}
    </div>
  );
};
