const { PrismaClient } = require("@prisma/client");

//configs
const prisma = new PrismaClient();

//create account
module.exports.createAccount = (user) => {
  return new Promise(async (resolve, reject) => {
    await prisma.account
      .create({
        data: {
          userId: user.id,
          roleId: 2,
          statusId: 1,
        },
      })
      .then((account) => {
        resolve(account);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};

//delete accounts
module.exports.deleteAccounts = (id) => {
  return new Promise((resolve, reject) => {
    prisma.account
      .deleteMany({
        where: {
          userId: id,
        },
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};
