import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
    conversationId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return NextResponse.json(null);
        }

        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true,
                messages: true
            }
        });

        if (!existingConversation) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        let updatedConversation = [...(currentUser?.conversationIds || [])];
        updatedConversation = updatedConversation.filter((id) => id !== conversationId)
        
        let updatedMessage = [...(currentUser?.seenMessageIds || [])];
        
        existingConversation?.messages?.forEach((message) => {
            updatedMessage = updatedMessage.filter((id) => id !== message.id)
        })

        await prisma.user.update({
            where: {
                id: currentUser?.id,
            },
            data: {
                conversationIds: updatedConversation,
                seenMessageIds: updatedMessage
            }
        });

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                },
            },
        });

        // existingConversation.users.forEach((user) => {
        //     if (user.email) {
        //         pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
        //     }
        // });

        return NextResponse.json(deletedConversation)
    } catch (error) {
        return NextResponse.json(null);
    }
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

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: params?.conversationId
            },
            include: {
                users: true,
            },
        });

        return NextResponse.json(conversation);
    } catch (error) {
        return NextResponse.json(null);
    }
}