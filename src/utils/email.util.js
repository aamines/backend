const formData = require("form-data");
const Mailgun = require("mailgun.js");
const { PrismaClient } = require("@prisma/client");

const mailgun = new Mailgun(formData);

const prisma = new PrismaClient();
const mg = mailgun.client({
  username: "api",
  key: "64f301c2fc18e1db6a0d9fecc4be6327-102c75d8-9879f55c",
});

const sendEmail = async (options) => {
  const email = await prisma.email.create({
    data: {
      email: options.to,
      typeId: options.type,
      statusId: 1,
    },
  });

  mg.messages
    .create("sandbox07deea4252f940309f56a3ccd881522e.mailgun.org", {
      from: "Projectia inc",
      to: [`${options.to}`],
      subject: options.subject,
      text: options.text,
    })
    .then((msg) => console.log(msg))
    .catch(async (err) => {
      console.log(err);

      await prisma.email.update({
        where: {
          id: email?.id,
        },
        data: {
          statusId: 3,
        },
      });
    });
};

module.exports = sendEmail;
