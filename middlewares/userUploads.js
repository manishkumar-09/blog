const path = require("path");
const multer = require("multer");

const imageConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    // The folder to which the file has been saved
    callback(null, path.join(__dirname, "..", "/uploads/user"));
  },
  filename: (req, file, callback) => {
    //name of the file on the user's computer
    callback(null, `image_${Date.now()}.${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Only image files are allowed"));
  }
};

const uploads = multer({
  storage: imageConfig,
  fileFilter: isImage,
});

module.exports = uploads;
