import LayoutOther from "../components/LayoutOther"


export default function PiplineLayout({
    children
}: {
    children: React.ReactNode
}){
    return (
        <LayoutOther>
            {children}
        </LayoutOther>
    )
}