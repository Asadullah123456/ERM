const multer = require('multer');
const path = require('path');

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../uploads/');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now();
        const originalExtension = path.extname(file.originalname);
        const newFilename = `${file.fieldname}-${timestamp}${originalExtension}`;
        
        cb(null, newFilename);
    },

});

const upload = multer({ storage: Storage });

module.exports = upload;