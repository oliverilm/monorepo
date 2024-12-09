import { Button, Flex, Input, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import { register } from "../../api/auth"
import localStorage, { LocalStorageKey } from "../../services/local-storage"
import { useUserStore } from "../../stores/user"

export function Register() {
    const store = useUserStore()
    const form = useForm({
        initialValues: {
            email: "",
            password: ""
        }
    })


    const onSubmit = async (values: typeof form.values) => {
        const response = await register(values)

        if ("token" in response.data) {
            localStorage.set(LocalStorageKey.Token, response.data.token)
            store.setIsAuthenticated(true)
        }
    }

    if (store.isAuthenticated) {
        return null
    }
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Text size="xl" fw={"bold"} >Register</Text>
            <Flex direction={"column"}>
                <Input name="email"  title="email" {...form.getInputProps("email")} />
                <Input name="password" title="Password" {...form.getInputProps("password")} />
                <Button type="submit">register</Button>
            </Flex>
        </form>
    )
}