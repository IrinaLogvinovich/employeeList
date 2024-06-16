import { FC } from "react";
import Menu from "../Menu/Menu";
import { Outlet } from "react-router";
import { Container } from "@mui/material";

const Layout: FC = () => {
    return (
        <div>
            <header>
                <Container maxWidth="md">
                    <Menu />
                </Container>
            </header>
            <Container maxWidth="md" className='page-container'>
                <Outlet />
            </Container>
        </div>
    );
}
 
export default Layout;