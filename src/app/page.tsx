"use client";

import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { uploadImage } from "@/features/image-upload/services";
import { fetchImages } from "@/features/image-preview/services";

const UploadDialog = dynamic(() => import("@/features/image-upload/components"));
const NoImageIndicator = dynamic(() => import("@/components/no-image-indicator"));

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState<boolean>(false);

  const handleFetchAPIRequest = useCallback(async () => {
    setIsFetching(true);
    try {
      const data = await fetchImages();
      setImages(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
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
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      const imageInstance = await uploadImage(selectedFile);
      setImages((prev) => [...prev, imageInstance]);
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

  return (
    <div className="min-h-screen bg-slate-200 p-8">
      <h1 className="text-4xl font-bold text-center">Image Gallery</h1>
      <p className="text-sm text-gray-500 text-center mb-10">
        The image gallary has been made using pinata sdk
      </p>
      {images.length === 0 ? (
        <NoImageIndicator isFetching={isFetching} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg drop-shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <img
                src={img}
                alt={`Uploaded ${index}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={() => setImages(images.filter((_, i) => i !== index))}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>
          ))}
        </div>
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
