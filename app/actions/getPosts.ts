import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getPosts = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return [];
    }

    try {
        let posts;

        if (currentUser?.id && typeof currentUser?.id === 'string') {
            posts = await prisma.post.findMany({
                where: {
                    id: currentUser?.id
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
                include: {
                    user: true,
                    comments: true
                },
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