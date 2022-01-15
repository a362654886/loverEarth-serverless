export const getEmailBody = (
  fromEmail: string,
  subject: string,
  toEmail: string[],
  message: string
): AWS.SES.SendEmailRequest => {
  return {
    Destination: {
      /* required */
      CcAddresses: [
        fromEmail,
        /* more items */
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
      /* more items */
    ],
  };
};
