import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { fetchAllImages } from '../../services';
import { db } from '../../firebase-config';
import { getDoc, doc } from 'firebase/firestore';

export const ImageGrid = () => {
  const [imgs, setImgs] = useState<string[]>([]);
  const [users, setUsers] = useState<Record<string, string>>({});

  const getProfileURL = async (uid: string) => {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      if (userData) {
        const profileURL = userData.photoURL || '';
        return profileURL;
      }
    }
    return '';
  };

  const getUrlsFromImages = async () => {
    try {
      const images = await fetchAllImages();
      const imageUrls: string[] = [];

      for (const img of images.items) {
        const url = await getDownloadURL(ref(img));
        const fileName = img.name;
        const uid = fileName.substring(0, fileName.lastIndexOf('_'));
        const profileURL = await getProfileURL(uid);
        imageUrls.push(url);

        setUsers((prevUsers) => ({
          ...prevUsers,
          [uid]: profileURL,
        }));
      }

      setImgs(imageUrls);
    } catch (error) {
      console.error('Error fetching images:', (error as Error).message);
    }
  };

  useEffect(() => {
    getUrlsFromImages();
  }, []);

  return (
    <div className="grid gap-1 md:grid-cols-4">
      {imgs.map((img, index) => {
        const fileName = img.substring(img.lastIndexOf('/') + 1);
        const uid = fileName.substring(0, fileName.lastIndexOf('_'));
        const profileURL = users[uid];
        return (
          <div key={index}>
            <p>{uid}</p>
            <img
              className="rounded"
              height={200}
              width={200}
              src={img}
              alt="Image"
              loading="lazy"
            />
            {profileURL && (
              <img
                className="rounded-full w-9 h-9"
                src={profileURL}
                alt="Profile"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
