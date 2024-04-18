require('dotenv').config()
const SibApiV3Sdk = require('sib-api-v3-sdk');
const apiKey = process.env.BREVO_API_KEY;
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKeyAuth = defaultClient.authentications['api-key'];
apiKeyAuth.apiKey = apiKey;

const sendEmail = async ({ from, to, subject, text, html }) => {
    try {
        // Construct the email message
        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
        const sendSmtpEmail = {
            sender: { email: from },
            to: [{ email: to }],
            subject: subject,
            htmlContent: html,
            textContent: text,
        };

        // Send the email using the SendinBlue API
        const response = await  apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully. Response:', response);
        return response;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendEmail;