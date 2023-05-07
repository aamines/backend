const pug = require("pug");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

//utils
const sendEmail = require("../utils/email.util");

const prisma = new PrismaClient();

module.exports.sendInvitaions = async (members) => {
  return new Promise((resolve, reject) => {
    try {
      members.map(async (member) => {
        // send email using pug views
        const templatePath = path.join(
          __dirname,
          "..",
          "views",
          "emails",
          "invitation.pug"
        );

        const params = {
          email: member.invitee,
          token: member.code,
        };

        const invitation = `${
          process.env.FRONTEND_URL
        }/invitation?${new URLSearchParams(params)}`;

        const html = pug.renderFile(`${templatePath}`, {
          link: invitation,
        });

        // check if user exists
        const userExists = await prisma.user.findFirst({
          where: {
            email: member.invitee,
          },
        });

        if (userExists) {
          await prisma.notifications.create({
            data: {
              typeId: 1,
              statusId: 2,
              categoryId: 1,
              code: member.code,
              userId: userExists.id,
              trace: member?.communityId,
              content: "You have been invited to join a workspace",
            },
          });
        }

        // send email
        sendEmail({
          to: member.invitee,
          text: html,
          subject: "Invited to a workspace",
          type: 1,
        });
      });

      resolve("Invitations sent");
    } catch (error) {
      reject(error.message);
    }
  });
};
