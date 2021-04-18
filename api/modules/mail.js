const sgMail = require('@sendgrid/mail');

const API_KEY = 
 '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';

 const transport = sgMail.setApiKey(API_KEY);

 module.exports = transport;