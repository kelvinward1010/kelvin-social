import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

interface IParams {
    userId?: string;
}


export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();
        const userId = request.url.split('/')[5] as string;

        if (!userId || typeof userId !== 'string') {
            throw new Error('Invalid ID');
        }

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error('Invalid ID');
        }

        let updatedFollowingIds = [...(currentUser.followingIds || [])];
        updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);

        let updatedFollowerIds = [...(user.followersCount || [])];
        updatedFollowerIds = updatedFollowerIds.filter((followingId) => followingId !== currentUser?.id);

        try {
            await prisma.user.update({
                where: {
                    id: currentUser?.id,
                },
                data: {
                    followingIds: updatedFollowingIds
                }
            });
        } catch (error) {
            console.log(error)
        }

        const updatedFollow = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                followersCount: updatedFollowerIds
            }
        });

        return NextResponse.json(updatedFollow)
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
        const userId = request.url.split('/')[5] as string;

        //console.log(userId)

        if (!userId || typeof userId !== 'string') {
            throw new Error('Invalid ID');
        }

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error('Invalid ID');
        }

        let updatedFollowersIds = [...(user.followersCount || [])];
        updatedFollowersIds.push(currentUser.id);

        let updatedFollowingsIds = [...(user.followingIds || [])];
        updatedFollowingsIds.push(user.id);

        // NOTIFICATION PART START
        try {
            await prisma.notification.create({
                data: {
                    body: 'Someone followed you!',
                    userId,
                    followerId: currentUser?.id
                },
            });

            await prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    hasNotification: true,
                    followersCount: updatedFollowersIds
                }
            });
        } catch (error) {
            console.log(error);
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser?.id
            },
            data: {
                followingIds: updatedFollowingsIds
            }
        });

        return NextResponse.json(updatedUser)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}