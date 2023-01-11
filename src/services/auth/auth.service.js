import { PrismaClient } from '@prisma/client'

// create user
export const createUser  = async (data) => {
    const prisma =  new PrismaClient();
    const user = await findUserByEmail(data.email);
    if(user){
        return "Email already used"
    }
    

}

// find user by email
export const findUserByEmail = async (email) => {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique(email);
    if(user){
        return user;
    }else{
        return null;
    } 
}