import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, username, password };
      await fetch(
        "https://dinner-mate-backend-production.up.railway.app/auth/register",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainContainer onSubmit={onSubmit}>
      <SignUpText>Sign Up</SignUpText>
      <InputContainer>
        <StyledInput
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <StyledInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>
      <ButtonContainer>
        <StyledSignup type="submit">Sign Up</StyledSignup>
      </ButtonContainer>
      <HorizontalRule />
      <LogIn><Slink to={'/login'}>Already have an account? Login here!</Slink></LogIn>
    </MainContainer>
  );
};

const MainContainer = styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    left-margin: auto;
    right-margin: auto;
    align-items: center;
    flex-direction: column;
    justify-content center;
    height: 80vh;
    width: 30vw;
    background: linear-gradient(35deg, #494949, #313131);
    border-radius: 10px;
    box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37);
    color: #ffffff;

    @media only screen and (max-width: 320px) {
      width: 80vw;
      height: 90vh;
      hr {
        margin-bottom: 0.3rem;
      }
      h4 {
        font-size: small;
      }
    }
    @media only screen and (min-width: 360px) {
      width: 80vw;
      height: 90vh;
      h4 {
        font-size: small;
      }
    }
    @media only screen and (min-width: 411px) {
      width: 80vw;
      height: 90vh;
    }
    @media only screen and (min-width: 768px) {
      width: 80vw;
      height: 80vh;
    }
    @media only screen and (min-width: 1024px) {
      width: 70vw;
      height: 50vh;
    }
    @media only screen and (min-width: 1280px) {
      width: 30vw;
      height: 80vh;
    }
`;

const SignUpText = styled.h3`
  margin: 3rem 0 2rem 0;
  color: white;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const StyledInput = styled.input`
    background: rgba(255,255,255,0.15);
    box-shadow: 0 8px 32 px 0 rgba(31, 38, 135, 0.375);
    width: 80%;
    border-radius: 1rem;
    height: 3rem;
    padding: 1rem;
    border: none;
    outline: none;
    &:focus {
      display: inline-block;
      box-shadow: 0 0rem 0 0.1rem #f27121;
      backdrop-filter: blur(12rem);
      border-radius: 1rem;
    }
    &::placeholder {
      color: white;
    }
`;

const Slink = styled(Link)`
    text-decoration: none;
    color: white;
`

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSignup = styled.button`
    background: #f27121;
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 50%;
    height: 3rem;
    color: white;
    cursor: pointer;
    border-radius: 2rem;
    border: none;

`;

const LogIn = styled.h4`
  cursor: pointer;
  color: white;
`;

const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: white;
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

export default SignUp;
