const router = require('express').Router();
const File = require('../models/fileModel');

// downloading file
const downloadBtnController = async (req, res) => {
    const file = await File.findOne({ uuid: req.params.uuid });
    if (!file) {
        return res.render('download', { error: 'Link has been expired' });
    }

    const filePath = `${__dirname}/../${file.path}`;
    res.download(filePath);
};

router.get('/:uuid', downloadBtnController);

module.exports = router;
