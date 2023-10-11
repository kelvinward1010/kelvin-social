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

interface IParams {
    userId?: string;
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    try {

        const currentUser = await getCurrentUser();
        if (!currentUser?.id) {
            return [];
        }


        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        let posts;

        if (currentUser?.id && typeof currentUser?.id === 'string' && params.userId) {
            posts = await prisma.post.findMany({
                where: {
                    userId: currentUser?.id
                },
                include: {
                    user: true,
                    comments: true
                },
                orderBy: {
                    createdAt: 'desc'
                },
            });
        } else {
            posts = await prisma.post.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
        }
        

        return NextResponse.json(posts)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }
}