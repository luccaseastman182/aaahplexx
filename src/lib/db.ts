// CODED BY: LUCCAS EASTMAN  
// FILE LOCATION: aaahplexx\src\lib\db.ts  

import { PrismaClient } from "@prisma/client";  

const prisma = new PrismaClient();  

/**  
 * Interface for file metadata  
 */  
interface FileMetadata {  
  fileName: string;  
  originalFormat: string;  
  convertedFormat: string;  
  fileSize: number;  
  convertedFileSize: number;  
}  

/**  
 * Saves file metadata to the database  
 * @param metadata - The file metadata to save  
 */  
export async function saveFileMetadata(metadata: FileMetadata) {  
  try {  
    await prisma.fileMetadata.create({  
      data: {  
        fileName: metadata.fileName,  
        originalFormat: metadata.originalFormat,  
        convertedFormat: metadata.convertedFormat,  
        fileSize: metadata.fileSize,  
        convertedFileSize: metadata.convertedFileSize,  
      },  
    });  
  } catch (error) {  
    console.error("Failed to save file metadata:", error);  
  }  
}