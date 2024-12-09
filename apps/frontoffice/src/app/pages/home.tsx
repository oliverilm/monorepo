import { useUserStore } from "../../stores/user"
import { PublicHome } from "./home/public-home"
import { UserHome } from "./home/user-home"

export function Home() {
    const stores = useUserStore()


   
    return (
        <div>
            {stores.isAuthenticated ? <UserHome /> : <PublicHome />}
            
        </div>
    )
}