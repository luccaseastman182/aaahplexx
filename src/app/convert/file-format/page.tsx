// CODED BY: LUCCAS EASTMAN  
// FILE LOCATION: aaahplexx\src\app\convert\file-format\page.tsx  

"use client";  

import React, { useState } from "react";  
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";  
import { Button } from "@/components/ui/button";  
import { Input } from "@/components/ui/input";  
import { Label } from "@/components/ui/label";  
import { saveFileMetadata } from "@/lib/db"; // Import the database function  
import Image from "next/image";  

/**  
 * FileFormatConverterPage Component  
 * This component allows users to upload files (images, documents) and convert them to desired formats.  
 * Supported conversions:  
 * - Image: PNG ↔ JPEG  
 * - Document: PDF ↔ DOCX  
 */  
export default function FileFormatConverterPage() {  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);  
  const [targetFormat, setTargetFormat] = useState<string>("image/png");  
  const [convertedDataUrl, setConvertedDataUrl] = useState<string | null>(null);  
  const [error, setError] = useState<string | null>(null);  
  const [isLoading, setIsLoading] = useState<boolean>(false);  

  /**  
   * Handles file conversion based on the file type.  
   * - Images: Converted client-side using canvas.  
   * - Documents: Sent to a backend API for conversion.  
   */  
  const handleConvert = async () => {  
    setIsLoading(true);  
    try {  
      if (!selectedFile) {  
        throw new Error("No file selected");  
      }  

      const fileType = selectedFile.type;  

      // Handle image conversion  
      if (fileType.startsWith("image/")) {  
        const fileReader = new FileReader();  
        fileReader.onload = async (e) => {  
          const imageSrc = e.target?.result as string;  
          const img = new Image();  
          img.onload = () => {  
            const canvas = document.createElement("canvas");  
            canvas.width = img.width;  
            canvas.height = img.height;  
            const ctx = canvas.getContext("2d");  
            if (!ctx) {  
              throw new Error("Unable to create 2D context for canvas");  
            }  
            ctx.drawImage(img, 0, 0);  
            const convertedUrl = canvas.toDataURL(targetFormat, 0.9); // 0.9 quality for JPEG  
            setConvertedDataUrl(convertedUrl);  
            setError(null);  

            // Save file metadata to the database  
            saveFileMetadata({  
              fileName: selectedFile.name,  
              originalFormat: selectedFile.type,  
              convertedFormat: targetFormat,  
              fileSize: selectedFile.size,  
              convertedFileSize: convertedUrl.length, // Approximate size  
            });  
          };  
          img.onerror = () => {  
            throw new Error("Failed to load image for conversion");  
          };  
          img.src = imageSrc;  
        };  
        fileReader.onerror = () => {  
          throw new Error("Failed to read image file");  
        };  
        fileReader.readAsDataURL(selectedFile);  
      }  

      // Handle document conversion (PDF ↔ DOCX)  
      else if (fileType === "application/pdf" || fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {  
        const formData = new FormData();  
        formData.append("file", selectedFile);  
        formData.append("targetFormat", targetFormat);  

        const response = await fetch("/api/convert-document", {  
          method: "POST",  
          body: formData,  
        });  

        if (!response.ok) {  
          throw new Error("Failed to convert document");  
        }  

        const result = await response.json();  
        setConvertedDataUrl(result.downloadUrl);  
        setError(null);  

        // Save file metadata to the database  
        saveFileMetadata({  
          fileName: selectedFile.name,  
          originalFormat: selectedFile.type,  
          convertedFormat: targetFormat,  
          fileSize: selectedFile.size,  
          convertedFileSize: result.fileSize,  
        });  
      } else {  
        throw new Error("Unsupported file type");  
      }  
    } catch (e: any) {  
      setError(e.message);  
      setConvertedDataUrl(null);  
    } finally {  
      setIsLoading(false);  
    }  
  };  

  return (  
    <div className="container space-y-6 py-6">  
      <Card className="shadow-md border">  
        <CardHeader>  
          <CardTitle>File Format Converter</CardTitle>  
        </CardHeader>  
        <CardContent className="space-y-4">  
          <p className="text-sm text-muted-foreground">  
            Convert images (PNG ↔ JPEG) and documents (PDF ↔ DOCX).  
          </p>  
          {/* File Upload */}  
          <div className="grid gap-2">  
            <Label htmlFor="fileInput">Select File</Label>  
            <Input  
              id="fileInput"  
              type="file"  
              accept="image/*, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"  
              onChange={(e) => {  
                if (e.target.files && e.target.files.length > 0) {  
                  setSelectedFile(e.target.files[0]);  
                  setConvertedDataUrl(null);  
                  setError(null);  
                }  
              }}  
            />  
          </div>  
          {/* Target Format */}  
          <div className="grid gap-2">  
            <Label>Target Format</Label>  
            <select  
              className="border p-2 rounded-md w-[200px]"  
              value={targetFormat}  
              onChange={(e) => {  
                setTargetFormat(e.target.value);  
                setConvertedDataUrl(null);  
                setError(null);  
              }}  
            >  
              <option value="image/png">PNG</option>  
              <option value="image/jpeg">JPEG</option>  
              <option value="application/pdf">PDF</option>  
              <option value="application/vnd.openxmlformats-officedocument.wordprocessingml.document">DOCX</option>  
            </select>  
          </div>  
          {/* Convert Button */}  
          <Button onClick={handleConvert} disabled={isLoading}>  
            {isLoading ? "Converting..." : "Convert"}  
          </Button>  
          {/* Error Handling */}  
          {error && (  
            <div className="mt-4 p-3 border border-red-300 bg-red-50 text-red-700 rounded-md">  
              <p className="font-semibold">Error: {error}</p>  
            </div>  
          )}  
          {/* Converted File Preview */}  
          {convertedDataUrl && !error && (  
            <div className="mt-4 p-3 border rounded-md bg-gray-50 dark:bg-gray-800">  
              <p className="font-semibold">Converted File:</p>  
              {targetFormat.startsWith("image/") ? (  
                <Image  
                  src={convertedDataUrl}  
                  alt="Converted"  
                  width={500}
                  height={300}
                  className="mt-2 max-w-full h-auto border border-gray-300 rounded-sm"
                  style={{ width: 'auto', height: 'auto' }}
                  priority
                />  
              ) : (  
                <a  
                  href={convertedDataUrl}  
                  download={`converted.${targetFormat === "image/jpeg" ? "jpg" : targetFormat.split("/")[1]}`}  
                  className="underline block mt-2"  
                >  
                  Download Converted File  
                </a>  
              )}  
            </div>  
          )}  
        </CardContent>  
      </Card>  
    </div>  
  );  
}