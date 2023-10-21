import { Conversation, Message, User } from "@prisma/client";

// Message
export type FullMessageType = Message & {
    sender: User,
    seen: User[]
}

export type FullConversationType = Conversation & {
    users: User[];
    messages: FullMessageType[]
}

// Pipline
export type Id = string | number;

export type Column = {
    id: Id;
    title: string;
    contents: Task[]
}

export type Task = {
    id: Id;
    columnId: Id;
    content: string;
};