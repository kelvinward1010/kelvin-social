import LayoutHome from "../components/LayoutHome"


export default function NotificationLayout({
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