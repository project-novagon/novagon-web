/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, listAll, ref, uploadBytes, getMetadata } from "firebase/storage";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import React from 'react';
import { User } from "firebase/auth";
import { UploadVideo } from "./uploadVideo";
import { ImageGrid } from "./ImageGrid";
import { UploadImage } from "./UploadImage";
import { VideoGrid } from "./videoGrid";
import { app } from "../firebase-config";

interface Props {
  user: User
}

function ImageMenu({ user }: Props) {
  return (
    <>
      <h2 className="text-2xl font-bold">Images</h2>
      <UploadImage user={user} />
      <ImageGrid />
    </>
  );
}

function VideoMenu({ user }: Props) {
  return (
    <>
      <h2 className="text-2xl font-bold">Videos</h2>
      <UploadVideo user={user} />
      <VideoGrid />
    </>
  );
}

export { VideoMenu, ImageMenu };
