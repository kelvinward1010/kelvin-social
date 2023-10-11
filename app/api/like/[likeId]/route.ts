import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function DELETE(
    request: Request
) {
    try {
        const currentUser = await getCurrentUser();
        const postId = request.url;

        if (!currentUser?.id) {
            return NextResponse.json(null);
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