const multer = require('multer');


module.exports.files={

    storage:function(){
        let storage = multer.diskStorage({
        destination: function (req, file, nex) {
          nex(null, '../public/files')
        },
        filename: function (req, file, nex) {
            nex(null, file.profile)
        }
    })
      
    return storage;
},
    allowedFile:function(req, file, cb) {
        
        if (!file.profile.match(/\.(pdf|doc|txt|jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only  files are allowed!';
            return cb(new Error('Only  files are allowed!'), false);
        }
        cb(null, true);
    }
}