const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new community
module.exports.createCommunityController = async (req, res) => {
  try {
    await prisma.community.create({
      communityName: req.body.communityName,
      communityVision: req.body.communityVision,
      communityTerms: req.body.termsAndConditions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
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
