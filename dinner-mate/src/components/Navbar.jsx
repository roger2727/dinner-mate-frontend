import React from 'react'
import { GiKnifeFork } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import styled from 'styled-components'




const Navbar = () => {
    return (
        <>
            <Nav>
                <GiKnifeFork />
                <Logo to={'/'}>DinnerMate</Logo>
                <Menu>
                    <Login>Login</Login>
                {/* <SignUp>Sign Up</SignUp> */}
                </Menu>
            </Nav>
        </>

    )
}

const Logo = styled(Link)`
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 400;

`;

const Nav = styled.div`
    padding: 4rem 0rem;
    display: inline-block;
    
    align-items: center;
    svg {
        font-size: 2rem;
        fill: #085659;
    }
`;

const Menu = styled.div`
    padding: 4rem 0rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const Login = styled.button`
    text-color: black;
    font-size: 1rem;
    border: none;

`

export default Navbar