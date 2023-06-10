/* eslint-disable @typescript-eslint/no-unused-vars */
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useEffect, useState } from "react";
import React from 'react';
import { User } from "firebase/auth";
import { UploadImage } from "./UploadImage";
import { ImageGrid } from "./ImageGrid";
import { app } from "../firebase-config";

// Initialize Firebase
const storage = getStorage(app);
interface Props {
  user: User
}
export function VideoMenu({user}:Props) {

  return (
    <>
    <h2 className="text-2xl font-bold">Videos</h2>
    <UploadImage user={user} />
    <ImageGrid/>
    </>
  );
}