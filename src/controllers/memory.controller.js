const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getStories = async (req, res) => {
  const data = {
    communityId: req.params.id,
  };

  await prisma.memory
    .findMany({
      where: {
        communityId: parseInt(data.communityId),
      },
      include: {
        media: true,
      },
    })
    .then((stories) => {
      return res.status(200).json({
        message: "all stories",
        data: stories,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: err.message,
      });
    });
};

exports.createStory = async (req, res) => {};

exports.getStoryById = async (req, res) => {};
