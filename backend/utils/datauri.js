import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    // Ensure that both file and file.buffer are present
    if (!file || !file.originalname || !file.buffer) {
        throw new Error('File is not properly uploaded. Missing required file data.');
    }

    const parser = new DataUriParser();
    
    // Ensure the file extension is valid
    const extName = path.extname(file.originalname).toLowerCase();
    if (!extName) {
        throw new Error('File extension could not be determined.');
    }

    // Check if the file buffer is valid (non-empty)
    if (file.buffer.length === 0) {
        throw new Error('File buffer is empty.');
    }

    // Return the formatted data URI
    return parser.format(extName, file.buffer);
};

export default getDataUri;
