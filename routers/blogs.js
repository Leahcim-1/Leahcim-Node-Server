var express = require('express');
var bodyParser = require('body-parser');
var cookieParse = require('cookie-parser');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
const connectDB = require('../MongoDB/index')
const qs = require('qs');

var upload = multer({dest: './static/'});

var blogRouter = express.Router();
blogRouter.use(bodyParser.json());
blogRouter.use(bodyParser.urlencoded({ extended: false }));

const { Blog, Draft, Category } = connectDB(mongoose);




blogRouter.use(function (req, res, next) {
    console.log(req.url);
    console.log('%s %s %s', req.method, req.url, req.path)
    next()
})

// Initiailzied Blog
blogRouter.get('/init_blog', (req, res) => {
    let category = [];
    Category.find({}, (err, result) => {
        if (err) console.log(err)

        catagory = [...result]
    })
    // Check Are there any empty documents
    Blog.find({title: ""}, (err, result) => {
       if (result) {
            result.forEach(docs => {
                docs.remove(err => {
                    if (err) {
                        console.log(err);
                    }
                })
           })
       }
     })
    Blog.create({title: ""})
        .then(docs => {
            console.log(docs._id);
            res.send({
                code: 0,
                id: docs._id,
                catagory: catagory
            });
        })
})

// Uploads Picture 
blogRouter.post('/upload_cover', upload.single("image"), (req, res) => {

    let storePath = `static/${req.body.id}/`

    if (!fs.existsSync(`${global}/${storePath}`)){
        fs.mkdirSync(storePath)
    };
    
    storePath = storePath + 'cover/'
    console.log(storePath);
    fs.mkdirSync(storePath);

    let picPath = storePath + Date.now() + parseInt(Math.random() * 2)+req.file.originalname;

    fs.rename(req.file.path, picPath, err => {
        if (err) {
            console.log(err)
            return res.send({
                code: 1,
                message: "Upload Cover Picture Fails"
            })
        }

        console.log(req.file)

        Blog.findByIdAndUpdate(req.body.id, {coverPicPath: `${picPath}`}, (err, result) => {
            if (err){
                return res.send({
                    code: 1,
                    message: "Save Cover Picture Fails"
                })
            }
            if(result) {
                res.send({
                    code: 0,
                    coverPicPath: picPath
                })
            }
        });
    })
        
})

// Add Blog
blogRouter.post('/add_blog', (req, res) => {
    if (req) {
        const blog = qs.parse(req.body);
        console.log(blog)
        let isDraft = blog.isDraft;

        if (isDraft === "true") {
            Draft.create({blogId: `${blog.id}`})
            .then(result => {
                res.send({
                    code: 0,
                    message: "Successfully Save Your Draft"
                })
            })
            .catch(err => {
                res.send({
                    code: 1,
                    message: "Fail To Save Your Draft Due To" + err,
                })
            })
        }
        else {
            Blog.findByIdAndUpdate(blog.id, blog, err => {
                if (err) {
                    return res.send({
                        code: 1,
                        message: "Fail To Publish Your Blog Due To" + err,
                    })
                }
                res.send({
                    code: 0,
                    message: "Successfully Publish Your Blog",
                })
            })
        }
    }
})

//Show blog
blogRouter.get('/get_blog', (req, res) => {
    if (req) {
        const condition = req.query;
        Blog.find( condition, (err, result) => {
            if (!err) {
                res.send({
                    code: 0,
                    blogs: result
                })
            }
        })
    }
})


module.exports = blogRouter;