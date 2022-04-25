const Options = require('../models/option.model');
const helper = require('../config/helpers');
const url = require('url');
const User = require('../models/users.model');
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const sequelize = require('../config/database');
const survey_analysis = require('../models/survey_analysis.model');

exports.getRecords = async (req, res, next) => {
    let queryData = url.parse(req.url, true).query;
    try {
        const count = await Options.findAndCountAll({ where: { is_deleted: '0' } });
        let totalItems = count;
        const perPage = +queryData.limit || totalItems.count;
        const currentPage = +queryData.page || 1;
        const offset = (currentPage - 1) * perPage;
        const limit = perPage;
        const Data = await Options.findAll({
            include: [
                { model: survey_analysis, as: 'survey_analysis', attributes: ['id', 'survey_analysis'] }],
            where: { is_deleted: '0' }, limit, offset,
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
exports.getRecordsById = async (req, res, next) => {
    try {
        const Data = await Options.findAll({
            include: [
                { model: survey_analysis, as: 'survey_analysis', attributes: ['id', 'survey_analysis'] }],
            where: { survey_analysis_id: req.params.Q_id, is_deleted: '0' }
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


exports.postRecords = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const Option = await Options.create({
            option: req.body.option,
            survey_analysis_id: req.body.survey_analysis_id,
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

exports.updateRecords = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const OptionDetails = await Role.update({
            option: req.body.option,
            survey_analysis_id: req.body.survey_analysis_id,
        },
            { where: { id: req.params.id } }, { transaction: t });
        t.commit();
        if (!OptionDetails) {
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
        const details = await Role.update({
            is_deleted: '1'
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

