const sgMail = require('@sendgrid/mail');

const API_KEY = 
 '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';

 const transport = sgMail.setApiKey(API_KEY);

 module.exports = transport;