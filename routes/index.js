var express = require('express');
var router = express.Router();
var multer = require('multer')
var upload = multer({dest: 'uploads/'});

/* GET home page. */

// router.post('/dangKy', upload.single('file'),function (req,res,next) {
//     var email = req.body.email;
//     var password = req.body.password;
//     var fileName = req.body.file;
//
//     console.log(password);
//     console.log(fileName);
//
//     res.send('Upload File Thanh Cong' + email);
//
//
//
// });

// router.post('/dangKy', upload.array('file',6),function (req,res,next) {
//     var email = req.body.email;
//     var password = req.body.password;
//     var fileName = req.body.files.length;//tong so file đc upload lên
//
//     console.log(password);
//     console.log(fileName);
//
//     res.send('Upload File Thanh Cong' + email);
//
// });

var storage = multer.diskStorage({
    destination: function(req,res,cb){
        cb(null,'uploads');
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + Math.random() + file.originalname);

    },


});
var upload = multer({
    storage:storage,
    limits: {fileSize: 2*1024*1024}//gioiws han kich thuoc

}).array('file',6);

// var upload = multer({storage:storage}).array('file',6);

router.post('/dangKy', upload,function (req,res,next) {
    upload(req,res,function (err) {
        if(err instanceof multer.MulterError){
            res.send(err.message);
        }else{
            var email = req.body.email;
            var password = req.body.password;
            var fileName = req.body.files;//tong so file đc upload lên

            console.log(password);
            console.log(fileName);

            res.send('Upload File Thanh Cong' + email);
        }
    })

});









router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/index.ejs', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
