import LayoutHome from "../components/LayoutHome"


export default function ProjectsLayout({
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