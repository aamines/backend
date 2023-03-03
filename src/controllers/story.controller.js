const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createStory = async (req, res) => {
  try {
    await prisma.story.create({
      typeId: req.body.typeId,
      postedBy: req.body.accountId,
      community: req.body.communitId,
    });
  } catch (error) {
    console.log(error);
    res.status(403).send("unable to create a story");
  }
};
const loadStory = async (req, res) => {
  try {
    let posts = await prisma.story.findAll();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send("no posts found");
  }
};
const loadWithStoryId = async (req, res) => {
  try {
    const story = await prisma.story.find({
      where: { storyId: req.body.storyId },
    });
    res.status(200).send(story);
  } catch {
    res.status(500).send("story unavailable");
  }
};

module.exports.loadWithStoryId = loadWithStoryId;
module.exports.loadStory = loadStory;
module.exports.createStory = createStory;
