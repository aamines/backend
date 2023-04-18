const { PrismaClient } = require("@prisma/client");

//services
const { createCommunity } = require("../services/community.service");

const prisma = new PrismaClient();

// Create a new community
module.exports.createCommunityController = async (req, res) => {
  const data = {
    name: req.body.name,
    type: req.body.type,
    creatorId: req.user.id,
    vision: req.body.vision,
  };

  try {
    await createCommunity(data)
      .then((community) => {})
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.getCommunityById = async (req, res) => {
  try {
    const community = await prisma.community.find({
      where: { communityId: req.body.communityId },
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
