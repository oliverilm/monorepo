import { Flex } from "@mantine/core";
import { useUserStore } from "../../../stores/user";
import { UserPersonalInfoModalForm } from "../../components/user/personal-info-modal-form/UserPersonalInfoModalForm";

export function UserHome() {
    const stores = useUserStore()

    return (
        <Flex>
            <pre>
                {JSON.stringify(stores.user, null, 2)}
            </pre>

            <UserPersonalInfoModalForm />
        </Flex>
    )
}
