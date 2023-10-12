import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

interface IParams {
    postId: string
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();
        
        if (!currentUser?.email) {
            return null;
        }

        const post = await prisma.post.findUnique({
            where: {
                id: params.postId
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

        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json(null);
    }
}