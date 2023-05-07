const crypto = require("crypto");
const { PrismaClient } = require("@prisma/client");

//services
const { createCommunity } = require("../services/community.service");
const { createAdminAccount } = require("../services/account.service");
const { sendInvitaions } = require("../services/invitation.service");

const prisma = new PrismaClient();

// Create a new community
exports.createCommunityController = async (req, res) => {
  const data = {
    name: req.body.name,
    type: req.body.type,
    vision: req.body.vision,
  };

  try {
    await createCommunity(data)
      .then(async (community) => {
        await createAdminAccount({ user: req.user, community: community })
          .then((account) => {
            return res.status(200).json({
              message: "Community created",
              data: account,
            });
          })
          .catch((error) => {
            return res.status(500).json({
              message: error,
            });
          });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.inviteMembers = async (req, res) => {
  const data = {
    account: req.body.account,
    members: req.body.members,
    communityId: req.body.community,
  };

  try {
    const records = [
      ...data.members.map((member) => {
        return {
          statusId: 1,
          invitee: member.email,
          roleId: parseInt(member.role),
          inviter: parseInt(data.account),
          communityId: parseInt(data.communityId),
          code: crypto.randomBytes(20).toString("hex"),
        };
      }),
    ];

    const results = await Promise.all(
      records.map((data) => {
        return prisma.invitation.create({ data });
      })
    );

    sendInvitaions(results)
      .then((message) => {
        return res.status(200).json({
          message: message,
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getCommunityById = async (req, res) => {
  const data = {
    id: req.params.commmunity,
  };

  try {
    const community = await prisma.community.findFirst({
      where: { communityId: data.id },
      include: {
        accounts: {
          include: {
            media_profile: true,
            role: true,
          },
        },
        groups: true,
      },
    });
    if (community) {
      res.status(200).json(community);
    } else {
      res.status(500).json({
        message: "can't find community with this id",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
