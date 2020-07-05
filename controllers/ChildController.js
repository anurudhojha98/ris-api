const childService = require('../services/ChildService');
const httpStatus = require('http-status-codes');
const msg = require('../common/messages');
const logger = require('../logger');
const commonFunction = require('../common/commonFunctions');
module.exports = {
    addChild(req, res) {
        try {
            const childDetail = req.body;
            const userId = commonFunction.getUserId(req)
            childService.saveChildDatail(userId, childDetail).then((childDetails) => {
                if (childDetails) {
                    return res.status(httpStatus.CREATED).json(
                        {
                            success: true,
                            message: msg.CHILD_DETAIL_SAVED_SUCCESS,
                            data: childDetails
                        }
                    )
                }
            }).catch((err) => {
                logger.error(err.message);
                return res.status(httpStatus.OK).json({
                    success: false,
                    message: msg.ERR_IN_SAVE_DETAILS
                })
            });
        } catch (err) {
            logger.error(err.message);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: msg.INTERNAL_SERVER_ERR
            })
        }

    },
    getChildList(req, res) {
        try {
            const userId = commonFunction.getUserId(req)
            childService.getChildList(userId).then((childDetails) => {
                if (childDetails.length > 0) {
                    return res.status(httpStatus.OK).json(
                        {
                            success: true,
                            message: msg.CHILD_DETAILS_FIND_SUCCSS,
                            data: childDetails
                        }
                    )
                } else {
                    return res.status(httpStatus.OK).json(
                        {
                            success: true,
                            message: msg.NO_RECORDS_FOUND
                        }
                    )
                }
            }).catch((err) => {
                logger.error(err.message);
                return res.status(httpStatus.OK).json({
                    success: false,
                    message: msg.ERR_IN_FETCH_DETAILS
                })
            });
        } catch (err) {
            logger.error(err.message);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: msg.INTERNAL_SERVER_ERR
            })
        }
    },
    getChildById(req, res) {
        try {
            const userId = commonFunction.getUserId(req);
            const { childid } = req.params;
            childService.getChildById(userId, childid).then((childDetails) => {
                if (childDetails) {
                    return res.status(httpStatus.OK).json(
                        {
                            success: true,
                            message: msg.CHILD_DETAIL_FIND_SUCCSS,
                            data: childDetails
                        }
                    )
                } else {
                    return res.status(httpStatus.OK).json(
                        {
                            success: true,
                            message: msg.NO_RECORDS_FOUND
                        }
                    )
                }
            }).catch((err) => {
                logger.error(err.message);
                return res.status(httpStatus.OK).json({
                    success: false,
                    message: msg.ERR_IN_FETCH_DETAILS
                })
            });
        } catch (err) {
            logger.error(err.message);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: msg.INTERNAL_SERVER_ERR
            })
        }
    }
}