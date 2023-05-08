const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const prisma = new PrismaClient();
sgMail.setApiKey(process.env.SENDGRID_KEY);

const sendEmail = async (options) => {
  const email = await prisma.email.create({
    data: {
      email: options.to,
      typeId: options.type,
      statusId: 1,
    },
  });

  var mailOptions = {
    to: `${options.to}`,
    from: "byiringirosaad@gmail.com",
    subject: options.subject,
    html: `${options.text}`,
  };
  return new Promise((resolve, reject) => {
    sgMail
      .send(mailOptions)
      .then(() => {
        resolve(true);
      })
      .catch(async (error) => {
        await prisma.email.update({
          where: {
            id: email.id,
          },
          data: {
            statusId: 2,
          },
        });
        reject(error);
      });
  });
};

module.exports = sendEmail;
