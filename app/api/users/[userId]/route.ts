import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

interface IParams {
    conversationId?: string;
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return NextResponse.json(null);
        }

        const user = await prisma.user.findUnique({
            where: {
                id: currentUser?.id
            }
        });

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(null);
    }
}