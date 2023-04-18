import { PrismaClient } from "@prisma/client";
import { createAccount, createAdminAccount } from "../account/account.service";
import { findUserByEmail } from "../user/user.service";

const prisma = new PrismaClient();

// Creating a community
export const createCommunity = async (communityDetails, userId) => {
  const newCommunity = await prisma.community.create({
    data: {
      name: communityDetails.name,
      description: communityDetails.description,
      creatorId: userId,
    },
  });
  if (!newCommunity) {
    return "could not create a new community";
  }
  const adminAccount = await createAdminAccount(userId, newCommunity.id);
  if (adminAccount) {
    return "community created with admin account";
  }
};

// Add user to community
export const addPersonToCommunity = async (email, communityId) => {
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
export const removePerson = async (userEmail, communityId) => {
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
export const findCommunitById = async (communiyId) => {
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
export const findCommunitByCreatorId = async (creatorId) => {
  const communities = await prisma.community.findMany({
    where: {
      creatorId: creatorId,
    },
  });
};
