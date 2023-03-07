import { prisma } from "@prisma/client";

//join community
export const addPersonController = async (req, res) => {
    try {
     const userId=await prisma.user.find({where:{email:req.body.email}}).userId
     await prisma.account.create({
        userId:userId,
        communityId:req.body.communityId,
        statusId:"inactive"
     })
     res.status(200)
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

// leave community
export const leaveController = async (req, res) => {
    try {
        await prisma.account.delete({
            where:{accountId:req.body.accountId}
        })
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };

// list communities
export const listCommunities = async (req,res)=>{
  try{
    let communityId=[]
    communityId=await prisma.account.find({where:{accountId:req.params.accountId}}).communityId
    communityId.forEach(async comId => {
      let community= await prisma.community.find({where:{communityId:comId}}) 
      res.status(200).send(community)
    }); 
    }
    catch(error){
      res.status(500).json(error)
    }   
}

// list community members
export const listMembers = async (req,res)=>{
  try{
    let accountId=[]
      accountId=await prisma.account.find({where:{communityId:req.params.communityId}}).userId
      accountId.forEach(async element=>{
        let userInfo=await prisma.users.find({where:{userId:element}})
        res.status(200).json(userInfo)
      })
  }
  catch(error){
    res.status(500).json(error)
  }
}