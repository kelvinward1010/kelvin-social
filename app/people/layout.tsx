import LayoutHome from "../components/LayoutHome"


export default function PeopleLayout({
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