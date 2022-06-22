const Questions = require('../models/question.model');
const helper = require('../config/helpers')
const url = require('url');
const User = require('../models/users.model');
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const sequelize = require('../config/database');
const Company = require('../models/companies.model');

exports.getRecords = async (req, res, next) => {
    let queryData = url.parse(req.url, true).query;
    try {
        const count = await Questions.findAndCountAll({ where: { is_deleted: '0' } });
        let totalItems = count;
        const perPage = +queryData.limit || totalItems.count;
        const currentPage = +queryData.page || 1;
        const offset = (currentPage - 1) * perPage;
        const limit = perPage;
        const Data = await Questions.findAll({
            include: [
                { model: Company, as: 'QuestionCreated', attributes: ['id', 'company_name'] }],
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

exports.getRecordsByComId = async (req, res, next) => {
    try {
        const Data = await Questions.findAll({
            include: [
                { model: Company, as: 'QuestionCreated', attributes: ['id', 'company_name'] }],
            where: { company_id: req.params.ComId, is_deleted: '0' }
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

exports.getRecordsByQueType = async (req, res, next) => {
    try {
        const Data = await Questions.findAll({
            // include: [
            //     { model: Company, as: 'QuestionCreated', attributes: ['id', 'company_name'] }],
            where: { question_type: req.params.Qtype, is_deleted: '0' }
        });
        if (!Data) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            status:200,
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
        const Data = await Questions.findAll({
            include: [
                { model: Company, as: 'QuestionCreated', attributes: ['id', 'company_name'] }],
            where: { id: req.params.Q_id, is_deleted: '0' }
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
        const Question = await Questions.create({
            company_id: req.body.company_id,
            question_type: req.body.question_type,
            question: req.body.question,
        }, { transaction: t })
        t.commit();
        if (!Question) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        res.status(200).json({
            status: 200,
            resultId: Question.dataValues.id,
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
        const Question = await Questions.update({
            company_id: req.body.company_id,
            question_type: req.body.question_type,
            question: req.body.question,
        },
            { where: { id: req.params.Q_id } }, { transaction: t });
        t.commit();
        if (!Question) {
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
        const Details = await Questions.update({
            is_deleted: '1'
        },
            { where: { id: req.params.id } }, { transaction: t });
        t.commit();
        if (!Details) {
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

