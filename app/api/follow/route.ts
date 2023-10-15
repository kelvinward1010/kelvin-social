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

        let updatedFollowIds = [...(user.followingIds || [])];
        updatedFollowIds.push(currentUser?.id);

        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                }
            });

            if (user?.id && (currentUser.id !== user.id)) {
                await prisma.notification.create({
                    data: {
                        body: `${currentUser?.name} followed your tweet!`,
                        userId: user?.id,
                        followerId: currentUser?.id,
                    }
                });

                await prisma.user.update({
                    where: {
                        id: user?.id
                    },
                    data: {
                        hasNotification: true
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }

        const updatedFollow = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingIds: updatedFollowIds
            }
        });

        return NextResponse.json(updatedFollow)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}