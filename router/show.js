const router = require('express').Router();
const File = require('../models/fileModel');
const donenv = require('dotenv').config();

// download page rendering and link
const downloadLinkGeneration = async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        if (!file) {
            return res.render('download', { error: 'Link has been expired.' });
        }
        return res.render('download', {
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            // download Link will be in form of :: http://127.0.0.1:3000/files/download/${file.uuid},
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
        });
    } catch (err) {
        return res.render('download', { error: 'something went wrong.' });
    }
};

router.get('/:uuid', downloadLinkGeneration);

module.exports = router;
