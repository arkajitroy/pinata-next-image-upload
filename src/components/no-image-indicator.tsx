import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon } from "lucide-react";

export const NoImageIndicator = () => {
  return (
    <Card className="col-span-full bg-transparent shadow-none">
      <CardContent className="flex flex-col items-center justify-center h-64">
        <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
        <p className="text-gray-500 text-lg font-medium">No images to display</p>
        <p className="text-gray-400 text-sm mt-1">Upload an image to get started</p>
      </CardContent>
    </Card>
  );
};
