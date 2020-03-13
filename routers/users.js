var express = require('express');
var bodyParser = require('body-parser');
var cookieParse = require('cookie-parser');
var crypto = require('crypto');
var multer = require('multer');
var mongoose = require('mongoose');
const connectDB = require('../MongoDB/index');
var { encryptPwd } = require('../utils/crypto');
const qs = require('qs');
var jwt = require('jsonwebtoken')

var upload = multer();

var userRouter = express.Router();

userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: false }));


const { User } = connectDB(mongoose);

const accessTokenSecret = 'iloveastoria';

// const pwd = encryptPwd('a578287412');

// const user = {
//     username: 'leahcim',
//     password: pwd,
//     admin: true,
//     email: 'xinhaosu@126.com',
//     birthDate: Date('1995/11/27'),
// }

// const newUser = new User(user);
// newUser.save().then(product => console.log(product)).catch(err => console.log(err))



userRouter.use(function (req, res, next) {
    console.log(req.url);
    console.log(req.headers.authorization)
    console.log('%s %s %s', req.method, req.url, req.path);
    next()
})

//Router auth 
userRouter.get('/auth', (req, res) => {
    console.log(req.headers.authorization)
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, playload) => {
            if (err) {
                res.send({code: 1})
            }
            res.send({code: 0, ...playload})
        });
    } else {
       
    }

})

// Login auth
userRouter.post('/login', (req, res) => {
    if (req) {
        
        User.findOne({ username: req.body.username, password: encryptPwd(req.body.password) }, (err, docs) => {
            if (!err) {
                if (docs) {
                    let token = jwt.sign({ admin: true }, "iloveastoria", { expiresIn: '1d' });
                    res.send(
                        {
                            code: 0,
                            username: req.body.username,
                            connected: true,
                            authorized: true,
                            token: token
                        }
                    )
                }
                else {
                    res.send(
                        {
                            code: 1,
                            username: req.body.username,
                            connected: true,
                            authorized: false,
                            token: null
                        }
                    )

                }
            }
            else {
                console.log(err);
            }
        })

    }
})



module.exports = userRouter;