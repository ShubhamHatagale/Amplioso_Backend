const Role = require('../models/roles.model');
const { validationResult } = require('express-validator');
const helper = require('../config/helpers')
const url = require('url');
const User = require('../models/users.model');
var moment = require("moment"); 
const TZ = moment.tz("Asia/Kolkata").format();
const sequelize = require('../config/database');


exports.getRecords = async (req, res, next) => {
  let queryData = url.parse(req.url, true).query;
  try {
    const count = await Role.findAndCountAll({ where: { is_deleted: '0' } });
    let totalItems = count;
    const perPage = +queryData.limit || totalItems.count;
    const currentPage = +queryData.page || 1;
    const offset = (currentPage - 1) * perPage;
    const limit = perPage;
    const Data = await Role.findAll({
      include: [
        { model: User, as: 'RoleCreated', attributes: ['id', 'first_name'] },
        { model: User, as: 'RoleUpdated', attributes: ['id', 'first_name'] }
      ],
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
    const Data = await Role.findAll({
      include: [
        { model: User, as: 'RoleCreated', attributes: ['id', 'first_name'] },
        { model: User, as: 'RoleUpdated', attributes: ['id', 'first_name'] }
      ],
      where: { id: req.params.roleId, is_deleted: '0' }
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
    const role = await Role.create({
      role: req.body.role,
      created_by: req.body.created_by,
      updated_by: req.body.updated_by,
      created_on: (moment().tz(TZ).utcOffset("+05:30").format()),
    }, { transaction: t })
    t.commit();
    if (!role) {
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
    const roledetails = await Role.update({
      role: req.body.role,
      updated_by: req.body.updated_by,
      updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
    },
      { where: { id: req.params.roleId } }, { transaction: t });
    t.commit();

    if (!roledetails) {
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
  const roleid = req.params.id;
  const t = await sequelize.transaction();
  try {
    const details = await Role.update({
      is_deleted: '1'
    },
      { where: { id: roleid } }, { transaction: t });
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

