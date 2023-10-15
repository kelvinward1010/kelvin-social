import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function PATCH(
    request: Request,
) {
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();

        const { 
            name, 
            username, 
            bio, 
            profileImage, 
            coverImage 
        } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }


        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser?.id,
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
            }
        });

        return NextResponse.json(updatedUser)
    } catch (error) {
        return NextResponse.json(null);
    }
}