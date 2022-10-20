const Options = require('../models/option.model');
const helper = require('../config/helpers');
const url = require('url');
const User = require('../models/users.model');
const survey_feedback = require('../models/survey_feedback.model');
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const sequelize = require('../config/database');
const { QueryTypes } = require('sequelize');
const Managers = require('../models/managers.model');


exports.getRecords = async (req, res, next) => {
    let queryData = url.parse(req.url, true).query;
    try {
        const Data = await survey_feedback.findAll({
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


exports.getRecordById = async (req, res, next) => {
    try {
        const Data = await survey_feedback.findAll({
            where: { surveyor_id: req.params.surveyor_id }
        });
        if (!Data) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            status: 200,
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



exports.postRecords = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const survey = await survey_feedback.create({
            question_id: req.body.question_id,
            feature: req.body.feature,
            feature1: req.body.feature1,
            feature2: req.body.feature2,
            feature3: req.body.feature3,
            feature4: req.body.feature4,
            feature5: req.body.feature5,
            feature6: req.body.feature6,
            feature7: req.body.feature7,
            feature8: req.body.feature8,
            surveyor_id: req.body.surveyor_id,
            employee_id: req.body.employee_id,
            manager_id: req.body.manager_id,
            company_id: req.body.company_id,
            created_by: req.body.created_by,
            updated_by: req.body.updated_by,
            created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        }, { transaction: t })
        t.commit();

        if (!survey) {
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
    var feat = `feature1`;
    try {
        const userdetails = await survey_feedback.update({
            feature: req.body.feature,
            feature1: req.body.feature1,
            feature2: req.body.feature2,
            feature3: req.body.feature3,
            feature4: req.body.feature4,
            feature5: req.body.feature5,
            feature6: req.body.feature6,
            feature7: req.body.feature7,
            feature8: req.body.feature8,
            updated_by: req.body.updated_by,
            updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
        },
            { where: { surveyor_id: req.params.surveyor_id } }, { transaction: t });
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
    try {
        const details = await survey_feedback.delete(
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

exports.getRecordByCompanyId = async (req, res, next) => {
    try {
        const Data = await survey_feedback.findAll({
            where: { company_id: req.params.company_surveyor_id }
        });
        // const Data1 = await Managers.findAll({
        //     where: { company_id: req.params.company_surveyor_id }
        // });

        if (!Data) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            status: 200,
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
