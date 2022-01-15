import AWS, { AWSError } from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

export const sendPromise = (para: AWS.SES.SendEmailRequest) =>
  new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail(para).promise();
