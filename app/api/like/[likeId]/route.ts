import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

interface IParams {
    postId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();
        const postId = request.url.split('/')[5] as string;

        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID');
        }

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            throw new Error('Invalid ID');
        }

        let updatedLikedIds = [...(post.likedIds || [])];

        updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser?.id);

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        });

        return NextResponse.json(updatedPost)
    } catch (error) {
        return NextResponse.json(null);
    }
}


export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();
        const postId = request.url.split('/')[5] as string;

        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID');
        }

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            throw new Error('Invalid ID');
        }

        let updatedLikedIds = [...(post.likedIds || [])];

        updatedLikedIds.push(currentUser.id);

        // NOTIFICATION PART START
        try {
            const post = await prisma.post.findUnique({
                where: {
                    id: postId,
                }
            });

            if (post?.userId && (currentUser.id !== post?.userId)) {
                await prisma.notification.create({
                    data: {
                        body: `${currentUser?.name} liked your tweet!`,
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
        } catch (error) {
            console.log(error);
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        });
        

        return NextResponse.json(updatedPost)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}