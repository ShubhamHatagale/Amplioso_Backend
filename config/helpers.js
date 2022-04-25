// const Mysqli = require('mysql2');
const jwt = require('jsonwebtoken');
const log4js = require('log4js')
const multer = require('multer');
const nodemailer = require("nodemailer");


// Logger configuration
log4js.configure({
    appenders: { fileAppender: { type: 'file', filename: 'logs/all-the-logs.log' } },
    categories: { default: { appenders: ['fileAppender'], level: 'info' } }
});

// Create the logger
const logger = log4js.getLogger();

// log4js.configure({
//     appenders: {
//       everything: { type: 'dateFile', filename: 'log/all-the-logs.log', pattern: '.yyyy-MM-dd-hh', compress: true }
//     },
//     categories: {
//       default: { appenders: [ 'everything' ], level: 'debug'}
//     }
//   });

// const logger=log4js.getLogger();
const SendMail = (toEmail, toBcc, sub, content, res) => {
    console.log(process.env.GMAIL_PASS + " " + process.env.GMAIL_USER);
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    var mailOptions = {
        from: process.env.GMAIL_USER,
        to: toEmail,
        bcc: toBcc,
        subject: sub,
        html: content,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
            res.json({ massage: "Check Ur Email" });
        }
    });
}

const SendManagerMail = (toEmail, toCc, sub, content, res) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_Manger_USER,
            pass: process.env.GMAIL_Manager_PASS,
        },
    });
    var mailOptions = {
        from: process.env.GMAIL_Manger_USER,
        to: toEmail,
        cc: toCc,
        subject: sub,
        html: content,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
            res.json({ massage: "Check Ur Email" });
        }
    });
}

module.exports = {
    logger: logger,
    SendMail: SendMail,
    SendManagerMail: SendManagerMail,
    fileStorage: multer.diskStorage({
        destination: (req, file, cb) => {
            console.log('here');
            cb(null, './assets/images')
        },
        filename: (req, file, cb) => {
            // cb(null, new Date().toISOString() + '-' + file.originalname)
            cb(null, file.originalname)
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'video/mp4') {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }

};
