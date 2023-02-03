import React from "react";
import { GiKnifeFork } from "react-icons/gi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://dinner-mate-backend-production.up.railway.app/auth/logout",
        {
          method: "POST",
        }
      );
      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.log("An error occurred while logging out.");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Header>
      <Nav>
        <GiKnifeFork />
        <Logo to={"/"}>DinnerMate</Logo>
        {localStorage.getItem("token") ? (
          <Navlinks>
            <List>
              <SLink to="myrecipes">My Recipes</SLink>
              <SLink>My Favourites</SLink>
              <SLink to="addrecipe">Create Recipe</SLink>
              <SLink onClick={handleLogout}>Log Out</SLink>
            </List>
          </Navlinks>
        ) : (
          <Navlinks>
            <List>
              <SLink to="/login">Login</SLink>
              <SLink to="/signup">SignUp</SLink>
            </List>
          </Navlinks>
        )}
      </Nav>
    </Header>
  );
};

const Header = styled.div`
  height: 15vh;
  padding: 1rem;
`;

const Nav = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  svg {
    font-size: 2rem;
    fill: #085659;
  }
`;

const Navlinks = styled.div`
  flex: 1;
  text-align: right;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  justify-content: end;
  padding: 1rem;
`;

const SLink = styled(Link)`
    text-decoration: none;
    justify-content: space-between;
    margin-right 1rem;
    
    &:after {
        content: '';
        width: 0%;
        height: 0.2rem;
        background: linear-gradient(to right, #f27121, #e94057);
        display: block;
        margin: auto;
        border-radius: 1rem;
        transition: 0.5s;
    }

    &:hover:after {
        width: 100%;
    }
`;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
`;

export default Navbar;
