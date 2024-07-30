const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const storageMulter = {
    _handleFile(req, file, cb) {
        const filename = `${uuidv4()}-${file.originalname}`;
        const filePath = path.join(__dirname, '../public/uploads/', filename);

        const outStream = fs.createWriteStream(filePath);
        file.stream.pipe(outStream);

        outStream.on('error', cb);
        outStream.on('finish', () => {
            cb(null, {
                path: filePath,
                filename: filename,
            });
        });
    },
    _removeFile(req, file, cb) {
        const filePath = file.path;

        fs.unlink(filePath, (err) => {
            cb(err);
        });
    },
};

module.exports = storageMulter;
