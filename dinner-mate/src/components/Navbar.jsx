import React from 'react'
import { Link } from 'react-router-dom'
import { NavLogo } from './logo.svg'

const Navbar = () => {
    return (
        <Nav>
            <Logo to={'/'}/>
            <NavLogo />
        </Nav>
    )
}

const Logo = styled(Link)`
    text-decoration: none;
    font-size: 1.5rem;

`;

const Nav = styled.div`
    padding: 4rem 0rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    svg {
        font-size: 2rem;
        fill: #085659;

    }
`;

export default Navbar