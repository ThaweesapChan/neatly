// Improved version of the fromBase64 function
const fromBase64 = (base64String, customFileName = 'restored-file') => {
    // Ensure that the base64String is a string
    if (typeof base64String !== 'string') {
      throw new Error('The provided input is not a valid string');
    }
  
    // Check if the string is a valid Base64 data URL format
    const base64Pattern = /^data:([a-zA-Z0-9+/=]+\/[a-zA-Z0-9+/=]+)?;base64,/;
    const match = base64String.match(base64Pattern);
    
    if (!match) {
      throw new Error('The provided string is not a valid Base64 data URL');
    }
  
    // Split the Base64 string into the header (MIME type) and the data part
    const [header, base64Data] = base64String.split(',');
  
    // Extract the MIME type from the header (if available)
    const mimeTypeMatch = header.match(/data:(.*?);base64/);
    const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'application/octet-stream';
  
    // Define a mapping of MIME types to file extensions
    const mimeTypeToExtension = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/gif": ".gif",
      "application/pdf": ".pdf",
      "text/plain": ".txt",
      "application/json": ".json",
      "application/xml": ".xml",
      "audio/mpeg": ".mp3",
      "video/mp4": ".mp4",
      // Add more MIME types and their corresponding extensions if needed
    };
  
    // Determine the file extension based on the MIME type
    const fileExtension = mimeTypeToExtension[mimeType] || '.bin'; // Default to .bin if no match
  
    // Decode the Base64 string into binary data
    const binaryData = atob(base64Data);
  
    // Create a typed array (Uint8Array) to hold the binary data
    const uint8Array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
  
    // Create a Blob with the binary data and MIME type
    const blob = new Blob([uint8Array], { type: mimeType });
  
    // Use the provided file name or default to "restored-file"
    const fileName = customFileName + fileExtension; // Append the extension based on MIME type
  
    // Create a File object from the Blob
    const file = new File([blob], fileName, { type: mimeType });
  
    // Return the file and its extension
    return file;
  };

  
  export default fromBase64;
  