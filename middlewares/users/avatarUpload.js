const uploader = require("../../utilities/singleUploader");

function avatarUpload(req, res, next) {
  const Upload = uploader(
    "avatars",
    [image / jpg, image / png, image / jpeg],
    1000000,
    "Only .jpg, .jpeg, and .png format allowed!"
  );

  uploader.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = avatarUpload;
