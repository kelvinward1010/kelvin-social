import FollowBar from "./sidebar/FollowBar";
import Sidebar from "./sidebar/Sidebar"


const LayoutOther: React.FC<{children: React.ReactNode}> = ({children}) => {

    return (
        <div className="h-full bg-black">
            <div className="h-full mx-auto">
                <div className="
                    h-full
                    flex 
                    flex-row
                    w-full
                ">
                    <div className="basis-64">
                        <Sidebar />
                    </div>
                    <div
                        className="
                            w-full
                        ">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutOther;