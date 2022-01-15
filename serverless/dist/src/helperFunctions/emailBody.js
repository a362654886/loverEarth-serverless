"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmailBody = void 0;
const getEmailBody = (fromEmail, subject, toEmail, message) => {
    return {
        Destination: {
            /* required */
            CcAddresses: [
                fromEmail,
            ],
            ToAddresses: toEmail,
        },
        Message: {
            /* required */
            Body: {
                /* required */
                Html: {
                    Charset: "UTF-8",
                    Data: message,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: message,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            },
        },
        Source: fromEmail /* required */,
        ReplyToAddresses: [
            fromEmail,
        ],
    };
};
exports.getEmailBody = getEmailBody;
