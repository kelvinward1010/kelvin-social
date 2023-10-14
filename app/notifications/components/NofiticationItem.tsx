"use client"
import useUser from "@/app/hooks/useUser";
import { BsTwitter } from "react-icons/bs";



interface NotificationItemProps {
    data: Record<string, any>;
}

const NotificationItem: React.FC<NotificationItemProps> = ({data ={}}) => {
    
    const user = useUser(data?.userId);
    console.log(user);

    return (
        <div key={data.id} className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800">
          <BsTwitter color="white" size={32} />
          <p className="text-white">
            {data.body}
          </p>
        </div>
    )
}

export default NotificationItem;