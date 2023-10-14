import FollowBar from "./sidebar/FollowBar";
import Sidebar from "./sidebar/Sidebar"


const LayoutHome: React.FC<{children: React.ReactNode}> = ({children}) => {

    return (
        <div className="h-screen bg-black">
            <div className="container h-full mx-auto xl:px-30 max-w-8xl">
                <div className="grid grid-cols-4 h-full">
                    <Sidebar />
                    <div
                        className="
                            col-span-3 
                            lg:col-span-2 
                            border-x-[1px] 
                            border-neutral-800
                        ">
                        {children}
                    </div>
                    <FollowBar />
                </div>
            </div>
        </div>
    )
}

export default LayoutHome;