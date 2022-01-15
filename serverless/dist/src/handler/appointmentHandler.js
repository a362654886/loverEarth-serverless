"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentInsert = void 0;
const generateReturnBody_1 = require("../helperFunctions/generateReturnBody");
const appointmentController_1 = require("../controller/appointmentController");
const appointmentInsert = async (event, context) => {
    const { appointment } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(appointment, appointmentController_1.insertAppointment);
};
exports.appointmentInsert = appointmentInsert;
