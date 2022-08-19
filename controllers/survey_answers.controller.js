const Options = require('../models/option.model');
const helper = require('../config/helpers');
const url = require('url');
const User = require('../models/users.model');
const survey_answers = require('../models/survey_answers.model');
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const sequelize = require('../config/database');
const { QueryTypes } = require('sequelize');


exports.getRecords = async (req, res, next) => {
    let queryData = url.parse(req.url, true).query;
    try {
        const Data = await survey_answers.findAll({
            where: { is_deleted: '0' }
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
        const Data = await survey_answers.findAll({
            include: [
                { model: survey_answers, as: 'survey_answers', attributes: ['id', 'survey_answers'] }],
            where: { survey_answers_id: req.params.Q_id, is_deleted: '0' }
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


exports.getRecordsByOptionUser = async (req, res, next) => {
    try {
        const Data = await survey_answers.findOne({
            where: { surveyor_id: req.body.surveyor_id, question_id: req.body.question_id }
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

exports.getReportData = async (req, res, next) => {
    console.log(req.body.company_id)
    try {
        const Data = await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=${req.body.company_id})*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${req.body.manager_id} AND option_id=${req.body.option_id} AND is_deleted=0`, { type: QueryTypes.SELECT });
        res.status(200).json({
            message: "Result Fetched",
            data: Data,
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}

exports.getquestionOptionAnswers = async (req, res, next) => {
    try {
        const Data = await sequelize.query(`SELECT * FROM survey_answers, options WHERE survey_answers.option_id = options.id AND survey_answers.question_id=${req.body.question_id} AND survey_answers.surveyor_id=${req.body.surveyor_id} AND survey_answers.answer!="false"`, { type: QueryTypes.SELECT });
        // res.json({
        //     data: Data[9],
        // })


        res.status(200).json({
            message: "Result Fetched",
            data: Data,
            // data0: Data[0] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[0].manager_id} AND option_id=${Data[0].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            // data1: Data[1] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[1].manager_id} AND option_id=${Data[1].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            // data2: Data[2] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[2].manager_id} AND option_id=${Data[2].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            // data3: Data[3] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[3].manager_id} AND option_id=${Data[3].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            // data4: Data[4] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[4].manager_id} AND option_id=${Data[4].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            // data5: Data[5] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[5].manager_id} AND option_id=${Data[5].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            // data6: Data[6] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[6].manager_id} AND option_id=${Data[6].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            // data7: Data[7] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[7].manager_id} AND option_id=${Data[7].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            // data8: Data[8] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[8].manager_id} AND option_id=${Data[8].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            // data9: Data[9] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[9].manager_id} AND option_id=${Data[9].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            // data10: Data[10] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE id=manager_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[10].manager_id} AND option_id=${Data[10].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,

            data0: Data[0] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[0].manager_id} AND option_id=${Data[0].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            data1: Data[1] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[1].manager_id} AND option_id=${Data[1].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            data2: Data[2] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[2].manager_id} AND option_id=${Data[2].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            data3: Data[3] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[3].manager_id} AND option_id=${Data[3].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            data4: Data[4] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[4].manager_id} AND option_id=${Data[4].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            data5: Data[5] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[5].manager_id} AND option_id=${Data[5].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            data6: Data[6] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[6].manager_id} AND option_id=${Data[6].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            data7: Data[7] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[7].manager_id} AND option_id=${Data[7].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            data8: Data[8] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[8].manager_id} AND option_id=${Data[8].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            data9: Data[9] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[9].manager_id} AND option_id=${Data[9].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            data10: Data[10] ? await sequelize.query(`SELECT SUM(answer)/COUNT(id) as survey_mean,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id) as internal_bench,SUM(answer)/COUNT(id)*COUNT(id)/(SELECT COUNT(id) FROM managers WHERE company_id=company_id)*COUNT(id)/(SELECT COUNT(id) FROM companies AS comp_counts) as external_bench FROM survey_answers WHERE manager_id=${Data[10].manager_id} AND option_id=${Data[10].option_id} AND is_deleted=0`, { type: QueryTypes.SELECT }) : null,
            status: 200,


        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}



// getFilteredAnswer
exports.getFilteredAnswer = async (req, res, next) => {
    try {
        // console.log('/033c')
        // survey_answers.hasOne(Options); 
        // Options.belongsTo(survey_answers);

        // const Data1 = await Options.findAll({
        //     where: { is_deleted: '0', question_id: req.body.question_id },
        // });

        const Data = await survey_answers.findAll({
            where: { surveyor_id: req.body.surveyor_id, question_id: req.body.question_id }
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
    const t = await sequelize.transaction();
    try {
        const Option = await survey_answers.create({
            option: req.body.option,
            survey_answers_id: req.body.survey_answers_id,
        }, { transaction: t })
        t.commit();
        if (!Option) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Post created successfully!',
        });
    } catch (error) {
        t.rollback();
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Post data',
            status: 500
        });
    }

};

exports.postRecordsStep1 = async (req, res, next) => {
    // var tt = moment().tz(TZ).utcOffset("+05:30").format();
    const t = await sequelize.transaction();

    try {
        const SurveyStep1 = await survey_answers.create({
            survey_id: req.body.survey_id,
            survey_user_mapping_id: req.body.survey_user_mapping_id,
            employee_id: req.body.employee_id,
            surveyor_id: req.body.surveyor_id,
            question_id: req.body.question_id,
            manager_id: req.body.manager_id,
            company_id: req.body.company_id,
            option_id: req.body.option_id,
            answer: req.body.answer,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();

        if (!SurveyStep1) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Post created successfully!',
        });
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Post data',
            status: 500
        });
    }
};




exports.updateRecords = async (req, res, next) => {
    const t = await sequelize.transaction();
    // var tt = moment().tz(TZ).utcOffset("+05:30").format();

    // console.log(tt+"<---------mmmmmmmmttttt");


    try {
        const SurveyStep1 = await survey_answers.update({
            survey_id: req.body.survey_id,
            survey_user_mapping_id: req.body.survey_user_mapping_id,
            employee_id: req.body.employee_id,
            surveyor_id: req.body.surveyor_id,
            question_id: req.body.question_id,
            manager_id: req.body.manager_id,
            company_id: req.body.company_id,
            option_id: req.body.option_id,
            answer: req.body.answer,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),

        },
            { where: { id: req.params.id } }, { transaction: t });
        t.commit();

        if (!SurveyStep1) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Post created successfully!',
        });
    } catch (error) {
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Post data',
            status: 500
        });
    }
}

exports.deleteRecords = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const details = await survey_answers.delete(
            { where: { id: req.params.id } });
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

exports.getAllSurveyAnswers = async (req, res, next) => {
    try {
        const Data = await survey_answers.findAll({
            where: { surveyor_id: req.body.surveyor_id, question_id: req.body.question_id }
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

        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
