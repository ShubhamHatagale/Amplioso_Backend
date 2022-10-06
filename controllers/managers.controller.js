const Managers = require('../models/managers.model');
const Company = require('../models/companies.model');
const { validationResult } = require('express-validator');
const helper = require('../config/helpers')
var crypto = require('crypto');
const url = require('url');
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const sequelize = require('../config/database');
const Role = require('../models/roles.model');
const { QueryTypes } = require('sequelize');


// exports.getAllManagersRecords = async (req, res, next) => {
//     try {
//         const Data = await Managers.findAll({
//             // include: [
//             //     {
//             //         model: Company,
//             //         attributes: ['id', 'company_name'],
//             //     },
//             // ],
//             where: { is_deleted: '0' },
//         });
//         if (!Data) {
//             return res.status(404).json({
//                 status: 404,
//                 message: 'could not find result',
//             })
//         }
//         res.status(200).json({
//             message: "Result Fetched",
//             data: Data
//         })
//     } catch (error) {
//         if (!error.statusCode) {
//             error.statusCode = 500;
//         }
//         next(error);
//         helper.logger.info(error)
//     }
// }

exports.getRecords = async (req, res, next) => {
    let queryData = url.parse(req.url, true).query;
    try {
        const count = await Managers.findAndCountAll({ where: { is_deleted: 0, company_id: req.params.comId } });
        let totalItems = count;
        const perPage = +queryData.limit || totalItems.count;
        const currentPage = +queryData.page || 1;
        const offset = (currentPage - 1) * perPage;
        const limit = perPage;
        const Data = await Managers.findAll({
            include: [
                // {
                //     model: Company,
                //     attributes: ['id', 'company_name'],
                // },
                {
                    model: Role,
                    as: 'ViewRole',
                    attributes: ['id', 'role'],
                },
            ],
            where: { is_deleted: 0, company_id: req.params.comId }, limit, offset
        });
        if (!Data) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: Data,
            status: 200,
            totalItems: totalItems.count
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getusersRecords = async (req, res, next) => {
    try {
        const results = await sequelize.query(`SELECT first_name,last_name,user_email,role  FROM managers  WHERE company_id='${req.params.comId}'AND is_deleted='0' UNION  SELECT first_name,last_name,user_email,role FROM employee  WHERE company_id='${req.params.comId}'AND is_deleted='0'  UNION  SELECT first_name,last_name,user_email,role FROM collect_feedback  WHERE company_id='${req.params.comId}'AND is_deleted='0'`, { type: QueryTypes.SELECT });
        res.status(200).json({
            message: "Result Fetched",
            status: 200,
            data: results,
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}

exports.getRecordsById = async (req, res, next) => {
    try { 
        const Data = await Managers.findAll({
            // include: [
            //     {
            //         model: Company,
            //         attributes: ['id', 'company_name'],
            //     },
            // ],
            where: { id: req.params.userId, is_deleted: '0' },
        });
        if (!Data) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: Data
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}

exports.getAllRecords = async (req, res, next) => {
    try {
        const Data = await Managers.findAll({
            // include: [
            //     {
            //         model: Company,
            //         attributes: ['id', 'company_name'],
            //     },
            // ],
            where: { is_deleted: '0' },
        });
        if (!Data) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            status: 200,
            data: Data
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}

exports.postRecords = async (req, res, next) => {
    console.log("ffff")
    function generateP() {
        var pass = '';
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
            'abcdefghijklmnopqrstuvwxyz0123456789@#$';
        for (i = 1; i <= 8; i++) {
            var char = Math.floor(Math.random()
                * str.length + 1);
            pass += str.charAt(char)
        }
        return pass;
    }

    var password = generateP();
    console.table(req.body.first_name + "Generated  Password : " + password);
    var hash = crypto.createHash('sha512');
    let data = hash.update(password, 'utf-8');
    gen_hash = data.digest('hex');
    const t = await sequelize.transaction();
    try {
        const results = await sequelize.query(`SELECT username  FROM companies  WHERE username='${req.body.user_email}'AND is_deleted='0' UNION  SELECT user_email FROM managers  WHERE user_email= '${req.body.user_email}'AND is_deleted='0'`, { type: QueryTypes.SELECT });
        console.log(results);
        console.log(results.length);
        if ((results.length) !== 0) {
            return res.status(200).json({
                status: 400,
                message: 'Dulpicate E-mail Found in manager',
            });
        }
        else {
            const user = await Managers.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                count: req.body.count,
                company_id: req.body.company_id,
                user_email: req.body.user_email,
                password: gen_hash,
                role: req.body.role,
                created_by: req.body.created_by,
                updated_by: req.body.updated_by,
                created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
            }, { transaction: t })
            t.commit();
            if (!user) {
                return res.status(200).json({
                    status: 404,
                    message: 'No data found'
                })
            }
            const Data = await Company.findAll({ where: { is_deleted: '0', id: req.body.company_id } });
            Data.map((item, key) => (
                CompanyName = item.dataValues.company_name
            ));
            console.log(CompanyName);
            const sub = `${CompanyName}: Welcome to Amplioso.com!`;
            // const toBcc = ['ravikantmadas@gmail.com', 'shubhamhatagale02@gmail.com'];
            const toBcc = [req.body.user_email];

            const content = ` <p>Dear ${req.body.first_name} ${req.body.last_name}</p>
        <p>Greetings from Amplioso.com! We help you improve the performance of your teams by getting 360-degree performance feedback right. </p>
        <p>${CompanyName} has taken an important step of assigning you as a manager with our portal. Your account has now been activated.  </p>
        <p>You now have access to our exclusive Manager portal from where you’ll be able to launch and manage feedback surveys for your teams, view results, administer settings and much more.  You can log in to the portal on our website (Amplioso.com) using the <a href="http://dev.amplioso.com/">Log</a> In link at the top of the home page</p>
        <p>Username: ${req.body.user_email}</p>
        <p>Password: ${password}</p>
        <p>Please also be sure to visit our FAQs page for frequently asked questions and tips. Should you need anything else in the interim or have feedback for us, please do not hesitate to reach out to us at portalsupport@amplioso.com.</p>
        <br/><p>Welcome!</p>
        <p>Amplioso Support Team</p>
        <p><a href="http://dev.amplioso.com/">www.amplioso.com</a></p>
        <p>Feedback done right</p>`;
            const toEmail = req.body.user_email;
            helper.SendMail(toEmail, toBcc, sub, content, res);
            res.status(200).json({
                status: 200,
                message: 'Post created successfully!',
            });
        }
    } catch (error) {
        t.rollback();
        helper.logger.info(error)
        return res.status(500).send({
            status: 500,
            message: 'Unable to Post data',
        });
    }
};

exports.updateRecords = async (req, res, next) => {
    const t = await sequelize.transaction();
    // var hash = crypto.createHash('sha512');
    // data = hash.update(req.body.password, 'utf-8');
    // gen_hash = data.digest('hex');
    try {
        // const results = await sequelize.query(`SELECT username  FROM companies  WHERE username='${req.body.user_email}'AND is_deleted='0' UNION  SELECT user_email FROM managers  WHERE user_email= '${req.body.user_email}'AND is_deleted='0'`, { type: QueryTypes.SELECT });
        // console.log(results);
        // console.log(results.length);
        // if ((results.length) !== 0) {
        //     return res.status(200).json({
        //         status: 400,
        //         message: 'Dulpicate E-mail Found',
        //     });
        // }
        // else {
        const userdetails = await Managers.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            count: req.body.count,
            company_id: req.body.company_id,
            user_email: req.body.user_email,
            // password: req.body.password,
            role: req.body.role,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { id: req.params.userId } }, { transaction: t });
        t.commit();
        if (!userdetails) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Data Updated Successfully',
        });
        // }
    } catch (error) {
        t.rollback();
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Update data',
            status: 500
        });
    }
}
exports.deleteRecords = async (req, res, next) => {
    const t = await sequelize.transaction();
    const userId = req.params.id;
    try {
        const details = await Managers.update({
            is_deleted: 1
        },
            { where: { id: userId } }, { transaction: t });
        t.commit();
        if (!details) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Record Deleted Successfully',
        });
    } catch (error) {
        t.rollback();
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Delete Record',
            status: 500
        });
    }
};

