const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('../config/config');
const path = require('../common/path');
const fs = require('fs');
const logger = require("../logger");
const constants = require("../common/constants");
const msg = require('../common/messages');
const xlsx = require('node-xlsx');
module.exports = {
  generateToken(user) {
    logger.debug(`generateToken() start : user :  ${JSON.stringify(user)}`);
    let payload = { id: user.id };
    let token = jwt.sign(payload, config.SECRET_KEY, {
      expiresIn: config.EXPIRES_IN
    });
    logger.debug(`generateToken() end : token :  ${token}`);
    return token;
  },
  async isPasswordMatch(currentPassword, actualPassword) {
    logger.debug(`isPasswordMatch() start : currentPassword :  ${currentPassword} , actualPassword: ${actualPassword}`);
    return await new Promise((resolve, reject) => {
      let isPasswordMatch = false;
      bcrypt.compare(currentPassword, actualPassword, (err, isMatched) => {
        if (err) reject(err);
        logger.debug(`isPasswordMatch() end : isPasswordMatch :  ${isMatched}`);
        if (!isMatched) {
          resolve(isPasswordMatch);
        }

        resolve((isPasswordMatch = true));
      });
    });

  },
  parseJson(val) {
    let parsedJson;
    try {
      parsedJson = JSON.parse(val);
    } catch (err) {
      logger.log(err);
      throw new Error(msg.JSON_PARSER_ERR)
    }
    return parsedJson;
  },
  readXlsxFile(filePath) {
    logger.debug(`readXlsxFile() start : param : ${filePath}`);
    let workSheetsFromFile;
    try {
      workSheetsFromFile = xlsx.parse(filePath);
    } catch (err) {
      logger.log(err);
      throw new Error(msg.EXCEL_PARSER_ERR);
    }
    logger.debug(`readXlsxFile() end : workSheetsFromFile : ${JSON.stringify(workSheetsFromFile)}`);
    return workSheetsFromFile;
  },
  getUserId(req) {
    if (req.decoded) {
      return req.decoded.id;
    } else {
      logger.error("Token not found.");
      throw new Error("tokenNotFound");
    }
  },
  prepareDateFormat(date) {
    const strDate = new Date(date);
    const year = strDate.getFullYear();
    const newdate = strDate.getDate();
    const month = strDate.getMonth();
    let formattedDate = newdate + '/' + month + '/' + year;
    return formattedDate;
  },
  getSexDetail(sex) {
    let id = parseInt(sex);
    let sexName = 'Male';
    if (id === 2) {
      sexName = 'Female';
    } else if (id === 3) {
      sexName = 'Transegender'
    }
    return sexName;
  },
  pagination(searchQuery) {
    let page = 0;
    let pageSize = 5;
    if (searchQuery.page && searchQuery.pageSize) {
      if (searchQuery.page !== '' && searchQuery.pageSize !== '') {
        page = searchQuery.page;
        pageSize = searchQuery.pageSize
      }
    }
    let offset = parseInt(page) * parseInt(pageSize);
    let limit = parseInt(pageSize);
    return { offset, limit }
  }

};
