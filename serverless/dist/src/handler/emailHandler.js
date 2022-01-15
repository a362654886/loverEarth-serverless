"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailPost = void 0;
const generateReturnBody_1 = require("../helperFunctions/generateReturnBody");
const emailBody_1 = require("../helperFunctions/emailBody");
const emailPost = async (event, context) => {
    const { fromEmail, toEmail, subject, message } = JSON.parse(event.body) || {};
    const para = emailBody_1.getEmailBody(fromEmail, subject, toEmail, message);
    console.log(para);
    /*const result = sendPromise(para)
      .then(function (data) {
        console.log(data.MessageId);
      })
      .catch(function (err) {
        console.error(err, err.stack);
      });*/
    const result = "";
    return generateReturnBody_1.generateReturnBody(200, JSON.stringify(result));
};
exports.emailPost = emailPost;
