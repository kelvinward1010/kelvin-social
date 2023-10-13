import Header from "@/app/components/Header";
import NotificationsFeed from "./components/NotificationsFeed";



const NotificationsPage = () => {
    return (
        <>
            <Header showBackArrow label="Notifications" />
            <NotificationsFeed />
        </>
    )
}

export default NotificationsPage;