import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getPostById = async (
    postId: string
) => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.email) {
            return null;
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
            },
        });

        return post;
    } catch (error: any) {
        console.log(error, 'SERVER_ERROR')
        return null;
    }
};

export default getPostById;