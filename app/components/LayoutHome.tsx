import FollowBar from "./sidebar/FollowBar";
import Sidebar from "./sidebar/Sidebar"


const LayoutHome: React.FC<{children: React.ReactNode}> = ({children}) => {

    return (
        <div className="h-full bg-black">
            <div className="h-full mx-auto">
                <div className="
                    h-full
                    flex 
                    flex-row
                ">
                    <div className="basis-64">
                        <Sidebar />
                    </div>
                    <div
                        className="
                            basis-8/12
                            w-full
                        ">
                        {children}
                    </div>
                    <div className="basis-96">
                        <FollowBar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutHome;