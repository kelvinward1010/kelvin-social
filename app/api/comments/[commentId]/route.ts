import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    postId: string
}

export async function POST(
    request: Request,
    {params}: {params: IParams}
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const postId = request.url.split('/')[5] as string;


        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID');
        }

        const {
            content
        } = body;


        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const comments = await prisma.comment.create({
            data: {
                body: content,
                userId: currentUser.id,
                postId
            }
        });

        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: postId,
                }
            });

            if (post?.userId && (currentUser.id !== post.userId)) {
                await prisma.notification.create({
                    data: {
                        body: `${currentUser?.name} replied on your tweet!`,
                        userId: post.userId
                    }
                });

                await prisma.user.update({
                    where: {
                        id: post.userId
                    },
                    data: {
                        hasNotification: true
                    }
                });
            }
        }
        catch (error) {
            console.log(error);
        }
        

        return NextResponse.json(comments)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}