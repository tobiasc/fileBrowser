var fs = require('fs');
var async = require('async');

function readFolder(folderName, callback) {
    fs.readdir(folderName, function (err, data) {
        var files = data;
        async.eachOf(files, function (fileName, key, cb) {
            readFile(folderName, fileName, function (err, data) {
                if (err) {
                    cb(err);
                } else {
                    files[key] = {
                        name: files[key],
                        size: data.size,
                        ctime: data.ctime,
                        mtime: data.mtime,
                        isDir: data.isDir,
                        isFile: data.isFile
                    }
                    cb();
                }
            });
        }, function (err) {
            callback(err, data);
        });
    }); 
}

function readFile(folderName, fileName, callback) {
    fs.stat(folderName + '/' + fileName, function (err, data) {
        data.isDir = false;
        data.isFile = false;
        if (fs.lstatSync(folderName + '/' + fileName).isDirectory()) {
            data.isDir = true;
        } else if (fs.lstatSync(folderName + '/' + fileName).isFile()) {
            data.isFile = true;
        }
        callback(err, data);
    }); 
}

module.exports = {
    readFolder: readFolder,
    readFile: readFile
}
