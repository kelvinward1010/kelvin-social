"use client"
import { BsTwitter } from "react-icons/bs";

import { useEffect } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import useNotifications from "../../hooks/useNotifications";
import NotificationItem from "./NofiticationItem";
import Loading from "../loading";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [], isLoading } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className="h-full flex justify-center items-center text-gray-500 text-3xl">
        You don't have any notification!!
      </div>
    )
  }

  if(isLoading) {
    return (
      <Loading />
    )
  }
  
  return ( 
    <div className="flex flex-col">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <NotificationItem key={notification?.id} data={notification}/>
      ))}
    </div>
   );
}
 
export default NotificationsFeed;