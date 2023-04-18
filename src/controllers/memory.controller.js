const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getStories = async (req, res) => {
  const data = {
    communityId: req.body.community,
  };

  const memories = await prisma.memory.findMany({
    where: {
      communityId: data.communityId,
    },
  });
};

exports.createStory = async (req, res) => {};

exports.getStoryById = async (req, res) => {};
