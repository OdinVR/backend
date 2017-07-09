
const multer = require('multer')
const unzip = require('unzip')
const S3FS = require('s3fs')
const AWS = require('aws-sdk')
const multerS3 = require('multer-s3')

var fs = require('fs-extra');

var s3 = require('s3')

var AWSs3 = new AWS.S3( {
    endpoint: 's3.us-east-2.amazonaws.com',
    signatureVersion: 'v4',
    region: 's3.us-east-2'
} );

var options = {
  s3Client: AWSs3,
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 4,    // this is the default
  s3RetryDelay: 2000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
};
var client = s3.createClient(options);

var skyboxUpload = multer({storage: multerS3({
    s3: s3,
    bucket: 'odinvr',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      var newFileName = Date.now() + "-" + file.originalname;
      var fullPath = 'public/skyboxes/'+ newFileName;
      cb(null, fullPath);
    }
  })
});


var modelUpload = multer({dest: 'temp/models', limits: { fileSize: 25000000 }});

function extractModelTempAndUpload(file,callback) {
  const stream = fs.createReadStream(file.path).pipe(unzip.Extract({path:file.path}));
  stream.on('finish', function () { 
    console.log("finished")
    setTimeout(function() {
      if (!fs.existsSync(file.path + "/model.dae")) {
        callback(null,'ZIP contents invalid');
        fs.remove(file.path);
        return
      }
      console.log(file.path)
      var params = {
        localDir: '/Users/Andrew/Documents/Projects/BoilermakeVR/backend/' + file.path,
        deleteRemoved: false, // default false, whether to remove s3 objects
                            // that have no corresponding local file.
        s3Params: {
          Bucket: "odinvr",
          Prefix: "public/models/" + file.filename,
          // other options supported by putObject, except Body and ContentLength.
          // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
        },
      };
      var uploader = client.uploadDir(params);
      uploader.on('error', function(err) {
        console.error("unable to sync:", err.stack);
      });
      uploader.on('progress', function() {
        console.log("progress", uploader.progressAmount, uploader.progressTotal);
      });
      uploader.on('end', function() {
        console.log("done uploading");
        fs.remove(file.path);
        callback('http://odinvr.s3.us-east-2.amazonaws.com/public/models/' + file.filename,null);
      });
    },500);
  });
  stream.on('error', function(e) {
    console.log("error",e);
    callback(null,'Invalid model: not a valid model ZIP file');
  });  
}

function deleteModelFile(model,callback) {

  if(!model.filename || model.filename.length == 0) {
    callback({error: "Invalid model file name."})
    return
  }

  var params = {
    Bucket: 'odinvr',
    Prefix: 'public/models/' + model.filename + '/'
  };

  AWSs3.listObjects(params, function(err, data) {
    if (err) return callback({error: err});

    if (data.Contents.length == 0) callback({error: "No content to delete"});

    params = {Bucket: 'odinvr'};
    params.Delete = {Objects:[]};

    data.Contents.forEach(function(content) {
      params.Delete.Objects.push({Key: content.Key});
    });

    AWSs3.deleteObjects(params, function(err, data) {
      if (err) return callback({error: err});
      callback(model);
    });
  });
}

module.exports.extractModelTempAndUpload = extractModelTempAndUpload;
module.exports.modelUpload = modelUpload;
module.exports.skyboxUpload = skyboxUpload;
module.exports.deleteModelFile = deleteModelFile;