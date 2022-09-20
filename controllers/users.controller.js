const User = require('../models/users.model');
const Company = require('../models/companies.model');
const Role = require('../models/roles.model')
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
    const count = await User.findAndCountAll({ where: { is_deleted: 0 } });
    let totalItems = count;
    console.log(totalItems.count);
    const perPage = +queryData.limit || totalItems.count;
    const currentPage = +queryData.page || 1;
    const offset = (currentPage - 1) * perPage;
    const limit = perPage;
    const Data = await User.findAll({
      include: [
        {
          model: Company,
          attributes: ['id', 'company_name'],
        },
        {
          model: Role,
          as: 'UserRole',
          attributes: ['id', 'role'],
        }],
      where: { is_deleted: 0 }, limit, offset
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
exports.getRecordsbyRole = async (req, res, next) => {
  let queryData = url.parse(req.url, true).query;
  try {
    const Data = await User.findAll({
      include: [
        {
          model: Company,
          attributes: ['id', 'company_name'],
        },
        {
          model: Role,
          as: 'UserRole',
          attributes: ['id', 'role'],
        }],
      where: { role: queryData.userrole, is_deleted: 0, created_by: queryData.created_by }
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
exports.getRecordsById = async (req, res, next) => {
  try {
    const Data = await User.findAll({
      include: [
        {
          model: Company,
          attributes: ['id', 'company_name'],
        },
        {
          model: Role,
          as: 'UserRole',
          attributes: ['id', 'role'],
        }],
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

exports.postResetpassword = async (req, res, next) => {
  var hash = crypto.createHash('sha512');
  let data = hash.update(req.body.password, 'utf-8');
  gen_hash = data.digest('hex');
  try {
    const userdetails = await User.update({
      password: gen_hash,
    },
      { where: { id: req.params.id } });
    if (!userdetails) {
      return res.status(200).json({
        status: 404,
        message: 'No data found'
      })
    }
    console.log(res)
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

exports.postRecords = async (req, res, next) => {
  var hash = crypto.createHash('sha512');
  let data = hash.update(req.body.password, 'utf-8');
  gen_hash = data.digest('hex');
  const t = await sequelize.transaction();
  try {
    const GetData = await User.findAndCountAll({ where: { user_email: req.body.user_email, is_deleted: 0 } });
    console.log("Exist Data count : " + GetData.count);
    if ((GetData.count) !== 0) {
      return res.status(200).json({
        status: 400,
        message: 'Dulpicate E-mail Found in users.contro',
      });
    }
    else {
      const user = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date: req.body.date,
        date_of_joining: req.body.date_of_joining,
        designation: req.body.designation,
        role: 1,
        company_id: req.body.company_id,
        mobile_no: req.body.mobile_no,
        user_email: req.body.user_email,
        username: req.body.username,
        password: gen_hash,
        gender: req.body.gender,
        address: req.body.address,
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
      res.status(200).json({
        status: 200,
        message: 'Post created successfully!',
      });
    }
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
  var hash = crypto.createHash('sha512');
  data = hash.update(req.body.password, 'utf-8');
  gen_hash = data.digest('hex');
  try {
    // const GetData = await User.findAndCountAll({ where: { user_email: req.body.user_email, is_deleted: 0 } });
    // console.log("Exist Data count : " + GetData.count);
    // if ((GetData.count) !== 1) {
    //   return res.status(200).json({
    //     status: 400,
    //     message: 'Dulpicate E-mail Found',
    //   });
    // }
    // else {
    const userdetails = await User.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date: req.body.date,
      date_of_joining: req.body.date_of_joining,
      designation: req.body.designation,
      role: 1,
      company_id: req.body.company_id,
      mobile_no: req.body.mobile_no,
      user_email: req.body.user_email,
      username: req.body.username,
      gender: req.body.gender,
      // password: gen_hash,
      address: req.body.address,
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
  console.table("Generated  Password : " + password);
  const gen_hash = crypto.createHash('sha512').update(password).digest('hex')
  console.log("Hashed Password: " + gen_hash);
  try {
    const Data = await User.findAll({
      where: { user_email: req.body.username, is_deleted: '0' }
    });
    if (!Data) {
      return res.status(404).json({ error: "user dont exits with E-mail" });
    }
    Data.map((item, key) => (
      firstName = item.first_name,
      lastName = item.last_name
    ));
    const details = await User.update({
      password: gen_hash,
    },
      { where: { user_email: req.body.username, is_deleted: '0' } });
    if (!details) {
      return res.status(200).json({
        status: 404,
        message: 'No data found'
      })
    }
    const sub = " Amplioso.com: We’ve got a new temporary password for you! ";
    const toBcc = ['ravikantmadas@gmail.com', 'shubhamhatagale02@gmail.com'];
    const content = ` <p>Dear ${firstName} ${lastName}</p>
    <p>Greetings from Amplioso.com! We’ve received your request to provide a new temporary password for your account. Here it is:    </p>
    <p>Temporary Password : ${password}</p>
    <p>This password is only valid for another 24 hours. You are requested to log in to your account and update your password using the UPDATE PASSWORD tile on your Portal Home Screen.</p>
    <p>Should you need anything else in the interim or have feedback for us, please do not hesitate to reach out to us at portalsupport@amplioso.com.</p>
    <br/><p>Thank you for your patronage</p>
    <p>Amplioso Support Team</p>
    <p><a href="http://dev.amplioso.com/">www.amplioso.com</a></p>`;
    const toEmail = req.body.username;
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

exports.deleteRecords = async (req, res, next) => {
  const t = await sequelize.transaction();
  const userId = req.params.id;
  try {
    const details = await User.update({
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

