import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = (e) => {
        e.preventdefault();
    }

    return (
        <MainContainer onSubmit={submit}>
            <LoginText>
                Log In
            </LoginText>
            <InputContainer>
                {/* <form onSubmit={submit}> */}
                    <StyledInput
                        type= "text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <StyledInput
                        type= "password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                {/* </form> */}
            </InputContainer>
            <ButtonContainer>
                <StyledLogin type="submit">Login</StyledLogin>    
            </ButtonContainer>
            <SignUp>Don't have an account? Sign Up here!</SignUp>
        </MainContainer>

    )
}

const MainContainer = styled.form`
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

const LoginText = styled.h2`
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

const StyledLogin = styled.button`
    background:  background: linear-gradient(to right, #f27121, #e94057);
    text-transform: uppercase;
    letter-spacing: 0.2rem;
    width: 65%;
    height: 3rem;
    color: white;
    cursor: pointer;


`;

const SignUp = styled.h4`
    cursor: pointer;
    color: white;
`;

export default Login