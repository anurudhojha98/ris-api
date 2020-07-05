const districtService = require('../services/DistrictService');
const msg = require('../common/messages');
const httpStatus = require('http-status-codes');
const logger = require('../logger');
module.exports = {
    addDistrict(req, res) {
        try {
            const districtDetail = req.body;
            districtService.addDistrict(districtDetail).then((districtDetails) => {
                if (districtDetails) {
                    return res.status(httpStatus.CREATED).json(
                        {
                            success: true,
                            message: msg.DISTRICT_SAVE_SUCCESS,
                            data: districtDetails
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
    getDistrictByStateId(req, res) {
        try {
            const stateId = req.query.state_id;
            districtService.getDistrictList(stateId).then((districtDetails) => {
                if (districtDetails.length > 0) {
                    return res.status(httpStatus.OK).json(
                        {
                            success: true,
                            message: msg.DISTRICT_FOUND_SUCCESS,
                            data: districtDetails
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