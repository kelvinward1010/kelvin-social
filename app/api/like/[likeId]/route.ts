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
        const postId = request.body;

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

        return NextResponse.json(updatedLikedIds)
    } catch (error) {
        return NextResponse.json(null);
    }
}