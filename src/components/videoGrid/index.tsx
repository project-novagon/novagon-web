import { getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { fetchAllVideos } from "../../services";

export const videoGrid = () => {
  const [imgs, setImgs] = useState<string[]>([]);
  const getUrlsFromImages = async () => {
    try {
      const images = await fetchAllVideos();
      images.items.forEach(async (VID) => {
        const url = await getDownloadURL(VID);
        setImgs((value) => [...value, url]);
      });
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getUrlsFromImages();
  }, []);
  return (
    <div className="grid gap-2 md:grid-cols-4">
      {imgs
        ? imgs.map((img, index) => {
            return <img className="rounded" height={200} width={200} key={index} src={img} alt="Image" loading="lazy"/>;
          })
        : null}
    </div>
  );
};
