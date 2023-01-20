import { PrismaClient } from "@prisma/client";
import { findCommunitById } from "../community/community.service";

const prisma = new PrismaClient();

//create account
export const createAccount = async(userId, communityId) => {
  const newAccount = prisma.account.create({
    data:{
      userId,
      communityId
    }
  })
  if(!newAccount){
    return "could not create a new account"; 
  }
  return newAccount;
};

//create admin account
export const createAdminAccount = async(userId, communityId) => {
  const newAccount = prisma.account.create({
    data:{
      userId,
      communityId,
      roleId: 1,
    }
  })
  if(!newAccount){
    return "could not create a new account"; 
  }
  return newAccount;
};

// delete account
export const deleteAccount = async(userEmail, communityId) => {
  const community = await findCommunitById(communityId);
  if(!community){
      return "There is no community with such id";
  }
  const userAccount = await prisma.account.findUnique({
      where:{
          userId: existingUser.id,
          communityId: communityId
      }
  });
  if(!userAccount){
      return `User with email ${userEmail} does not exist in the community`;
  }
  await prisma.account.delete({
      where:{
          id: userAccount.id
      }
  })
  return `Account deleted successfully`;
}

//delete accounts by userId
export const deleteAccountsByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    prisma.account
      .deleteMany({
        where: {
          userId
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
