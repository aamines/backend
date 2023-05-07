const formData = require("form-data");
const Mailgun = require("mailgun.js");
const { PrismaClient } = require("@prisma/client");

const mailgun = new Mailgun(formData);

const prisma = new PrismaClient();
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_KEY,
});

const sendEmail = async (options) => {
  const email = await prisma.email.create({
    data: {
      email: options.to,
      typeId: options.type,
      statusId: 1,
    },
  });
};

module.exports = sendEmail;
