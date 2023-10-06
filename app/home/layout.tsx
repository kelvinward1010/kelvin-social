import Header from "../components/Header"
import LayoutHome from "../components/LayoutHome"
import Sidebar from "../components/sidebar/Sidebar"


export default function HomePageLayout({
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