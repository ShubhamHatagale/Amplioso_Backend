const Collect_feedback = require('../models/collect_feedback.model');
const sequelize = require('../config/database');
const { validationResult } = require('express-validator');
const helper = require('../config/helpers');
const Role = require('../models/roles.model');
const Employee = require('../models/employee.model');
const Managers = require('../models/managers.model');
const Manager = require('../models/managers.model');

const Company = require('../models/companies.model');
var moment = require("moment");
const jwt = require('jsonwebtoken');
const TZ = moment.tz("Asia/Kolkata").format();

exports.getRecords = async (req, res, next) => {
    try {
        const Data = await Collect_feedback.findAll({
            // include: [{
            //     model: Role,
            //     as: 'ViewRole',
            //     attributes: ['id', 'role'],
            // },],
            where: { is_deleted: 0 }
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


exports.getRecordsByEmpId = async (req, res, next) => {
    try {
        const Data = await Collect_feedback.findAll({
            include: [
                // { model: Managers, as: 'CFManagerId', attributes: ['id', 'first_name'] },
                // { model: Employee, as: 'CFEmployeeId', attributes: ['id', 'first_name'] },
                // { model: Company, as: 'CFCompanyId', attributes: ['id', 'company_name'] },
                {
                    model: Role,
                    as: 'ViewRole',
                    attributes: ['id', 'role'],
                },
            ],
            where: { employee_id: req.params.EmpId, is_deleted: 0 }
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
 

exports.getRecordsByManagerIdEmpIdFeedfreqYear = async (req, res, next) => {
    console.log(req.body.employee_id)
    console.log(req.body.feedback_frequency)
    console.log(req.body.year)

    // return false
    try {
        const Data = await Collect_feedback.findOne({
            // include: [{
            //     model: Role,
            //     as: 'ViewRole',
            //     attributes: ['id', 'role'],
            // },],
            where: { manager_id: req.body.manager_id,employee_id: req.body.employee_id,feedback_frequency:req.body.feedback_frequency,feedback_year:req.body.year,is_deleted: 0 }
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


exports.getRecordsByManId = async (req, res, next) => {
    try {
        const Data = await Collect_feedback.findAll({
            where: { manager_id: req.params.ManId, is_deleted: 0 }
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

exports.getRecordsByComId = async (req, res, next) => {
    try {
        const Data = await Collect_feedback.findAll({
            include: [
                // { model: Manager, as: 'CFManagerId', attributes: ['id', 'first_name'] },
                // { model: Employee, as: 'CFEmployeeId', attributes: ['id', 'first_name'] },
                // { model: Company, as: 'CFCompanyId', attributes: ['id', 'company_name'] },
                // {
                //     model: Role,
                //     as: 'ViewRole',
                //     attributes: ['id', 'role'],
                // },
            ],
            where: { company_id: req.params.ComId, is_deleted: 0 }
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







exports.getRecordsById = async (req, res, next) => {
    try {
        const Data = await Collect_feedback.findAll({
            include: [
                { model: Manager, as: 'ManagerId', attributes: ['id', 'first_name', 'last_name'] },
                { model: Company, as: 'CompanyId', attributes: ['id', 'company_name'] },
            ],
            where: { id: req.params.id, is_deleted: 0 }
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


exports.getRecordsByEmailId = async (req, res, next) => {
    try {
        const Data = await Collect_feedback.findAll({
            where: { user_email: req.params.email_id, is_deleted: 0 }
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


exports.getRecordsByFeedFreq = async (req, res, next) => {
    console.log(req.body.feedFreq)
    // return false
    try {
        const Data = await Collect_feedback.findAll({
            where: { feedback_frequency: req.body.feedFreq, employee_id: req.body.employee_id, is_deleted: 0 }
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

exports.check_survey_key = async (req, res, next) => {
    console.log(req.body.token_ele)
    try {
        const sec_key = await process.env.secret_key_for_amplioso_survey_link;
        const token_ele = req.body.token_ele;
        const userVar = await jwt.verify(token_ele, sec_key);

        if (!userVar) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            status: 200,
            data: userVar
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)

        return res.status(404).json({
            status: 404,
            message: 'could not find result',
        })

    }

};

async function survey_keyCheck(manager_id) {
    const sec_key = process.env.secret_key_for_amplioso_survey_link;
    // const token = await jwt.sign({ id: manager_id }, sec_key, {
    //     expiresIn: "15 days"
    // });
    console.log('\033c')

    // console.table({ token })

    const userVar = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTExLCJpYXQiOjE2NDQwNjUxMTIsImV4cCI6MTY0NTM2MTExMn0.D6931yo-d4P5Gvu5keUMXBy9Qtk42dW6_qpIA9rIDUo', sec_key);
    console.log(userVar)
    // return token;

}

// survey_key()

async function survey_key(manager_id) {
    const sec_key = process.env.secret_key_for_amplioso_survey_link;
    // const token = await jwt.sign({ id: manager_id }, sec_key, {
    //     expiresIn: "15 days"
    // });
    const token = jwt.sign({ id: manager_id }, sec_key,);
    // console.log('\033c')

    console.table({ token })

    // const userVar = await jwt.verify(token, sec_key);
    // console.log(userVar)
    return token;

}


console.log('\033c')
console.table({ "hi": "ddd" })


exports.getCheck = async (req, res, next) => {
    try {
        const Data = await Collect_feedback.findOne({
            order: [[`id`, `DESC`]]
        });
        console.table(Data == null ? 1 : Data.id)
        if (!Data) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            status: 200,
            data: Data.id + 1
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}



// const abc = () => {
//     console.log('\033c')
//     let activeDate = moment().tz(TZ).utcOffset("+05:30").format('YYYY-MM-DD');
//     let EndDate = moment().tz(TZ).utcOffset("+05:30").add(15, 'd').format('YYYY-MM-DD');
//     console.log(activeDate)
//     console.log(EndDate)
//     // console.log(activeDate>EndDate)
//     // console.log(activeDate.format('DD MM YYYY'))
//     console.log(moment(activeDate).isAfter(EndDate))

// }

// abc()




exports.postRecords = async (req, res, next) => {
    // const t = await sequelize.transaction();

    console.table({ "hi": "ddd" })
    console.log("req.body.file")
    console.log(req.body.first_name)
    console.log(req.body.last_name)

    // console.log(req.file)
    // console.log(req.body.file)




    const feed_last_id = await Collect_feedback.findOne({
        order: [[`id`, `DESC`]]
    });

    // console.log(req.body.file)

    // let image_name = req.file.filename;
    // if (req.file) {
    //     image_name = req.file.filename;
    // }

    // let imageUrl = req.body.company_logo;
    // if (req.file) {
    //   imageUrl = req.file.filename;
    //   Company.findByPk(req.params.comId)
    //     .then(post => {
    //       if (imageUrl !== post.company_logo) {
    //         clearImage(post.company_logo);
    //       }
    //     })
    // }

    console.log("hddh" + req.body.manager_id)
    console.log(feed_last_id)
    console.log(feed_last_id == null ? 1 : feed_last_id.id + 1)
    const tkn = await survey_key(feed_last_id == null ? 1 : feed_last_id.id + 1);
    console.table({ "_tkn:": tkn })

    const t = await sequelize.transaction();
    let EmployeeLastName, EmployeeFirstName, ManagerFirstName, ManagerLastName;
    let activeDate = moment().tz(TZ).utcOffset("+05:30").format('YYYY-MM-DD');
    let EndDate = moment().tz(TZ).utcOffset("+05:30").add(15, 'd').format('YYYY-MM-DD');
    console.log(activeDate + "  Next : " + EndDate)
    console.log("hh" + req.body.manager_id)

    try {
        const collect_feedback = await Collect_feedback.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            status: req.body.status,
            recipient_role: req.body.recipient_role,
            // prof_img: image_name,
            user_email: req.body.user_email,
            feedback_frequency: req.body.feedback_frequency,
            feedback_year: req.body.feedback_year,
            employee_id: req.body.employee_id,
            manager_id: req.body.manager_id,
            prev_manager_id: req.body.manager_id,
            company_id: req.body.company_id,
            role: req.body.role,
            token: tkn,
            period_start: activeDate,
            period_end: EndDate,
        }, { transaction: t })
        // .then(function (x) {

        //     //x = new created row
        //     // response.json( x.id );
        //     console.log("id is------>" + JSON.stringify(x.id))

        // });

        console.log("collect_feedback is------>" + JSON.stringify(collect_feedback))

        t.commit();
        const Data = await Managers.findAll({
            where: { id: req.body.manager_id, is_deleted: '0' },
        });
        Data.map((item, key) => (
            ManagerFirstName = item.dataValues.first_name,
            ManagerLastName = item.dataValues.last_name
        ));
        const EmpData = await Employee.findAll({
            where: { id: req.body.employee_id, is_deleted: '0' },
        });
        EmpData.map((item, key) => (
            EmployeeFirstName = item.dataValues.first_name,
            EmployeeLastName = item.dataValues.last_name
        ));
        if (!collect_feedback) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        } else {
            // console.log(collect_feedback.id)
            // const tkn = await survey_key(collect_feedback.id);
            // console.table({ tkn })
            console.log("mail")
            const sub = ` Action Requested: ${EmployeeFirstName} ${EmployeeLastName} Performance Feedback (${activeDate} - ${EndDate})`;
            const toBcc = ['shubhamhatagale02@gmail.com'];
            const content = ` <p>Dear ${req.body.first_name} ${req.body.last_name}</p>
            <p>The gift of rich and actionable feedback can be a powerful thing. As I put together the performance evaluation for ${EmployeeFirstName} for the ${activeDate} – ${EndDate} period, you have been identified as someone who can provide feedback that will serve as the bedrock for the assessment.</p>
            <p>We’re leveraging the feedback survey expertise of one of our partners (amplioso.com); they understand 360-degree performance feedback better than anyone else and leveraging their novel approach on the metrics that matter means that you’ll be done in just a few minutes.</p>
            <p>Please click <a href="http://dev.amplioso.com/main_amp/tkn/${tkn}">here</a> to share your feedback. Results will be kept anonymous and shared in aggregate. The survey link will be active until ${EndDate}</p>
            <p>Thank you in advance for your time and the gift of feedback. Please do not hesitate to reach out me if I can help with anything.</p>
            <br/><p>Sincerely,</p>
            <p>${ManagerFirstName} ${ManagerLastName}</p>`;
            const toEmail = req.body.user_email;
            helper.SendMail(toEmail, toBcc, sub, content, res);
            res.status(200).json({
                status: 200,
                message: 'Data Added Successfully',
            });
        }

    } catch (error) {
        t.rollback();
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Update data',
            status: 500
        });
    }
};

const clearImage = filePath => {
    dirPath = path.join(__dirname, '../assets/images', filePath);
    fs.stat(dirPath, (err, stats) => {
        if (!err) {
            if (stats.isFile()) {
                fs.unlink(dirPath, err => console.log(err));
            }
        }
    });
};


exports.updateRecords = async (req, res, next) => {
    console.log("ggg") 
    return false
    const t = await sequelize.transaction();
    // console.log(req.body.file)
    console.log("req.body.company_logo")
    console.log(req.body.company_logo)
    console.log("file")
    console.log(req.file)

    if (req.body.file) {
        imageUrl = req.body.file;
        clearImage(req.body.file);

        // Company.findByPk(req.params.id)
        //     .then(post => {
        //         if (imageUrl !== post.company_logo) {
        //             clearImage(post.company_logo);
        //         }
        //     })
    }
    // try {
    //     const collect_feedback = await Collect_feedback.update({
    //         first_name: req.body.first_name,
    //         last_name: req.body.last_name,
    //         status: req.body.status,
    //         recipient_role: req.body.recipient_role,
    //         prof_img:req.body.prof_img,
    //         user_email: req.body.user_email,
    //         employee_id: req.body.employee_id,
    //         manager_id: req.body.manager_id,
    //         prev_manager_id: req.body.manager_id,
    //         company_id: req.body.company_id,
    //         role: req.body.role,
    //     },
    //         { where: { id: req.params.id } }, { transaction: t });
    //     t.commit();
    //     if (!collect_feedback) {
    //         return res.status(200).json({
    //             status: 404,
    //             message: 'No data found'
    //         })
    //     }
    //     res.status(200).json({
    //         status: 200,
    //         message: 'Data Updated Successfully',
    //     });
    // } catch (error) {
    //     t.rollback();
    //     helper.logger.info(error)
    //     return res.status(500).send({
    //         message: 'Unable to Update data',
    //         status: 500
    //     });
    // }
}


exports.updateEndDate = async (req, res, next) => {
    console.log("ggg")
    const t = await sequelize.transaction();
    console.log(req.body.period_end)
    var EndDate;
    if (req.body.period_end == 1) {
        // let activeDate = moment().tz(TZ).utcOffset("+05:30").format('YYYY-MM-DD');
        EndDate = moment().tz(TZ).utcOffset("+05:30").add(15, 'd').format('YYYY-MM-DD');
    } else if (req.body.period_end == 2) {
        EndDate = moment().tz(TZ).utcOffset("+05:30").add(30, 'd').format('YYYY-MM-DD');
    } else if (req.body.period_end == 3) {
        EndDate = moment().tz(TZ).utcOffset("+05:30").add(90, 'd').format('YYYY-MM-DD');
    } else if (req.body.period_end == 4) {
        EndDate = moment().tz(TZ).utcOffset("+05:30").add(180, 'd').format('YYYY-MM-DD');
    }

    console.log(EndDate)

    try {
        const collect_feedback = await Collect_feedback.update({
            period_end: EndDate,
        },
            { where: { id: req.params.id } }, { transaction: t });
        t.commit();
        if (!collect_feedback) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Data Updated Successfully',
        });
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
    try {
        const details = await Collect_feedback.update({
            is_deleted: 1
        },
            { where: { id: req.params.id } }, { transaction: t });
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

exports.updateManagerId = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const EmpDetails = await Collect_feedback.update({
            manager_id: req.body.manager_id
        },
            { where: { manager_id: req.params.id } }, { transaction: t });
        t.commit();
        if (!EmpDetails) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Record Updated Successfully',
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