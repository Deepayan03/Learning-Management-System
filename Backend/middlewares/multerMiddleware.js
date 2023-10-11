import multer from 'multer';
import path from 'path';

// Define the destination directory where the uploaded images will be stored
const destinationDirectory = 'uploads/';

// Define the file filter to accept only images
const imageFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|mp4/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: Only image files (jpeg, jpg, png, gif) are allowed!');
};

// Configure the multer storage and filename options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create a multer instance with the configured options and file filter
const upload = multer({ storage, fileFilter: imageFilter });
console.log("Multer is running properly");
// Export the multer middleware to be used in your routes
export default upload;