import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import ToastMessage from "./ToastMessage";
const IMG_URL = import.meta.env["VITE_API_URL"];

interface MultiImageUploadPreviewProps {
  onFileSelect: (files: File[]) => void; 
  onDefaultImageChange?: (images: string[]) => void;
  defaultImage?: any;
}

const MultiImageUploadPreview: React.FC<MultiImageUploadPreviewProps> = ({
  onFileSelect,
  onDefaultImageChange,
  defaultImage,
}) => {
  const [fileNames, setFileNames] = useState<string[]>([]); 
  const [previewSrcs, setPreviewSrcs] = useState<string[]>(defaultImage ? [defaultImage] : []); 
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // useEffect(() => {
  //   if (defaultImage) {
  //     if (Array.isArray(defaultImage)) {
  //       setPreviewSrcs(defaultImage); 
  //     } else if (typeof defaultImage === 'string') {
  //       setPreviewSrcs([defaultImage]);
  //     }
  //   }
  // }, [defaultImage]);

  useEffect(() => {
  if (defaultImage) {
    if (Array.isArray(defaultImage)) {
      const urls = defaultImage.map(img =>
        typeof img === 'string' && !img.startsWith('http')
          ? `${IMG_URL}/public/product/${img}`
          : img
      );
      setPreviewSrcs(urls);
    } else if (typeof defaultImage === 'string') {
      const url = defaultImage.startsWith('http')
        ? defaultImage
        : `${IMG_URL}/public/product/${defaultImage}`;
      setPreviewSrcs([url]);
    }
  }
}, [defaultImage]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      if (selectedFiles.length + files.length > 4) {
        toast.error("You can upload a maximum of 4 images.");
        return;
      }

      const newFileNames: string[] = [];
      const newPreviewSrcs: string[] = [];
      const newFiles: File[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file : any = selectedFiles[i];
        newFileNames.push(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newPreviewSrcs.push(e.target.result as string);
            newFiles.push(file);

            if (newFiles.length === selectedFiles.length) {
              setFileNames((prev) => [...prev, ...newFileNames]);
              setPreviewSrcs((prev) => [...prev, ...newPreviewSrcs]);
              setFiles((prev) => [...prev, ...newFiles]);
              onFileSelect([...files, ...newFiles]); 
            }
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click(); 
  };

  const handleRemoveImage = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (index < previewSrcs.length - files.length) {
      // Removing a default image
      const newDefaultImages = [...previewSrcs];
      newDefaultImages.splice(index, 1);
      setPreviewSrcs(newDefaultImages);
      onDefaultImageChange?.(newDefaultImages);
    } 

    const newFileNames = [...fileNames];
    const newPreviewSrcs = [...previewSrcs];
    const newFiles = [...files];

    newFileNames.splice(index, 1);
    newPreviewSrcs.splice(index, 1);
    newFiles.splice(index, 1);

    setFileNames(newFileNames);
    setPreviewSrcs(newPreviewSrcs);
    setFiles(newFiles);

    onFileSelect(newFiles.length > 0 ? newFiles : []); 
  };

  return (
    <>
      <div className="w-full flex flex-wrap gap-4 justify-start">
       
        <div className="w-full h-32 mb-4 flex border-dashed items-center justify-center border-2 border-gray-300 dark:border-gray-700 rounded-md overflow-hidden cursor-pointer"  onClick={handleImageClick} >
          <input
            type="file"
            className="hidden"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple={true}
          />
          
          {previewSrcs.length < 4 ? (
            <div className="flex flex-col items-center text-gray-500">
              <svg  xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-2"  fill="none"  viewBox="0 0 24 24"  stroke="currentColor"  strokeWidth={1.5}  >
                <path  strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <p className="text-sm">Upload Image</p>
              <span className="text-xs truncate block w-full text-center"> {fileNames.length > 0 ? fileNames.join(", ") : "No file chosen"} </span>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Maximum 4 images selected</p>
          )}
        </div>

        {previewSrcs.length > 0 && (
          <div className="w-full flex gap-4 flex-wrap">
            {previewSrcs.map((src, index) => (
              <div key={index} className="relative w-20 h-20 mb-4">
                <img src={src}  alt={`Selected ${index}`}  className="w-full h-full object-cover rounded-full" />
                <button type="button" onClick={(e) => handleRemoveImage(index, e)} className="absolute top-0 right-0 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-lg hover:bg-red-700 transition" >  x </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastMessage />
    </>
  );
};

export default MultiImageUploadPreview;
