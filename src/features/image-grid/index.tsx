"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";

type ImageGridProps = {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  isUploading: boolean;
};

const ImageGrid: React.FC<ImageGridProps> = ({ images, setImages, isUploading }) => {
  return (
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
      {isUploading && <div className="bg-gray-200 rounded-lg animate-pulse h-64"></div>}
    </div>
  );
};

export default ImageGrid;
