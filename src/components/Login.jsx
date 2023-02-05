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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px; ;
`;
const LoginText = styled.label`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px; ;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; ;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 20px; ;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px; ;
`;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ffc107;
  color: white;
  font-size: 20px;
  border: none;
  cursor: pointer; ;
`;

const StyledLink = styled(Link)`
  color: blue;
  margin-top: 10px;
  font-size: 20px; ;
`;
export default Login;
