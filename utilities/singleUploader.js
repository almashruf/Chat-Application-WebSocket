function uploader(
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) {
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolder_path}`;

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, fileName + fileExt);
    },
  });


  const upload = multer({
    storage: storage,
    limits:{
        filesize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(error_msg), false);
      }
    },
  })
  return uploader;
}

module.exports = uploader;
