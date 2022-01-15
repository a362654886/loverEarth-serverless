"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.volunteerInsert = void 0;
const generateReturnBody_1 = require("../helperFunctions/generateReturnBody");
const volunteerController_1 = require("../controller/volunteerController");
const volunteerInsert = async (event, context) => {
    const { volunteer } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(volunteer, volunteerController_1.insertVolunteer);
};
exports.volunteerInsert = volunteerInsert;
