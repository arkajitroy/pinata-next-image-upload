"use client";

import React, { useCallback, useEffect, useState } from "react";
import UploadDialog from "@/components/upload-dialog";
import ImageGrid from "@/features/image-grid";
import { NoImageIndicator } from "@/components/no-image-indicator";

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState<boolean>(false);

  const handleUploadAPIRequest = useCallback(async (imageData: File) => {
    const payload = new FormData();
    payload.set("file", imageData);

    const request = await fetch("/api/files", {
      method: "POST",
      body: payload,
    });

    const { imageURL } = await request.json();

    return imageURL;
  }, []);

  const handleFetchAPIRequest = useCallback(async () => {
    try {
      const request = await fetch("/api/files", {
        method: "GET",
      });
      const { data } = await request.json();

      console.log("data-response", data);

      setImages(data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    try {
      if (selectedFile) {
        setIsUploading(true);

        const imageInstance = await handleUploadAPIRequest(selectedFile);
        setImages((prev) => [...prev, imageInstance]);
      }
    } catch (error) {
      console.error("Error : ", error);
    } finally {
      setImageDialogOpen(false);
      setIsUploading(false);
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  useEffect(() => {
    handleFetchAPIRequest();
  }, [handleFetchAPIRequest]);

  console.log("DEBUG:images", images);

  return (
    <div className="min-h-screen bg-slate-200 p-8">
      <h1 className="text-4xl font-bold text-center">Image Gallery</h1>
      <p className="text-sm text-gray-500 text-center mb-10">
        The image gallary has been made using pinata sdk
      </p>
      {images.length > 0 ? (
        <ImageGrid images={images} setImages={setImages} isUploading={isUploading} />
      ) : (
        <NoImageIndicator />
      )}

      <UploadDialog
        imageDialogOpen={imageDialogOpen}
        setImageDialogOpen={setImageDialogOpen}
        previewUrl={previewUrl}
        selectedFile={selectedFile}
        handleFileSelect={handleFileSelect}
        isUploading={isUploading}
        handleUpload={handleImageUpload}
      />
    </div>
  );
}
