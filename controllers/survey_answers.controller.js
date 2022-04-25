const Options = require('../models/option.model');
const helper = require('../config/helpers');
const url = require('url');
const User = require('../models/users.model');
const survey_answers = require('../models/survey_answers.model');
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const sequelize = require('../config/database');



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
            surveyor_id: req.body.surveyor_id,
            question_id: req.body.question_id,
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
            surveyor_id: req.body.surveyor_id,
            question_id: req.body.question_id,
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

