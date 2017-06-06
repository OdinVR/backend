
const multer = require('multer');
const unzip = require('unzip');
const s3fs = require('s3fs');
var aws = require('aws-sdk')
var multerS3 = require('multer-s3')

var s3 = new aws.S3();

var upload = multer({storage: multerS3({
    s3: s3,
    bucket: 'odin',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports.upload = upload;