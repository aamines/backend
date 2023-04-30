const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAccountNotifications = async (req, res) => {
  const data = {
    id: req.body.account,
  };

  try {
    prisma.notifications
      .findMany({
        where: {
          account: data.id,
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
