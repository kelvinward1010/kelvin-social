import getCurrentUser from "./getCurrentUser";


const getUserById = async (
    userId?: string
) => {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser?.email) {
            return null;
        }

        const user = await prisma?.user.findUnique({
            where: {
                id: userId
            }
        })
        return user
    } catch (error: any) {
        console.log(error, 'Server error')
        return null;
    }
}

export default getUserById;