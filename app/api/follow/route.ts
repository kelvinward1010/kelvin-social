import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";


interface IParams {
    userId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();
        const userId = request.url;

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
                    body: `${currentUser?.name} followed you!`,
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