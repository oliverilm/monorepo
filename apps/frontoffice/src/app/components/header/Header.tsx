import { Flex } from "@mantine/core";
import { RouteEnum } from "../../../routes";
import { useUserStore } from "../../../stores/user";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderFlex = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--mantine-spacing-md)
`

export function Header() {
    const store = useUserStore()
    return (
        <HeaderFlex>
            <Link to={RouteEnum.Index}>
                Brand
            </Link>

            {store.isAuthenticated ? (
                <Flex>
                    <Link to={RouteEnum.Index}>
                        Logout
                    </Link>
                </Flex>
            ) : (
                <Flex gap={"md"}>
                    <Link to={RouteEnum.Login}>
                        Login
                    </Link>

                    <Link to={RouteEnum.Register}>
                        Register
                    </Link>
                </Flex>
            )}
        </HeaderFlex>
    )
}