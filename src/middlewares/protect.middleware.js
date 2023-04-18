const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");

//prisma client
const prisma = new PrismaClient();

//protect routes middleware
module.exports.protect = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).json({
      message: "Access Denied",
    });

  if (!token.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }

  const tokenString = token.split(" ")[1];

  try {
    const { id } = jwt.verify(tokenString, process.env.JWT_ACCESS_SECRET);
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (user) {
      req.user = user;
    }
    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid Token",
    });
  }
};
