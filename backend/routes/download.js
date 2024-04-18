const router = require('express').Router();
const File = require('../models/file');

router.get('/:uuid', async (req, res) => {
   const uuid=req.params.uuid;
   
   
   const file = await File.findOne({
      where: { uuid: req.params.uuid }
    });

   console.log(file,"from file>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
   // Link expired
   if(!file) {
        return res.render('download', { error: 'Link has been expired.'});
   } 
   const response = await file.save();
   const filePath = `${__dirname}/../${file.path}`;
   res.download(filePath);
});


module.exports = router;