exports.postResetpassword = async (req, res, next) => {
    let ManagerEmail, firstName, lastName;
    const gen_hash = crypto.createHash('sha512').update(req.body.password).digest('hex')
    console.log(req.params.id, req.body.password, gen_hash);
    try {
        const managerdetails = await Managers.update({
            password: gen_hash,
        },
            { where: { id: req.params.id } });
        const Data = await Managers.findAll({
            include: [
                // {
                //     model: Company,
                //     attributes: ['id', 'company_name'],
                // },
                {
                    model: Role,
                    as: 'ViewRole',
                    attributes: ['id', 'role'],
                },
            ], where: { id: req.params.id, is_deleted: '0' }
        });
        Data.map((item, key) => (
            ManagerEmail = item.dataValues.user_email,
            firstName = item.dataValues.first_name,
            lastName = item.dataValues.last_name
        ));
        console.log(ManagerEmail);
        if (!managerdetails) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        const sub = " Amplioso.com Acknowledgement: Password change  ";
        const toBcc = [ManagerEmail];
        const content = ` <p>Dear ${firstName} ${lastName}</p>
        <p>Greetings from Amplioso.com! Just a note to let you know that your password has been successfully changed with us just a few moments ago.</p>
        <p>Should you need anything else in the interim or have feedback for us, please do not hesitate to reach out to us at portalsupport@amplioso.com.</p>
        <br/><p>Thank you for your patronage</p>
        <p>Amplioso Support Team</p>
        <p><a href="http://dev.amplioso.com/">www.amplioso.com</a></p>`;
        const toEmail = ManagerEmail;
        helper.SendMail(toEmail, toBcc, sub, content, res);
        res.status(200).json({
            status: 200,
            message: 'Password Updated Successfully',
        });
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Update data',
            status: 500
        });
    }
}
exports.forgotPassword = async (req, res, next) => {
    let firstName;
    let lastName;
    function generateP() {
        var pass = '';
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
            'abcdefghijklmnopqrstuvwxyz0123456789@#$';
        for (i = 1; i <= 8; i++) {
            var char = Math.floor(Math.random()
                * str.length + 1);
            pass += str.charAt(char)
        }
        return pass;
    }
    var password = generateP();
    console.table("Manager Generated  Password : " + password);
    const gen_hash = crypto.createHash('sha512').update(password).digest('hex')
    console.log("Hashed Password: " + gen_hash);
    try {
        const Data = await Managers.findAll({
            include: [
                // {
                //     model: Company,
                //     attributes: ['id', 'company_name'],
                // },
                {
                    model: Role,
                    as: 'ViewRole',
                    attributes: ['id', 'role'],
                },
            ], where: { user_email: req.body.user_email, is_deleted: '0' }
        });
        if (Data === null) {
            return res.status(404).json({ error: "user dont exits with email" });
        }
        Data.map((item, key) => (
            firstName = item.first_name,
            lastName = item.last_name
        ));
        const ManagaerDetails = await Managers.update({
            password: gen_hash,
        },
            { where: { user_email: req.body.user_email } });
        if (!ManagaerDetails) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        const sub = " Amplioso.com: We’ve got a new temporary password for you! ";
        const toBcc = [req.body.user_email];
        const content = ` <p>Dear ${firstName} ${lastName}</p>
      <p>Greetings from Amplioso.com! We’ve received your request to provide a new temporary password for your account. Here it is:    </p>
      <p>Temporary Password : ${password}</p>
      <p>This password is only valid for another 24 hours. You are requested to log in to your account and update your password using the UPDATE PASSWORD tile on your Portal Home Screen.</p>
      <p>Should you need anything else in the interim or have feedback for us, please do not hesitate to reach out to us at portalsupport@amplioso.com.</p>
      <br/><p>Thank you for your patronage</p>
      <p>Amplioso Support Team</p>
      <p><a href="http://dev.amplioso.com/">www.amplioso.com</a></p>`;
        const toEmail = req.body.user_email;
        helper.SendMail(toEmail, toBcc, sub, content, res);
        res.status(200).json({
            status: 200,
            message: 'Password Updated Successfully',
        });
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Update data',
            status: 500
        });
    }
}