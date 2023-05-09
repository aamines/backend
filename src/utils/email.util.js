const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const prisma = new PrismaClient();
sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.sendInvitation = async (options) => {
  const email = await prisma.email.create({
    data: {
      statusId: 1,
      email: options.to,
      typeId: options.type,
    },
  });

  const msg = {
    to: `${options.to}`,
    from: `${process.env.EMAIL_ADDRESS}`,
    templateId: "d-95d6c2e1a3704967892027322b9eaf73",
    dynamic_template_data: {
      unique_name: options?.community,
      link: `${options?.invitation}`,
      Sender_Name: options?.user?.name,
      Sender_Email: options?.user?.email,
    },
  };

  return new Promise((resolve, reject) => {
    sgMail
      .send(msg)
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
