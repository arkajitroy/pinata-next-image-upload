"use client";

import React, { useState } from "react";
import UploadDialog from "@/components/upload-dialog";
import ImageGrid from "@/features/image-grid";

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result as string]);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 p-8">
      <h1 className="text-4xl font-bold text-center">Image Gallery</h1>
      <p className="text-sm text-gray-500 text-center mb-10">
        The image gallary has been made using pinata sdk
      </p>

      <ImageGrid images={images} setImages={setImages} isUploading={isUploading} />

      <UploadDialog handleUpload={handleUpload} />
    </div>
  );
}
