const { PrismaClient } = require("@prisma/client");
//services
const { findUserByEmail } = require("./user.service");
const { createAccount } = require("./account.service");

const prisma = new PrismaClient();

// Creating a community
exports.createCommunity = async (details) => {
  return new Promise(async (resolve, reject) => {
    await prisma.community
      .create({
        data: {
          name: details.name,
          type: details.type,
          vision: details.vision,
          creatorId: details.creatorId,
        },
      })
      .then((community) => {
        resolve(community);
      })
      .catch((error) => {
        reject("Somethign went wrong");
      });
  });
};

// Add user to community
exports.addPersonToCommunity = async (email, communityId) => {
  const existingUser = await findUserByEmail(email);
  if (!existingUser) {
    return "User must register first";
  }
  const community = await findCommunitById(communityId);
  if (!community) {
    return "There is no community with the provided id";
  }
  const newAccount = await createAccount(existingUser.id, community.id);
  if (!newAccount) {
    return "could not create new ccount -- something went wrong";
  }
  return "Account created!";
};

// remove person from community
exports.removePerson = async (userEmail, communityId) => {
  const existingUser = await findUserByEmail(userEmail);
  if (!existingUser) {
    return "There is no user with such email";
  }
  const community = await findCommunitById(communityId);
  if (!community) {
    return "There is no community with such id";
  }
  const userAccount = await prisma.account.findUnique({
    where: {
      userId: existingUser.id,
      communityId: communityId,
    },
  });
  if (!userAccount) {
    return `User with email ${userEmail} does not exist in the community`;
  }
  await prisma.account.delete({
    where: {
      id: userAccount.id,
    },
  });
  return `User with email ${userEmail} successfully removed from the community`;
};

// find community by Id
exports.findCommunitById = async (communiyId) => {
  const community = await prisma.community.findUnique({
    where: {
      id: communiyId,
    },
  });
  if (!community) {
    return null;
  }
  return community;
};

// find community by creatorId
exports.findCommunitByCreatorId = async (creatorId) => {
  const communities = await prisma.community.findMany({
    where: {
      creatorId: creatorId,
    },
  });
};
