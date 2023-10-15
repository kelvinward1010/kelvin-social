import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

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
            return NextResponse.json(null);
        }

        const user = await prisma.user.findUnique({
            where: {
                id: params.userId
            },
            include: {
                posts: true
            }
        });

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(null);
    }
}