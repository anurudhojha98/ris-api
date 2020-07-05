const stateService = require('../services/StateService');
const msg = require('../common/messages');
const logger = require('../logger');
const httpStatus = require('http-status-codes');
module.exports = {
    addState(req, res) {
        try {
            const { stateName } = req.body;
            stateService.addState(stateName).then((stateDetail) => {
                if (stateDetail) {
                    return res.status(httpStatus.CREATED).json(
                        {
                            success: true,
                            message: msg.STATE_SAVED_SUCCESS,
                            data: stateDetail
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
    getStateList(req, res) {
        try {
            stateService.getStateList().then((stateDetailList) => {
                if (stateDetailList.length > 0) {
                    return res.status(httpStatus.OK).json(
                        {
                            success: true,
                            message: msg.STATE_FOUND_SUCCESS,
                            data: stateDetailList
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