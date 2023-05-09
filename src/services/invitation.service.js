const { PrismaClient } = require("@prisma/client");

//utils
const { sendInvitation } = require("../utils/email.util");

const prisma = new PrismaClient();

module.exports.sendInvitaions = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      data.results.map(async (member) => {
        const params = {
          token: member.code,
          email: member.invitee,
        };

        const invitation = `${
          process.env.FRONTEND_URL
        }/invitation?${new URLSearchParams(params)}`;

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
        sendInvitation({
          type: 1,
          user: data?.user,
          to: member.invitee,
          invitation: invitation,
          community: data?.community,
        })
          .then((message) => {
            resolve("Invitations sent");
          })
          .catch((error) => {
            reject(error);
          });
      });
    } catch (error) {
      reject(error.message);
    }
  });
};
