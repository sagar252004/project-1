// import multer from "multer";

// const storage = multer.memoryStorage();
// export const singleUpload = multer({storage}).single("file");

import multer from 'multer';


// Set up file upload using memory storage
const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).single('file');