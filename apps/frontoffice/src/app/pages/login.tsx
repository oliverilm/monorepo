import { login } from "../../api/auth";
import { useForm } from "@mantine/form"
import { Button, Input } from "@mantine/core"
import { useUserStore } from "../../stores/user";
import localStorage, { LocalStorageKey } from "../../services/local-storage";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "../../routes";


export function LoginPage() {
    const navigate = useNavigate()
    const form = useForm({
        initialValues: {
            email: "",
            password: ""
        }
    })

    const store = useUserStore()
    
    const onSubmit = async (values: typeof form.values) => {
        const response = await login(
            values
        )

        if ("token" in response.data) {
            store.setIsAuthenticated(true)
            localStorage.set(LocalStorageKey.Token, response.data.token)
            navigate(RouteEnum.Index)
        }
    
    }

    if (store.isAuthenticated) {
        return null;
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full max-w-md">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                    
                    <form onSubmit={form.onSubmit(onSubmit)}>
                    <Input name="email" {...form.getInputProps("email")} />
                    <Input name="password" {...form.getInputProps("password")}/>
                        <Button type="submit">
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}