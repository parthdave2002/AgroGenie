import React, { useState, useRef, useEffect } from "react";

interface ImageUploadPreviewProps {
  onFileSelect: (file: File | null) => void;
  defaultImage?: string;
}

const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({ onFileSelect, defaultImage }) => {
  const [fileName, setFileName] = useState<string>("");
  const [previewSrc, setPreviewSrc] = useState<string>(defaultImage || "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (defaultImage) {
      setPreviewSrc(defaultImage);
    }
  }, [defaultImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      setFileName(file.name);
      onFileSelect(file);

      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click(); // Allow selecting a new image
  };

  const handleRemoveImage = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent opening file selector
    setFileName("");
    setPreviewSrc("");
    setPreviewSrc(defaultImage || "");
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear input value so user can re-upload the same file
    }
  };

  return (
    <div
      className="w-32 h-32 flex border-dashed items-center justify-center border-2 border-gray-300 dark:border-gray-700 rounded-full overflow-hidden cursor-pointer"
      onClick={handleImageClick}
    >
      <input
        type="file"
        className="hidden"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {previewSrc ? (
        <div className="relative w-full h-full">
          <img src={previewSrc} className="w-full h-full object-cover" alt="Preview" />
          <button
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-600 border-none text-white w-6 h-6 flex items-center justify-center rounded-full shadow-lg hover:bg-red-700 transition"
          >
            x
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="text-sm">Upload Image</p>
          <span className="text-xs truncate block w-full text-center">
            {fileName || "No file chosen"}
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageUploadPreview;
