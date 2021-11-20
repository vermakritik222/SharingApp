const path = require('path');
const router = require('express').Router();
const multer = require('multer');
const { v4: uuid4 } = require('uuid');
const File = require('../models/fileModel');

// using multer to upload files

const storage = multer.diskStorage({
    // fires argument of this function is error which is null
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 100000000 },
}).single('myfile');

const uploadingFileTOUploadsANDSavingToDB = (req, res) => {
    //store file
    upload(req, res, async (err) => {
        // validate request
        try {
            if (!req.file) {
                return res.json({
                    status: 'fail',
                    error: 'All fields are required.',
                });
            }

            if (err) {
                return res.status(500).json({
                    status: 'fail',
                    error: err.message,
                });
            }
            // store file to db
            const file = new File({
                filename: req.file.filename,
                uuid: uuid4(),
                path: req.file.path,
                size: req.file.size,
            });

            const response = await file.save();
            return res.json({
                // example of response :: http://127.0.0.1:3000/files/23456yryssrdthsrtarse3iusvbdvbsl
                file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
            });
        } catch (error) {
            console.log(error);
        }
    });
};

router.post('/', uploadingFileTOUploadsANDSavingToDB);

module.exports = router;
