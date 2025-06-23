"use client";
import config from "@/lib/config";
import {
  upload,
  Image as IKImage,
  ImageKitProvider,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
} from "@imagekit/next";
import Image from "next/image";
import { toast } from "sonner";

import { useRef, useState } from "react";

const {
  env: {
    imagekit: { urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { token, expire, signature, publicKey } = data;

    return { token, expire, signature, publicKey };
  } catch (error: any) {
    throw new Error(`Authentication failed : ${error.message}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  // State to keep track of the current upload progress (percentage)
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  // Create a ref for the file input element to access its files easily
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create an AbortController instance to provide an option to cancel the upload if needed.
  const abortController = new AbortController();

  const handleUpload = async () => {
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }
    // Extract the first file from the file input
    const file = fileInput.files[0];

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file,
        fileName: file.name, // Optionally set a custom file name
        // Progress callback to update upload progress state
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        // Abort signal to allow cancellation of the upload if needed.
        abortSignal: abortController.signal,
      });

      setFile({
        filePath: uploadResponse.filePath,
      });
      onFileChange(uploadResponse.filePath);
      toast.success("Image uploaded successfully", {
        description: `${uploadResponse.filePath} uploaded successfully`,
      });
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }

      toast.error("Image upload failed", {
        description: `Your image could not be uploaded. Please try again.`,
      });
    }
  };

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      {/* File input element using React ref */}
      <input
        className=""
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
      />
      {/* Button to trigger the upload process */}
      <button
        className="upload-btn"
        type="button"
        onClick={(e) => {
          if (fileInputRef.current) {
            fileInputRef.current?.click();
          }
        }}
      >
        <Image
          src={"/icons/upload.svg"}
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />

        <p className="text-light-100 text-base">Upload a File</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          src={file.filePath}
          alt={file.filePath}
          width={500}
          height={300}
        />
      )}
      <br />
      {/* Display the current upload progress */}
      Upload image progress:{" "}
      <progress className="w-full" value={progress} max={100}></progress>
    </ImageKitProvider>
  );
};

export default ImageUpload;
