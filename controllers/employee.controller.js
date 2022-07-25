const Employee = require('../models/employee.model');
const Company = require('../models/companies.model');
const Countries = require('../models/countries.model');
const Manager = require('../models/managers.model');
const sequelize = require('../config/database');
const { validationResult } = require('express-validator');
const helper = require('../config/helpers');
const Role = require('../models/roles.model');
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();


exports.getRecords = async (req, res, next) => {
    try {
        const EmpData = await Employee.findAll({
            where: { is_deleted: 0 }
        });
        if (!EmpData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: EmpData
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }
}
exports.getRecordsByManagerId = async (req, res, next) => {
    try {
        const EmpData = await Employee.findAll({
            include: [
                { model: Manager, as: 'ManagerId', attributes: ['id', 'first_name'] },
                { model: Countries, as: 'CountryId', attributes: ['id', 'country_name'] },
                { model: Company, as: 'CompanyId', attributes: ['id', 'company_name'] }
            ],
            where: { manager_id: req.params.managerId, is_deleted: 0 }
        });
        if (!EmpData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: EmpData
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
    // console.log('\033c')
    console.log(req.params.EmailId)
    try {
        const EmpData = await Employee.findAll({
            where: { user_email: req.params.EmailId, is_deleted: 0 }
        });

        if (!EmpData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: EmpData
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
        helper.logger.info(error)
    }

}

exports.getRecordsByCompanyId = async (req, res, next) => {
    try {
        const EmpData = await Employee.findAll({
            include: [
                { model: Manager, as: 'ManagerId', attributes: ['id', 'first_name'] },
                { model: Countries, as: 'CountryId', attributes: ['id', 'country_name'] },
                { model: Company, as: 'CompanyId', attributes: ['id', 'company_name'] },
                { model: Role, as: 'ViewRole', attributes: ['id', 'role'] },
            ],
            where: { company_id: req.params.ComId, is_deleted: 0 }
        });
        if (!EmpData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: EmpData
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
    console.log("hh")

    try {
        const EmployeeData = await Employee.findAll({
            include: [
                { model: Manager, as: 'ManagerId', attributes: ['id', 'first_name'] },
                { model: Countries, as: 'CountryId', attributes: ['id', 'country_name'] },
                { model: Company, as: 'CompanyId', attributes: ['id', 'company_name'] }
            ],
            where: { id: req.params.id, is_deleted: 0 }
        });
        if (!EmployeeData) {
            return res.status(404).json({
                status: 404,
                message: 'could not find result',
            })
        }
        res.status(200).json({
            message: "Result Fetched",
            data: EmployeeData
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
    let ManagerLastName;
    let ManagerFirstName;
    let activeDate = moment().tz(TZ).utcOffset("+05:30").format('DD MMM YYYY');
    let EndDate = moment().tz(TZ).utcOffset("+05:30").add(15, 'd').format('DD MMM YYYY');
    console.log(activeDate + "  Next : " + EndDate)

    try {
        const CreateEmployee = await Employee.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_email: req.body.user_email,
            gender: req.body.gender,
            status: req.body.status,
            role: req.body.role,
            company_id: req.body.company_id,
            manager_id: req.body.manager_id,
            prev_manager_id: req.body.manager_id,
            period_start: activeDate,
            period_end: EndDate,
            feedback_frequency: req.body.feedback_frequency,
            feedback_year: req.body.feedback_year,
            feedback_month: req.body.feedback_month,
            best_classified: req.body.best_classified,
            service_external_client: req.body.service_external_client,
            location: req.body.location,
            working_presence: req.body.working_presence,
            year_of_experience: req.body.year_of_experience
        }, { transaction: t })
        t.commit();
        const Data = await Manager.findAll({
            where: { id: req.body.manager_id, is_deleted: '0' },
        });
        Data.map((item, key) => (
            ManagerFirstName = item.dataValues.first_name,
            ManagerLastName = item.dataValues.last_name
        ));
        if (!CreateEmployee) {
            return res.status(200).json({
                status: 404,
                message: 'No data found'
            })
        }
        const sub = ` Action Requested: Please complete your performance self assessment (${activeDate} - ${EndDate})`;
        const toBcc = ['ravikantmadas@gmail.com', 'shubhamhatagale02@gmail.com'];
        const content = ` <p>Dear ${req.body.first_name} ${req.body.last_name}</p>
        <p>The gift of rich and actionable feedback can be a powerful thing. As I put together your performance evaluation for the ${activeDate} – ${EndDate} period, I am reaching out to a small group of individuals who will provide 360-degree feedback on your performance and those inputs will serve as the bedrock for the assessment. I would also like to invite you to share your self assessment at this stage. Your feedback matters too!</p>
        <p>We’re leveraging the feedback survey expertise of one of our partners (amplioso.com); they understand 360-degree performance feedback better than anyone else and leveraging their novel approach on the metrics that matter means that you’ll be done in just a few minutes.</p>
        <p>Please click <a href="http://dev.amplioso.com/">here</a> to share your feedback. The survey link will be active until ${EndDate}.</p>
        <p>Thank you in advance for your time. These results will be shared back with you along with the rest of the feedback at a future date. Please do not hesitate to reach out me if I can help with anything.</p>
        <br/><p>Sincerely,</p>
        <p>${ManagerFirstName} ${ManagerLastName}</p>`;
        const toEmail = req.body.user_email;
        helper.SendMail(toEmail, toBcc, sub, content, res);
        res.status(200).json({
            status: 200,
            resultId: CreateEmployee.dataValues.id,
            message: 'Data Added Successfully',
        });
    } catch (error) {
        t.rollback();
        helper.logger.info(error)
        return res.status(500).send({
            message: 'Unable to Update data',
            status: 500
        });
    }
};

exports.updateRecords = async (req, res, next) => {
    console.log("hh")

    const t = await sequelize.transaction();
    try {
        const UpdateEmployee = await Employee.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_email: req.body.user_email,
            gender: req.body.gender,
            status: req.body.status,
            role: req.body.role,
            company_id: req.body.company_id,
            manager_id: req.body.manager_id,
            prev_manager_id: req.body.manager_id,
            feedback_frequency: req.body.feedback_frequency,
            feedback_year: req.body.feedback_year,
            feedback_month: req.body.feedback_month,
            best_classified: req.body.best_classified,
            service_external_client: req.body.service_external_client,
            location: req.body.location,
            working_presence: req.body.working_presence,
            year_of_experience: req.body.year_of_experience
        },
            { where: { id: req.params.id } }, { transaction: t });
        t.commit();
        if (!UpdateEmployee) {
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
        const EmpDetails = await Employee.update({
            is_deleted: 1
        },
            { where: { id: req.params.id } }, { transaction: t });
        t.commit();
        if (!EmpDetails) {
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
        const EmpDetails = await Employee.update({
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