const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.createPost = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    await prisma.post.create({
      typeId: req.body.typeId,
      postedBy: req.body.accountId,
      projectId: req.params.projectId,
      achievementId: req.body.achievementId,
    }).then((result)=>{
      resolve(result)
    }).catch((error)=>{
      reject(error.message)
    })
  })
};

module.exports.loadPosts = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    await prisma.post.findAll()
    .then((posts)=>{resolve(posts)})
    .catch((error)=>{reject(error.message)})
  })
};

module.exports.addReactionToPost = async (req, res) => {
  try {
    const reactions = [];
    reactions = await prisma.post.findAll({
      where: { postId: req.body.postId },
    }).reactionId;
    reactions.push(req.body.reactionId);
    await prisma.post.update({
      where: { postId: req.body.postId },
      reactionId: reactions,
    });
  } catch (error) {
    console.log(error);
    res.status(403).send("unable to add reaction");
  }
};

module.exports.loadPostReactions = async (req, res) => {
  try {
    let postReactions = await prisma.post.findMany({
      where: { postId: req.body.postId },
    });
    res.status(200).send(postReactions);
  } catch (error) {
    res.status(500).send("failed to load reactions");
  }
};

module.exports.addCommentToPost = async (req, res) => {
  try {
    let comments = [];
    comments = prisma.post.findAll({
      where: { postId: req.body.postId },
    }).commentId;
    try {
      await prisma.comments.create({
        comment: req.body.comment,
        accountId: req.body.accountId,
      });
    } catch (error) {
      console.log(error);
      res.status(403).send("unable to save comment");
    }
    let newCommentId = prisma.post.findAll().commentId[0];
    comments.push(newCommentId);
    await prisma.post.update({
      where: { postId: req.body.postId },
      commentId: comments,
    });
  } catch (error) {
    console.log(error);
    res.status(403).send("unable to save comment");
  }
};

module.exports.loadPostComments = async (req, res) => {
  try {
    let postComments = await prisma.post.findMany({
      where: { postId: req.body.postId },
    });
    res.send(postComments);
  } catch (error) {
    res.status(403).send("comments not found");
  }
};

module.exports.loadComment = async (req, res) => {
  try {
    let comments = await prisma.comment.findFirst({
      where: { commentId: req.body.commentId },
    });
    res.send(comments);
  } catch {
    res.send("unable to load comments");
  }
};

module.exports.addReactionToComment = (req, res) => {
  try {
    const reactions = [];
    reactions = prisma.comment.findAll({
      where: { commentId: req.body.commentId },
    }).commentId;
    reactions.push(req.body.reactionId);
    prisma.comment.update({
      where: { commentId: req.body.commentId },
      reactionId: reactions,
    });
  } catch (error) {
    console.log(error);
    res.status(403).send("unable to add reaction");
  }
};
