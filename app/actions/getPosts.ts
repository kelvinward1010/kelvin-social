import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getPosts = async (userId?: string) => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    try {
        let posts;

        if (currentUser?.id && typeof currentUser?.id === 'string' && userId) {
            posts = await prisma.post.findMany({
                where: {
                    userId: currentUser?.id
                },
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                },
            });
        } else {
            posts = await prisma.post.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }

        return posts;
    } catch (error: any) {
        return [];
    }
};

export default getPosts;