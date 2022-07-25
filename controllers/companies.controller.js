const Company = require('../models/companies.model');
const Manager = require('../models/managers.model');
const User = require('../models/users.model');
const business_sector = require('../models/sectors.model');
const feedback_frequency = require('../models/feedback_frequencies.model');
const helper = require('../config/helpers')
const url = require('url');
const fs = require('fs');
const path = require('path');
var moment = require("moment");
const TZ = moment.tz("Asia/Kolkata").format();
const sequelize = require('../config/database');
var crypto = require('crypto');
const Package = require('../models/package.model');
const { QueryTypes } = require('sequelize');

exports.getRecords = async (req, res, next) => {
  let queryData = url.parse(req.url, true).query;
  try {
    const count = await Company.findAndCountAll({ where: { is_deleted: '0' } });
    let totalItems = count;
    const perPage = +queryData.limit || totalItems.count;
    const currentPage = +queryData.page || 1;
    const offset = (currentPage - 1) * perPage;
    const limit = perPage;
    const Data = await Company.findAll({
      include: [
        { model: User, as: 'CompanyCreated', attributes: ['id', 'first_name'] },
        { model: User, as: 'CompanyUpdated', attributes: ['id', 'first_name'] },
        { model: feedback_frequency, as: 'CompanyFeedback', attributes: ['id', 'feedback_frequencies'] },
        { model: business_sector, as: 'CompanySector', attributes: ['id', 'sector_name'] },
        { model: Package, as: 'CompanyPackage', attributes: ['id', 'package_name', 'no_of_employees'] },
      ], where: { is_deleted: '0' }, limit, offset
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
    const comData = await Company.findAll({
      include: [
        { model: User, as: 'CompanyCreated', attributes: ['id', 'first_name'] },
        { model: User, as: 'CompanyUpdated', attributes: ['id', 'first_name'] },
        { model: feedback_frequency, as: 'CompanyFeedback', attributes: ['id', 'feedback_frequencies'] },
        { model: business_sector, as: 'CompanySector', attributes: ['id', 'sector_name'] },
        { model: Package, as: 'CompanyPackage', attributes: ['id', 'package_name', 'no_of_employees'] },
      ], where: { id: req.params.comId, is_deleted: '0' }
    });
    if (!comData) {
      return res.status(404).json({
        status: 404,
        message: 'could not find result',
      })
    }
    res.status(200).json({
      message: "Result Fetched",
      data: comData
    })
    helper.logger.info(comData)
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    helper.logger.info(error)
  }
}




exports.postRecords = async (req, res, next) => {
  console.log(req.body);
  console.log("hhyynn");

  let imageUrl = req.body.company_logo;
  if (req.file) {
    imageUrl = req.file.filename;
  }
  var hash = crypto.createHash('sha512');
  let data = hash.update(req.body.password, 'utf-8');
  gen_hash = data.digest('hex');
  const t = await sequelize.transaction();
  try {
    const results = await sequelize.query(`SELECT username  FROM companies  WHERE username='${req.body.username}'AND is_deleted='0' UNION  SELECT user_email FROM managers  WHERE user_email= '${req.body.username}'AND is_deleted='0'`, { type: QueryTypes.SELECT });
    console.log(results);
    console.log(results.length);
    if ((results.length) !== 0) {
      return res.status(200).json({
        status: 400,
        message: 'Dulpicate E-mail Found in master',
      });
    }
    else {
      const post = await Company.create({
        company_name: req.body.company_name,
        company_logo: imageUrl,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        comapany_headquaters: req.body.comapany_headquaters,
        date_of_inception: req.body.date_of_inception,
        number_of_employee: req.body.number_of_employee,
        role: 2,
        business_sector: req.body.business_sector,
        feedback_frequency: req.body.feedback_frequency,
        average_employee_compansation: req.body.average_employee_compansation,
        current_package: req.body.current_package,
        username: req.body.username,
        password: gen_hash,
        created_by: req.body.created_by,
        updated_by: req.body.updated_by,
        created_on: moment().tz(TZ).utcOffset("+05:30").format(),
      }, { transaction: t }
      );
      t.commit();
      if (!post) {
        return res.status(200).json({
          status: 404,
          message: 'No data found'
        })
      }
      const sub = req.body.company_name + " : Welcome to Amplioso.com";
      const toBcc = [req.body.username];
      const content = ` <p>Dear ${req.body.first_name} ${req.body.last_name}</p>
    <p>Greetings from Amplioso.com! You’ve taken another big step in your journey to grow talent and we’d like to congratulate you on the decision. Your account is now activated. You will now play the important role of Master Admin for ${req.body.company_name}. As a Master Admin, your role at a high-level will be to set up key preferences and enable the people managers in your organization to leverage the power of our 360-degree feedback surveys. The key is in your hands!</p>
    <p>You now have access to our exclusive Master Admin portal from where you’ll be able to administer settings, assign managers, view results, and much more.  You can log in to the portal on our website (Amplioso.com) using the <a href="http://dev.amplioso.com/">Log In</a> link at the top of the home page.</p>
    <p>Please also be sure to visit our <a href="http://dev.amplioso.com/">FAQs</a> page for frequently asked questions and tips. Should you need anything else in the interim or have feedback for us, please do not hesitate to reach out to us at portalsupport@amplioso.com. </p>
    <br/><p>Thank you for your patronage</p>
    <p>Amplioso Support Team</p>
    <p> <a href="http://dev.amplioso.com/">www.amplioso.com</a></p>
    <p>360-degree performance evaluations done right</p>`;
      const toEmail = req.body.username;
      helper.SendMail(toEmail, toBcc, sub, content, res);
      res.status(200).json({
        status: 200,
        response_id: post.id,
        message: 'Post created successfully!',
      });
      helper.logger.info(post)
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

exports.postRecords2 = async (req, res, next) => {
  console.log("shubham 81");
  console.log(req.body);
  let imageUrl = req.body.company_logo;
  if (req.file) {
    imageUrl = req.file.filename;
  }
  // var hash = crypto.createHash('sha512');
  // let data = hash.update(req.body.password, 'utf-8');
  // gen_hash = data.digest('hex');

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
  console.table(req.body.first_name + "Generated  Password : " + password);
  var hash = crypto.createHash('sha512');
  let data = hash.update(password, 'utf-8');
  gen_hash = data.digest('hex');

  const t = await sequelize.transaction();
  try {
    const results = await sequelize.query(`SELECT username  FROM companies  WHERE username='${req.body.username}'AND is_deleted='0' UNION  SELECT user_email FROM managers  WHERE user_email= '${req.body.username}'AND is_deleted='0'`, { type: QueryTypes.SELECT });
    console.log(results);
    console.log(results.length);
    if ((results.length) !== 0) {
      return res.status(200).json({
        status: 400,
        message: 'Dulpicate E-mail Found in master',
      });
    }
    else {
      const post = await Company.create({
        company_name: req.body.company_name,
        company_logo: imageUrl,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        comapany_headquaters: req.body.comapany_headquaters,
        date_of_inception: req.body.date_of_inception,
        number_of_employee: req.body.number_of_employee,
        role: 2,
        business_sector: req.body.business_sector,
        feedback_frequency: req.body.feedback_frequency,
        average_employee_compansation: req.body.average_employee_compansation,
        current_package: req.body.current_package,
        username: req.body.username,
        password: gen_hash,
        created_by: req.body.created_by,
        updated_by: req.body.updated_by,
        created_on: moment().tz(TZ).utcOffset("+05:30").format(),
      }, { transaction: t }
      );
      t.commit();
      if (!post) {
        return res.status(200).json({
          status: 404,
          message: 'No data found'
        })
      }
      const sub = req.body.company_name + " : Welcome to Amplioso.com";
      const toBcc = [req.body.username];
      const content = ` <p>Dear ${req.body.first_name} ${req.body.last_name}</p>
    <p>Greetings from Amplioso.com! You’ve taken another big step in your journey to grow talent and we’d like to congratulate you on the decision. Your account is now activated. You will now play the important role of Master Admin for ${req.body.company_name}. As a Master Admin, your role at a high-level will be to set up key preferences and enable the people managers in your organization to leverage the power of our 360-degree feedback surveys. The key is in your hands!</p>
    <p>You now have access to our exclusive Master Admin portal from where you’ll be able to administer settings, assign managers, view results, and much more.  You can log in to the portal on our website (Amplioso.com) using the <a href="http://dev.amplioso.com/master_admin/login/">Log In</a> link at the top of the home page.</p>
    <p>Username: ${req.body.username}</p>
        <p>Password: ${password}</p>
    <p>Please also be sure to visit our <a href="http://dev.amplioso.com/">FAQs</a> page for frequently asked questions and tips. Should you need anything else in the interim or have feedback for us, please do not hesitate to reach out to us at portalsupport@amplioso.com. </p>
    <br/><p>Thank you for your patronage</p>
    <p>Amplioso Support Team</p>
    <p> <a href="http://dev.amplioso.com/">www.amplioso.com</a></p>
    <p>360-degree performance evaluations done right</p>`;
      const toEmail = req.body.username;
      helper.SendMail(toEmail, toBcc, sub, content, res);
      res.status(200).json({
        status: 200,
        response_id: post.id,
        message: 'Post created successfully!',
      });
      helper.logger.info(post)
    }
  } catch (error) {
    t.rollback();
    helper.logger.info(error)
    return res.status(500).send({
      message: 'Unable to Post data',
      status: 500
    });
  }

}



exports.updateRecords = async (req, res, next) => {
  const t = await sequelize.transaction();
  // var hash = crypto.createHash('sha512');
  // let data = hash.update(req.body.password, 'utf-8');
  // gen_hash = data.digest('hex');
  let imageUrl = req.body.company_logo;
  if (req.file) {
    imageUrl = req.file.filename;
    Company.findByPk(req.params.comId)
      .then(post => {
        if (imageUrl !== post.company_logo) {
          clearImage(post.company_logo);
        }
      })
  }
  try {
    // const results = await sequelize.query(`SELECT username  FROM companies  WHERE username='${req.body.username}'AND is_deleted='0' UNION  SELECT user_email FROM managers  WHERE user_email= '${req.body.username}'AND is_deleted='0'`, { type: QueryTypes.SELECT });
    // console.log(results);
    // console.log(results.length);
    // if ((results.length) !== 1) {
    //   return res.status(200).json({
    //     status: 400,
    //     message: 'Dulpicate E-mail Found',
    //   });
    // }
    // else {
    const companydetails = await Company.update({
      company_name: req.body.company_name,
      company_logo: imageUrl,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      comapany_headquaters: req.body.comapany_headquaters,
      date_of_inception: req.body.date_of_inception,
      number_of_employee: req.body.number_of_employee,
      role: 2,
      business_sector: req.body.business_sector,
      feedback_frequency: req.body.feedback_frequency,
      average_employee_compansation: req.body.average_employee_compansation,
      current_package: req.body.current_package,
      username: req.body.username,
      // password: gen_hash,
      updated_by: req.body.updated_by,
      updated_on: (moment().tz(TZ).utcOffset("+05:30").format()),
    },
      { where: { id: req.params.comId } }, { transaction: t });
    t.commit();
    if (!companydetails) {
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

  console.log("hhhs")
  // const t = await sequelize.transaction();
  // const comId = req.params.id;
  // Company.findByPk(comId)
  //   .then(post => {
  //     if (post.company_logo) {
  //       clearImage(post.company_logo);
  //     }
  //     try {
  //       const companydetails = Company.update({
  //         is_deleted: '1'
  //       },
  //         { where: { id: comId } }, { transaction: t });
  //       t.commit();
  //       if (!companydetails) {
  //         return res.status(200).json({
  //           status: 404,
  //           message: 'No data found'
  //         })
  //       }
  //       res.status(200).json({
  //         status: 200,
  //         message: 'Record Deleted Successfully',
  //       });
  //     } catch (error) {
  //       t.rollback();
  //       helper.logger.info(error)
  //       return res.status(500).send({
  //         message: 'Unable to Delete Record',
  //         status: 500
  //       });
  //     }
  //   })
}

exports.postResetpassword = async (req, res, next) => {
  let comapnyName;
  let companyEmail;
  let firstName;
  let lastName;

  const gen_hash = crypto.createHash('sha512').update(req.body.password).digest('hex')
  console.log(req.params.id, req.body.password, gen_hash);
  try {
    const companydetails = await Company.update({
      password: gen_hash,
    },
      { where: { id: req.params.id } });
    const Data = await Company.findAll({
      include: [
        { model: User, as: 'CompanyCreated', attributes: ['id', 'first_name'] },
        { model: User, as: 'CompanyUpdated', attributes: ['id', 'first_name'] },
        { model: feedback_frequency, as: 'CompanyFeedback', attributes: ['id', 'feedback_frequencies'] },
        { model: business_sector, as: 'CompanySector', attributes: ['id', 'sector_name'] },
        { model: Package, as: 'CompanyPackage', attributes: ['id', 'package_name', 'no_of_employees'] },
      ], where: { id: req.params.id, is_deleted: '0' }
    });
    Data.map((item, key) => (
      comapnyName = item.dataValues.company_name,
      companyEmail = item.dataValues.username,
      firstName = item.first_name,
      lastName = item.last_name
    ));
    console.log(comapnyName, companyEmail);
    if (!companydetails) {
      return res.status(200).json({
        status: 404,
        message: 'No data found'
      })
    }
    const sub = " Amplioso.com Acknowledgement: Password change  ";
    // const toBcc = ['ravikantmadas@gmail.com', 'shubhamhatagale02@gmail.com'];
    const toBcc = [companyEmail];

    const content = ` <p>Dear ${firstName} ${lastName}</p>
    <p>Greetings from Amplioso.com! Just a note to let you know that your password has been successfully changed with us just a few moments ago.</p>
    <p>Should you need anything else in the interim or have feedback for us, please do not hesitate to reach out to us at portalsupport@amplioso.com.</p>
    <br/><p>Thank you for your patronage</p>
    <p>Amplioso Support Team</p>
    <p><a href="http://dev.amplioso.com/">www.amplioso.com</a></p>
    <p>360-degree performance evaluations done right</p>`;
    const toEmail = companyEmail;
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

exports.forgotPassword = async (req, res, next) => {
  let comapnyName;
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
    const Data = await Company.findAll({
      include: [
        { model: User, as: 'CompanyCreated', attributes: ['id', 'first_name'] },
        { model: User, as: 'CompanyUpdated', attributes: ['id', 'first_name'] },
        { model: feedback_frequency, as: 'CompanyFeedback', attributes: ['id', 'feedback_frequencies'] },
        { model: business_sector, as: 'CompanySector', attributes: ['id', 'sector_name'] },
        { model: Package, as: 'CompanyPackage', attributes: ['id', 'package_name', 'no_of_employees'] },
      ], where: { username: req.body.username, is_deleted: '0' }
    });
    if (!Data) {
      return res.status(404).json({ error: "user dont exits with E-mail" });
    }
    Data.map((item, key) => (
      comapnyName = item.dataValues.company_name,
      firstName = item.first_name,
      lastName = item.last_name
    ));
    console.log(comapnyName);
    const companydetails = await Company.update({
      password: gen_hash,
    },
      { where: { username: req.body.username, is_deleted: '0' } });
    if (!companydetails) {
      return res.status(200).json({
        status: 404,
        message: 'No data found'
      })
    }
    const sub = " Amplioso.com: We’ve got a new temporary password for you! ";
    // const toBcc = ['ravikantmadas@gmail.com', 'shubhamhatagale02@gmail.com'];
    const toBcc = [companyEmail];

    const content = ` <p>Dear ${firstName} ${lastName}</p>
    <p>Greetings from Amplioso.com! We’ve received your request to provide a new temporary password for your account. Here it is:    </p>
    <p>Temporary Password : ${password}</p>
    <p>This password is only valid for another 24 hours. You are requested to log in to your account and update your password using the UPDATE PASSWORD tile on your Portal Home Screen.</p>
    <p>Should you need anything else in the interim or have feedback for us, please do not hesitate to reach out to us at portalsupport@amplioso.com.</p>
    <br/><p>Thank you for your patronage</p>
    <p>Amplioso Support Team</p>
    <p><a href="http://dev.amplioso.com/">www.amplioso.com</a></p>
    <p>360-degree performance evaluations done right</p>`;
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



exports.paymt_sts = async (req, res, next) => {

  console.log("hhhs2")
  const t = await sequelize.transaction();
  const comId = req.params.id;
  Company.findByPk(comId)
    .then(post => {
      if (post.company_logo) {
        clearImage(post.company_logo);
      }
      try {
        const companydetails = Company.update({
          paymt_sts: '1'
        },
          { where: { id: comId } }, { transaction: t });
        t.commit();
        if (!companydetails) {
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
    })
}

exports.sendMail = async (req, res, next) => {
  console.log(req.body);
  console.log("hhyynn");

  const t = await sequelize.transaction();
  try {
    const sub = req.body.mailId + " : Welcome to Amplioso.com";
    const toBcc = [req.body.mailId];
    const content = ` <p>Thank You For Request For Demo,We will contact you soon </p>
    <p>Greetings from Amplioso.com! You’ve taken another big step in your journey to grow talent and we’d like to congratulate you on the decision. Your account is now activated. You will now play the important role of Master Admin for ${req.body.company_name}. As a Master Admin, your role at a high-level will be to set up key preferences and enable the people managers in your organization to leverage the power of our 360-degree feedback surveys. The key is in your hands!</p>
    <p>You now have access to our exclusive Master Admin portal from where you’ll be able to administer settings, assign managers, view results, and much more.  You can log in to the portal on our website (Amplioso.com) using the <a href="http://dev.amplioso.com/">Log In</a> link at the top of the home page.</p>
    <p>Please also be sure to visit our <a href="http://dev.amplioso.com/">FAQs</a> page for frequently asked questions and tips. Should you need anything else in the interim or have feedback for us, please do not hesitate to reach out to us at portalsupport@amplioso.com. </p>
    <br/><p>Thank you for your patronage</p>
    <p>Amplioso Support Team</p>
    <p> <a href="http://dev.amplioso.com/">www.amplioso.com</a></p>
    <p>360-degree performance evaluations done right</p>`;
    const toEmail = req.body.mailId;
    helper.SendMail(toEmail, toBcc, sub, content, res);
    res.status(200).json({
      status: 200,
      response_id: post.id,
      message: 'Post created successfully!',
    });
    helper.logger.info(post)
  } catch (error) {
    t.rollback();
    helper.logger.info(error)
    // return res.status(500).send({
    //   message: 'Unable to Post data',
    //   status: 500
    // });
  }
};
