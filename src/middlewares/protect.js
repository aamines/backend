import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
//protect routes middleware
export const protect = async (req, res, next) => {
    const prisma = new PrismaClient();
    const token = req.header('authorization') || req.cookies.access_token;
    if (!token) return res.status(401).send('Access Denied');
    if (!token.startsWith('Bearer ')) return res.status(401).send('Access Denied');
    const tokenString = token.split(' ')[1];
    try {
        const { id } = jwt.verify(tokenString, process.env.JWT_ACCESS_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        if (user) {
            req.user = user
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(400).send('Invalid Token');
    }
}