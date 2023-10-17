"use client"
import { BsTwitter } from "react-icons/bs";

import { useEffect } from "react";
import useCurrentUser from "../../hooks/useCurrentUser";
import useNotifications from "../../hooks/useNotifications";
import NotificationItem from "./NofiticationItem";
import Loading from "../loading";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <>
        No notifications found
      </>
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