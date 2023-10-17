import Avatar from "@/app/components/Avatar";
import useUser from "@/app/hooks/useUser";
import Image from "next/image";


interface UserProfileProps {
  userId: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);
  
  return ( 
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image src={fetchedUser.coverImage} fill alt="Cover Image" style={{ objectFit: 'cover' }}/>
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar user={fetchedUser} image={fetchedUser?.profileImage || fetchedUser?.image} isLarge />
        </div>
      </div>
    </div>
   );
}
 
export default UserProfile;