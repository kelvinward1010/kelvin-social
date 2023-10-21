"use client"
import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";

import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import EmptyState from "@/app/components/EmptyState";
import useMessage from "@/app/hooks/useMessage";
import useConversationId from "@/app/hooks/useConversationId";
import Loading from "../loading";

interface IParams {
    conversationId: string;
}

const ChatId = ({ params }: { params: IParams }) => {
    // const conversation = await getConversationById(params.conversationId);
    // const messages = await getMessages(params.conversationId);

    const {data: fetchMessages, isLoading} = useMessage(params?.conversationId);
    const {data: fetchConversation, isLoading: load} = useConversationId(params?.conversationId);

    if (!fetchConversation) {
        return (
            <div className="h-full w-full">
                <div className="h-full flex flex-col">
                    <EmptyState />
                </div>
            </div>
        )
    }

    if(isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="h-full w-full">
            <div className="h-full flex flex-col">
                <Header conversation={fetchConversation} />
                <Body initialMessages={fetchMessages} />
                <Form />
            </div>
        </div>
    );
}

export default ChatId;