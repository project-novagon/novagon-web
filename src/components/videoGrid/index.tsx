import { getDownloadURL } from "firebase/storage";
import { fetchAllVideos } from "../../services";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase-config";

interface User {
  username: string;
  photoURL: string;
}

export const VideoGrid = () => {
  const [vids, setVids] = useState<string[]>([]);
  const [users, setUsers] = useState<{ [key: string]: User }>({});

  useEffect(() => {
    const getUrlsFromImages = async () => {
      try {
        const images = await fetchAllVideos();
        const promises = images.items.map(async (vid) => {
          const url = await getDownloadURL(vid);
          return url;
        });
        const urls = await Promise.all(promises);
        setVids(urls);
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
      {vids &&
        vids.map((vid, index) => {
          const decodedURL = decodeURIComponent(vid);
          const filename = decodedURL.split("/").pop();
          if (filename) {
            const [userID] = filename.split("_");
            const { username, photoURL } = users[userID] || { username: userID, photoURL: "" };
            return (
              <div key={index} className=" bg-zinc-700 rounded-lg shadow-xl p-2 space-y-2 justify-center items-center">
                <div>
                <div className="w-full flex items-center justify-center">
                  <video
                    className="rounded"
                    height={500}
                    src={vid}
                    controls
                  />
                </div>
                <div className="flex items-center justify-between p-2">
                {username && <p>By {username}</p>} 
                {photoURL && <img src={photoURL} alt={username} className="h-8 rounded-full"/>}
                
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
