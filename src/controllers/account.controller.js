const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//join community
module.exports.addPersonController = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    const userId = prisma.user.find({
      where: { email: req.body.email },
    }).userId;
    prisma.account
      .create({
        userId: userId,
        communityId: req.body.communityId,
        statusId: "inactive",
      })

      .then((success) => {
        resolve(success);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};

exports.getAccount = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  await prisma.account
    .findUnique({
      where: {
        id: parseInt(data.id),
      },
      include: {
        user: true,
        community: {
          include: {
            accounts: true,
          },
        },
        media_profile: true,
        media_banner: true,
      },
    })
    .then((account) => {
      return res.status(200).json({
        message: "account",
        data: account,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        message: error.message,
      });
    });
};

// leave community
module.exports.leaveController = async (req, res) => {
  return new Promise(async (resolve, reject) => {
    prisma.account
      .delete({
        where: { accountId: req.body.accountId },
      })
      .then((success) => {
        resolve(success);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};

// list communities
module.exports.listCommunities = async (req, res) => {
  return new Promise((resolve, reject) => {
    let communityId = [];
    communityId = prisma.account.find({
      where: { accountId: req.params.accountId },
    }).communityId;
    communityId
      .forEach(async (comId) => {
        let community = await prisma.community.find({
          where: { communityId: comId },
        });
        res.status(200).send(community);
      })
      .then((success) => {
        resolve(success);
      })
      .catch((error) => {
        resolve(error.message);
      });
  });
};

// list community members
module.exports.listMembers = async (req, res) => {
  try {
    let accountId = [];
    accountId = await prisma.account.find({
      where: { communityId: req.params.communityId },
    }).userId;
    accountId.forEach(async (element) => {
      let userInfo = await prisma.users.find({ where: { userId: element } });
      res.status(200).json(userInfo);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
