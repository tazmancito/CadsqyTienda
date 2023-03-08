const nodemailer = require('nodemailer');
//require("dotenv").config();

const createTrans = () => {
    const transport = nodemailer.createTransport({
        host: process.env.HOSTMAIL,
        port: process.env.PORTMAIL,
        auth: {
          user: process.env.USERMAIL,
          pass: process.env.PASSMAIL
        }
      });
      return transport;
}

const sendMail = async (user) => {

  console.log(user);

    const sender = `"Tazmancito envia " <${process.env.USERMAIL}>`
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: sender,
        to: user,
        subject: "hello",
        html: "<b> Hello World? </b>",
    })

    console.log("mensaje sent: %s", info.messageId);
    return
}

exports.sendMail = (user) => sendMail(user)