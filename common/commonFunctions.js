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
  }

};
