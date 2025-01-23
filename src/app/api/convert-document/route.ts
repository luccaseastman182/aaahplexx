// CODED BY: LUCCAS EASTMAN  
// FILE LOCATION: aaahplexx\src\app\api\convert-document\route.ts  

import { NextResponse } from "next/server";  
import { promises as fs } from "fs";  
import { convert } from "libreoffice-convert"; // Example library for document conversion  

export async function POST(request: Request) {  
  const formData = await request.formData();  
  const file = formData.get("file") as File;  
  const targetFormat = formData.get("targetFormat") as string;  

  try {  
    const buffer = Buffer.from(await file.arrayBuffer());  

    // Convert the file using a library like libreoffice-convert  
    const convertedBuffer = await convert(buffer, targetFormat);  

    // Save the converted file temporarily  
    const outputPath = `/tmp/converted.${targetFormat.split("/")[1]}`;  
    await fs.writeFile(outputPath, convertedBuffer);  

    // Return the download URL  
    return NextResponse.json({  
      downloadUrl: `/api/download?file=${outputPath}`,  
      fileSize: convertedBuffer.length,  
    });  
  } catch (error) {  
    return NextResponse.json({ error: "Failed to convert document" }, { status: 500 });  
  }  
}