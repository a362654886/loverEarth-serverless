import { Handler } from "aws-lambda";
import { generateReturnBody } from "../helperFunctions/generateReturnBody";
import { sendPromise } from "../aws/emailPromise";
import { getEmailBody } from "../helperFunctions/emailBody";

const emailPost: Handler = async (event, context) => {
  const { fromEmail, toEmail, subject, message } = JSON.parse(event.body) || {};
  const para = getEmailBody(fromEmail, subject,toEmail, message);
  console.log(para)
  /*const result = sendPromise(para)
    .then(function (data) {
      console.log(data.MessageId);
    })
    .catch(function (err) {
      console.error(err, err.stack);
    });*/
  const result = "";
  return generateReturnBody(200, JSON.stringify(result));
};

export { emailPost };
