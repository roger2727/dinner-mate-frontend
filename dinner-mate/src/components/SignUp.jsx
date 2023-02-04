import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, username };
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

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password, username } = formData;

  return (
    <div>
      {/* <Nav /> */}
      <div className="register-box">
        <h1>Register</h1>
        <form className="register-form" onSubmit={onSubmit}>
          <div>
            <label className="register-label" htmlFor="email">
              Email
            </label>
            <input
              className="register-input"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="register-label" htmlFor="password">
              Password
            </label>
            <input
              className="register-input"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label className="register-label" htmlFor="username">
              Username
            </label>
            <input
              className="register-input"
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
          </div>
          <input className="register-input" type="submit" value="Register" />
        </form>
      </div>
    </div>
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
`;

const SignUpText = styled.h2`
  margin: 3rem 0 2rem 0;
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
    box-shadow: 0 8px 32 px 0 rgba(31, 38, 135, 0.375)
    width: 80%;
    height: 3rem;
    padding: 1rem;
    border: none;
    outline: none;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSignup = styled.button`
    background:  background: linear-gradient(to right, #f27121, #e94057);
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 65%;
    height: 3rem;
    color: white;
    cursor: pointer;

`;

const LogIn = styled.h4`
  cursor: pointer;
  color: white;
`;

export default SignUp;
