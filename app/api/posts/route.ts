import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            content
        } = body;


        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const newPost = await prisma.post.create({
            data: {
                body: content,
                userId: currentUser.id
            }
        });
        

        return NextResponse.json(newPost)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}