const { PrismaClient } = require("@prisma/client");
const prisma =new PrismaClient()

module.exports.createCommunity=async(req,res)=>{
    try{
        await prisma.community.create({
            communityName:req.body.communityName,
            communityVision:req.body.communityVision,
            communityTerms:req.body.termsAndConditions
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send("unable to create community")
    }
}