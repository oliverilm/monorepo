import { useUserStore } from "../../stores/user"

export function Home() {
    const stores = useUserStore()
    if (stores.isAuthenticated && stores.user) {
        return (
            <pre>
                {JSON.stringify(stores.user, null, 2)}
            </pre>
        )
    }
    return (
        <div>
            not authenticated
        </div>
    )
}