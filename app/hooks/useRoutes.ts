import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiArrowLeftOnRectangle, HiHome } from 'react-icons/hi2';
import { HiChat } from 'react-icons/hi';



const useRoutes = () => {
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            label: 'Home',
            href: '/home',
            icon: HiHome,
            active: pathname === '/home'
        },
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations'
        },
        {
            label: 'Logout',
            onClick: () => signOut(),
            href: '#',
            icon: HiArrowLeftOnRectangle,
        }
    ],[pathname])

    return routes
}

export default useRoutes;