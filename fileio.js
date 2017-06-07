
const multer = require('multer');
const unzip = require('unzip');
const s3fs = require('s3fs');
var aws = require('aws-sdk')
var multerS3 = require('multer-s3')

var s3 = new aws.S3( {
    endpoint: 's3.us-east-2.amazonaws.com',
    signatureVersion: 'v4',
    region: 'eu-central-1'
} );

var upload = multer({storage: multerS3({
    s3: s3,
    bucket: 'odinvr',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      var newFileName = Date.now() + "-" + file.originalname;
      var fullPath = 'public/models/'+ newFileName;
      cb(null, fullPath);
    }
  })
});

function extractModelOnS3() {

}

module.exports.extractModelOnS3 = extractModelOnS3;
module.exports.upload = upload;