import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const postId = request.url;

        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID');
        }

        const {
            content
        } = body;


        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const comment = await prisma.comment.create({
            data: {
                body: content,
                userId: currentUser.id,
                postId
            }
        });
        

        return NextResponse.json(comment)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}