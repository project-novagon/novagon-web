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
    <div className="grid gap-1 md:grid-cols-4">
      {imgs &&
        imgs.map((img, index) => {
          const uid = img.split("/")[1].split("_")[0];
          const username = users[uid] || "Guest";
          return (
            <div key={index}>
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
