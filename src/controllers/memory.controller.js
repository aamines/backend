const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getStories = async (req, res) => {
  const data = {
    communityId: req.params.id,
  };

  await prisma.account
    .findMany({
      where: {
        communityId: parseInt(data.communityId),
        Memory: {
          some: {
            communityId: parseInt(data.communityId),
          },
        },
      },
      include: {
        user: true,
        Media: true,
        Memory: true,
        media_banner: true,
        media_profile: true,
      },
    })
    .then((accounts) => {
      return res.status(200).json({
        message: "all accounts with stories",
        data: accounts,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message,
      });
    });
};

exports.createStory = async (req, res) => {
  const data = {
    type: req.body.type,
    color: req.body.color,
    content: req.body.content,
    accountId: req.body.accountId,
    communityId: req.body.communityId,
  };

  if (data.type === "text") {
    await prisma.memory
      .create({
        data: {
          type: data.type,
          color: data.color,
          content: data.content,
          accountId: parseInt(data.accountId),
          communityId: parseInt(data.communityId),
        },
      })
      .then((_) => {
        return res.status(200).json({
          message: "story created",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: err.message,
        });
      });
  }
};

exports.getStoryById = async (req, res) => {};
