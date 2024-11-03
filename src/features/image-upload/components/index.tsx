import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { ImageIcon, Upload } from "lucide-react";

type UploadDialogProps = {
  imageDialogOpen: boolean;
  setImageDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
  handleUpload: () => void;
  previewUrl: string | null;
  selectedFile: File | null;
};

const UploadDialog: React.FC<UploadDialogProps> = ({
  imageDialogOpen,
  setImageDialogOpen,
  handleFileSelect,
  handleUpload,
  isUploading,
  previewUrl,
  selectedFile,
}) => {
  return (
    <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-8 right-8 rounded-full w-fit h-14 px-8 shadow-lg">
          <Upload className="h-6 w-6" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-60 object-contain"
                  />
                ) : (
                  <>
                    <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click here to upload</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </>
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept="image/*"
              />
            </label>
          </div>
          {selectedFile && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{selectedFile.name}</span>
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
