import { getDownloadURL } from "firebase/storage";
import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { fetchAllImages } from "../../services";
import { db } from "../../firebase-config"; // Import the db instance

export const ImageGrid = () => {
  const [imgs, setImgs] = useState<string[]>([]);
  const [users, setUsers] = useState<{ [key: string]: string }>({});

  const getUsersFromFirestore = async () => {
    try {
      const usersRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersRef);
      const usersData = usersSnapshot.docs.reduce((result, doc) => {
        return { ...result, [doc.id]: doc.data().username };
      }, {});
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    }
  };

  const getUrlsFromImages = async () => {
    try {
      const images = await fetchAllImages();
      images.items.forEach(async (img) => {
        const url = await getDownloadURL(img);
        setImgs((value) => [...value, url]);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsersFromFirestore();
    getUrlsFromImages();
  }, []);

  return (
    <div className="grid gap-5 md:grid-cols-4 lg:grid-cols-6 sm:grid-cols-2">
    {imgs &&
  imgs.map((img, index) => {
    const uid = img.split("/")[1].split("_")[0];
    const username = users[uid] || uid; // Use uid as the fallback value
    return (
      <div key={index} className="dark:bg-zinc-700 rounded-lg shadow-xl">
        <p>{username}</p>
        <img
          className="rounded"
          height={200}
          width={200}
          src={img}
          alt="Image"
          loading="lazy"
        />
      </div>
    );
  })}
  </div>
  
  
  );
};
