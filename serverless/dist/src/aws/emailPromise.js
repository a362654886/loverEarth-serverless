"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPromise = void 0;
const tslib_1 = require("tslib");
const aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({ region: "us-east-1" });
const sendPromise = (para) => new aws_sdk_1.default.SES({ apiVersion: "2010-12-01" }).sendEmail(para).promise();
exports.sendPromise = sendPromise;
