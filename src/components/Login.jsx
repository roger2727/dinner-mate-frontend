import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isValid) {
      try {
        const { email, password } = formData;
        const response = await fetch(
          "https://dinner-mate-backend-production.up.railway.app/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );
        const data = await response.json();

        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/");
        } else {
          console.error("Invalid email or password");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const validate = () => {
    const { email, password } = formData;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    const newError = { ...error };

    if (!emailRegex.test(email)) {
      isValid = false;
      newError.email = "Email is not valid";
    } else {
      newError.email = "";
    }

    if (password.length < 6) {
      isValid = false;
      newError.password = "Password must be at least 6 characters";
    } else {
      newError.password = "";
    }

    setError(newError);
    setIsValid(isValid);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validate();
  };

  const { email, password } = formData;

  return (
    <MainContainer onSubmit={onSubmit}>
      <LoginText htmlFor="email">Log In</LoginText>
      <InputContainer>
        <StyledInput
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
        />
        {error.email !== "" && <ErrorMessage>{error.email}</ErrorMessage>}
        <StyledInput
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
        />
        {error.password !== "" && <ErrorMessage>{error.password}</ErrorMessage>}
      </InputContainer>
      <Button type="submit">Log In</Button>
      <StyledLink to="/register">
        Don't have an account? Register here
      </StyledLink>
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

const LoginText = styled.h3`
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
  background: rgba(255, 255, 255, 0.15);
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

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLogin = styled.button`
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

const Slink = styled(Link)`
  text-decoration: none;
  color: white;
`;
const SignUp = styled.h4`
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
export default Login;
