const { PrismaClient } = require("@prisma/client");

//configs
const prisma = new PrismaClient();

//create account
exports.createAccount = (details) => {
  return new Promise(async (resolve, reject) => {
    await prisma.account
      .create({
        data: {
          roleId: 2,
          statusId: 1,
          userId: details.user.id,
          communityId: details.community.id,
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

//create admin account
exports.createAdminAccount = (details) => {
  return new Promise(async (resolve, reject) => {
    await prisma.account
      .create({
        data: {
          roleId: 1,
          statusId: 1,
          userId: details.user.id,
          names: details.user.names,
          communityId: details.community.id,
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

//delete account
exports.deleteAccount = (id) => {
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
