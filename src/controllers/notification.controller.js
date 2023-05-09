const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAccountNotifications = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    prisma.notifications
      .findMany({
        where: {
          accountId: parseInt(data.id),
        },
        include: {
          type: true,
          status: true,
          category: true,
        },
      })
      .then((results) => {
        return res.status(200).json({
          message: "account notifications",
          data: results,
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

exports.getUserNotifications = async (req, res) => {
  const data = {
    id: req.params.id,
  };

  try {
    prisma.notifications
      .findMany({
        where: {
          userId: parseInt(data.id),
        },
        include: {
          type: true,
          status: true,
          category: true,
        },
      })
      .then((results) => {
        return res.status(200).json({
          message: "user notifications",
          data: results,
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

exports.markNotificationsAsSeen = async (req, res) => {};
