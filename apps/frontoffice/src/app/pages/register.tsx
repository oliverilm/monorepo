import { Button, Flex, Input } from "@mantine/core"
import { useForm } from "@mantine/form"
import { register } from "../../api/auth"
import localStorage, { LocalStorageKey } from "../../services/local-storage"
import { useUserStore } from "../../stores/user"

export function Register() {
    const form = useForm({
        initialValues: {
            email: "",
            password: ""
        }
    })

    const isAuthenticated = useUserStore((state) => state.isAuthenticated)

    const onSubmit = async (values: typeof form.values) => {
        const response = await register(values)

        if ("token" in response.data) {
            localStorage.set(LocalStorageKey.Token, response.data.token)
        }
        
        console.log(response)
    }

    if (isAuthenticated) {
        return null
    }
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Flex direction={"column"}>
                <Input {...form.getInputProps("email")} />
                <Input {...form.getInputProps("password")} />
                <Button type="submit">register</Button>
            </Flex>
        </form>
    )
}