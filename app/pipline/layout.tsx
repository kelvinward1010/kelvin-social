import LayoutHome from "../components/LayoutHome"


export default function PiplineLayout({
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