const multer = require('multer');

    exports.fileStorage= multer.diskStorage({
        destination: (req, file, cb) => {
            console.log('here');
            cb(null, './assets/images')
        },
        filename: (req, file, cb) => {
            // cb(null, new Date().toISOString() + '-' + file.originalname)
            cb(null, file.originalname)
        }
    })
    exports.fileFilter=(req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'video/mp4') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }