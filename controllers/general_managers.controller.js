const generalManagers = require('../models/general_managers.model');
const Managers = require('../models/managers.model');
const { validationResult } = require('express-validator');
const helper = require('../config/helpers')
var crypto = require('crypto');
const url = require('url');
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const sequelize = require('../config/database');

exports.getRecords = async (req, res, next) => {
    let queryData = url.parse(req.url, true).query;
    try {
        const count = await generalManagers.findAndCountAll({ where: { is_deleted: 0, manager_id: req.params.userId } });
        let totalItems = count;
        const perPage = +queryData.limit || totalItems.count;
        const currentPage = +queryData.page || 1;
        const offset = (currentPage - 1) * perPage;
        const limit = perPage;
        const Data = await generalManagers.findAll({
            include: [
                {
                    model: Managers,
                    attributes: ['id', 'first_name'],
                },
            ],
            where: { is_deleted: 0, manager_id: req.params.userId }, limit, offset
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
        const Data = await generalManagers.findAll({
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

exports.postRecords = async (req, res, next) => {
    // function generateP() {
    //     var pass = '';
    //     var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    //         'abcdefghijklmnopqrstuvwxyz0123456789@#$';
    //     for (i = 1; i <= 8; i++) {
    //         var char = Math.floor(Math.random()
    //             * str.length + 1);
    //         pass += str.charAt(char)
    //     }
    //     return pass;
    // }

    // var password = generateP();
    // console.log("Generated  Password : " + password);
    // var hash = crypto.createHash('sha512');
    // let data = hash.update(password, 'utf-8');
    // gen_hash = data.digest('hex');
    console.log(req.body.manager_id)
    console.log(req.body.notification_setting_menager)
    const t = await sequelize.transaction();
    try {
        const user = await generalManagers.create({
            manager_id: req.body.manager_id,
            reminder_setting_manager: req.body.reminder_setting_manager,
            notification_setting_menager: req.body.notification_setting_menager,
            extension_survey_period: req.body.extension_survey_period,
        }, { transaction: t })
        t.commit();
        if (!user) {
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
    // var hash = crypto.createHash('sha512');
    // data = hash.update(req.body.password, 'utf-8');
    // gen_hash = data.digest('hex');
    try {
        const userdetails = await generalManagers.update({
            manager_id: req.body.manager_id,
            reminder_setting_manager: req.body.reminder_setting_manager,
            notification_setting_menager: req.body.notification_setting_menager,
            extension_survey_period: req.body.extension_survey_period,
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
    const gen_hash = crypto.createHash('sha512').update(req.body.password).digest('hex')
    console.log(req.params.id, req.body.password, gen_hash);
    try {
        const managerdetails = await Managers.update({
            password: gen_hash,
        },
            { where: { id: req.params.id } });
        if (!managerdetails) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
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
