import { getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { fetchAllVideos } from "../../services";

export const VideoGrid = () => {
  const [vids, setVids] = useState<string[]>([]);
  const getUrlsFromImages = async () => {
    try {
      const videos = await fetchAllVideos();
      videos.items.forEach(async (VID) => {
        const url = await getDownloadURL(VID);
        setVids((value) => [...value, url]);
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
      {vids
        ? vids.map((img, index) => {
            return <img className="rounded" height={200} width={200} key={index} src={img} alt="Image" loading="lazy"/>;
          })
        : null}
    </div>
  );
};
