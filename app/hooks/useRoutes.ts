import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { HiArrowLeftOnRectangle, HiHome, HiUsers } from 'react-icons/hi2';
import { HiChat } from 'react-icons/hi';
import useCurrentUser from "./useCurrentUser";
import { BsBellFill } from "react-icons/bs";



const useRoutes = () => {
    const pathname = usePathname();
    const { data: currentUser } = useCurrentUser();
    const router = useRouter();

    const routes = useMemo(() => [
        {
            label: 'Home',
            href: '/home',
            onClick: () => router.push('/home'),
            icon: HiHome,
            active: pathname === '/home'
        },
        {
            icon: BsBellFill,
            label: 'Notifications',
            href: '/notifications',
            onClick: () => router.push('/notifications'),
            auth: true,
            active: pathname === '/notifications'
        },
        {
            label: 'People',
            href: '/people',
            onClick: () => router.push('/people'),
            icon: HiUsers,
            active: pathname === '/people'
        },
        {
            label: 'Chat',
            href: '/conversations',
            onClick: () => router.push('/conversations'),
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