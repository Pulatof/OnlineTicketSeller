
const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const client = require('twilio')(accountSid, authToken)

async function sendSms(phone: string, otp: string) {
  try {
    const message = await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: 'YOUR_TWILIO_PHONE_NUMBER',
      to: phone
    });

    console.log(`SMS sent to ${phone}. Message ID: ${message.sid}`);
  } catch (error) {
    console.error(`Failed to send SMS to ${phone}. Error: ${error.message}`);
  }
}
