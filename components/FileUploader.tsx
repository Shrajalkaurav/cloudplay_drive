"use client";

import React, { MouseEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import Thumbnail from "./Thumbnail";

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setUploading(true);

    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("file", file);
    });
    formData.append("ownerId", ownerId); // Pass owner ID

    try {
      const response = await fetch("/api/v1/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Uploaded file:", data.file);
        alert("File uploaded successfully!");
      } else {
        alert("File upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function handleRemoveFile(
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string
  ) {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  }

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className={cn("uploader-button", className)}>
        <Image
          src="/assets/icons/upload.svg"
          alt="uploader"
          height={24}
          width={24}
        />
        <p>{uploading ? "Uploading..." : "Upload"}</p>
      </Button>

      {files.length > 0 && (
        <ul className="uploader-preview-list">
          <h4 className="h4 text-light-100">Uploading...</h4>
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);
            return (
              <li
                key={`${file.name}-${index}`}
                className="uploader-preview-item"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />
                  <div className="preview-item-name">
                    {file.name}
                    <Image
                      src="/assets/icons/file-loader.gif"
                      alt="upload-loader"
                      width={80}
                      height={26}
                    />
                  </div>
                </div>
                <Image
                  src="/assets/icons/remove.svg"
                  alt="remove"
                  width={24}
                  height={24}
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};
export default FileUploader;
