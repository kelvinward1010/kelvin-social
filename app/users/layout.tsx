import LayoutHome from "../components/LayoutHome"


export default function UserLayout({
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