import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import LayoutOther from "../components/LayoutOther";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
    children
}: {
    children: React.ReactNode,
}) {
    const conversations = await getConversations();
    const users = await getUsers();

    return (
        <LayoutOther>
            <div className="h-full flex flex-row w-full">
                <ConversationList
                    users={users}
                    title="Messages"
                    initialItems={conversations}
                />
                {children}
            </div>
        </LayoutOther>
    );
}