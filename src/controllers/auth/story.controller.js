const { PrismaClient }=require("@prisma/client");
const prisma=new PrismaClient()

module.exports.createStory=async (req,res)=>{
    try{
            await prisma.story.create({
            typeId:req.body.typeId,
            postedBy:req.body.accountId,   
            community:req.body.communitId
        })
    }
    catch(error){
        console.log(error)
        res.status(403).send("unable to create a story")
    }
}

module.exports.loadStory=async (req,res)=>{
    try{
        let posts=await prisma.story.findAll({where:{communityId:req.body.communityId}})
        res.status(200).send(posts)
    }
    catch(error){
        res.status(500).send("no posts found")
    }
}

module.exports.loadWithStoryId=async(req,res)=>{
    try{
        const story=await prisma.story.find({where:{storyId:req.body.storyId}})
        res.status(200).send(story)
    }
    catch{
        res.status(500).send("story unavailable")
    }
    

}