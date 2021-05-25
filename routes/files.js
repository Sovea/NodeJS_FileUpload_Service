var express = require('express');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var moment = require('moment');
var router = express.Router();
var UUID = require('uuid');

var defpath = path.join(__dirname, '../');

var postFileStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        let this_date = moment().format('YYYY-MM-DD');
        console.log(this_date);
        let path_way = path.join(__dirname, '../public/static/upload/', this_date);
        fs.access(path_way, (err) => {
            if (err) {
                fs.mkdir(path_way, function (err) {
                    if (!err) {
                        callback(null, path_way);
                    } else {
                        console.log(err);
                        return;
                    }
                })
            } else {
                callback(null, path_way);
            }
        })


    },
    filename: function (req, file, callback) {
        var fileSplit = file.originalname.split(".");
        var fileExtension = fileSplit[fileSplit.length - 1];
        callback(null, UUID.v1() + "." + fileExtension);
    }
});
var upload = multer({ storage: postFileStorage }).single("file");
router.post("/upload", function (req, res) {
    upload(req, res, function (err, results) {
        if (err) {
            console.log(err)
            res.status(500).json({
                errcode: 6,
                ermsg: "保存失败",
            });
            return;
        }
        console.log(req.file);
        let filePath = req.file.destination.split(defpath + "public/");
        console.log(filePath);
        res.status(200).json({
            errcode: 0,
            ermsg: "",
            file_name: req.file.filename,
            fileUrl: 'https://127.0.0.1:8999/' + filePath[1] +'/'+ req.file.filename
        });
    });
});
function isEmptyObject(obj) {
    var name;

    for (name in obj) {
        return false;
    }
    return true;
}
module.exports = router;
