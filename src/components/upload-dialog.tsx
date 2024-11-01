import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";

type UploadDialogProps = {
  handleUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const UploadDialog: React.FC<UploadDialogProps> = ({ handleUpload }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed bottom-8 right-8 rounded-full font-bold w-36 h-14 shadow-lg">
          <Upload className="h-6 w-6" />
          Upload
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;
