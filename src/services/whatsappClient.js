const accountSid ='AC4a4ff98489f770fddc218bbee7f2d756';
const authToken = 'eab7d9db55a0951f8481a36232e7ada9';
import twilio from 'twilio';
export const client = twilio(accountSid, authToken);

client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: 'bono!',
         to: 'whatsapp:+201103899795'
       })
      .then(message => console.log(message.sid)); 

