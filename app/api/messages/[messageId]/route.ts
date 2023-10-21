import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

interface IParams {
    conversationId: string
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

        const messages = await prisma.message.findMany({
            where: {
                conversationId: params.conversationId
            },
            include: {
                sender: true,
                seen: true,
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return NextResponse.json(messages)
    } catch (error) {
        return NextResponse.json(null);
    }
}