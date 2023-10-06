"use client"
import useRoutes from "@/app/hooks/useRoutes";
import { User } from "@prisma/client";
import { useState } from "react";
import SidebarLogo from "./SidebarLogo";
import SidebarTweetButton from "./SidebarTweetButton";
import SidebarItem from "./SidebarItem";

function Sidebar (){

    const currentUser = {};
    const routes = useRoutes();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="h-full">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <div>
                        <SidebarLogo />
                        {routes.map((item) => (
                            <SidebarItem 
                                key={item?.href}
                                icon={item?.icon}
                                label={item?.label}
                                href={item?.href}
                                onClick={item.onClick}
                                active={item.active}
                            />
                        ))}
                        <SidebarTweetButton />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Sidebar;