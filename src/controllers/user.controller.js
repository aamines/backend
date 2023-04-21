const { PrismaClient } = require("@prisma/client");

//services
const { updateUserService, getUserById } = require("../services/user.service");

const prisma = new PrismaClient();

// Update user information
module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    await updateUserService(id, req.body);
    return res.status(200).json({
      message: "user updates",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get info of the logged in user
module.exports.getUserDetails = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    const result = await getUserById(parseInt(data.id));
    res.status(200).json({
      message: "user details",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all communities of the logged in user
exports.getMemberCommunities = async (req, res) => {
  const data = {
    id: req.user.id,
  };

  try {
    await prisma.community
      .findMany({
        where: {
          accounts: {
            some: {
              userId: data.id,
            },
          },
        },
        include: {
          media: true,
        },
      })
      .then((communities) => {
        res.status(200).json({
          message: "communities found",
          data: communities,
        });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};
