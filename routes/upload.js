const express = require('express');
const router = express.Router();
const defaultResponse = require("../helper/default-response");
var aws = require("aws-sdk");
var multerS3 = require("multer-s3");
aws.config.update({
    secretAccessKey: "MZHyfnx57qABt1F9StsSxBt6KC+7a0PprSapWSqG",
    accessKeyId: "AKIAI5OMFMC4ONBF2P5Q",
    region: "us-east-1"
})
var s3 = new aws.S3();
var multer = require('multer')
var upload = multer({ dest: 'images/' })
var upload = multer({
    storage: multerS3({
        s3: s3, bucket: "imageuploadsalamtech", key: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
})

function routes() {
    router.post('/', upload.array('image', 1), function (req, res, next) {
        defaultResponse.success(res,`${req.files[0].location}`, [] );
    })
    return router;

}

module.exports = routes;
