import LayoutHome from "../components/LayoutHome"


export default function ConversationsLayout({
    children
}: {
    children: React.ReactNode
}){
    return (
        <LayoutHome>
            {children}
        </LayoutHome>
    )
}