"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import useUser from "@/app/hooks/useUser";
import { useCallback } from "react";

interface AvatarBoxProps {
    user: any;
    isLarge?: boolean;
    hasBorders?: boolean;
    image?: string;
}

const AvatarBox: React.FC<AvatarBoxProps> = ({
    user,
    isLarge,
    hasBorders,
    image
}) => {

    const router = useRouter();

    const goToUser = useCallback((ev: any) => {
        ev.stopPropagation();

        router.push(`/users/${user?.id || user?.data?.id}`)
    }, [router, user?.id, user?.data?.id]);
    
    return (
        <div
            className={`
                ${hasBorders ? 'border-4 border-black' : ''}
                ${isLarge ? 'h-25' : 'h-12'}
                ${isLarge ? 'w-25' : 'w-12'}
                rounded-full 
                hover:opacity-90 
                transition 
                cursor-pointer
                relative
            `}
            onClick={goToUser}
        >
            <Image
                fill
                style={{
                    objectFit: 'cover',
                    borderRadius: '100%'
                }}
                alt="Avatar"
                onClick={() =>{}}
                src={image || '/images/placeholder.jpg'}
            />
        </div>
    )
}

export default AvatarBox;
