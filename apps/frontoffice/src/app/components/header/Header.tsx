import { Button, Flex, Text } from "@mantine/core";
import { RouteEnum } from "../../../routes";
import { useUserStore } from "../../../stores/user";
import { Link, NavLink, useLocation, useNavigate, useRoutes } from "react-router-dom";
import styled from "styled-components";
import localStorage, { LocalStorageKey } from "../../../services/local-storage";

const HeaderFlex = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--mantine-spacing-md)
`

export function Header() {
    const store = useUserStore()

    const navigate = useNavigate()

    function logout() {
        localStorage.remove(LocalStorageKey.Token)
        store.setIsAuthenticated(false)
        navigate(RouteEnum.Index)
    }

    
    return (
        <HeaderFlex>
                <Text>Brand</Text>
            <Flex gap={"md"} align={"center"}>
                {store.isAuthenticated ? (
                    <Button variant="transparent" onClick={logout}>
                        Logout
                    </Button>
                ) : (
                    <>
                        <Link to={RouteEnum.Login}>
                            Sign in
                        </Link>

                        <Button onClick={() => navigate(RouteEnum.Register)} >
                            Sign up
                        </Button>
                        </>
                )}
            </Flex>

        </HeaderFlex>
    )
}