import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getSession from "@/app/actions/getSession";

interface IParams {
    userId?: string;
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return [];
        }

        const user = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            where: {
                NOT: {
                    email: session.user.email
                }
            }
        });

        return NextResponse.json(user)
    } catch (error) {
        return NextResponse.json(null);
    }
}