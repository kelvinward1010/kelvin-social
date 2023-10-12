import LayoutHome from "../components/LayoutHome"


export default function PostLayout({
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