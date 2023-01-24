import React from 'react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const Search = () => {
    const [input, setInput] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <FormStyle onSubmit={submitHandler}>
            <div>
                <FaSearch></FaSearch>
                <input onChange={(e) => setInput(e.target.value)}
                type="text"
                value={input} />
            </div>
        </FormStyle>
    )
}

const FormStyle = styled.form`
    margin: 0rem;
    postion: relative;
    width: 100%;

    div {
        width: 100%;
        position: relative;
    }
    input {
        border: none;
        background: linear-gradient(35deg, #494949, #313131);
        font-size: 1.5rem; 
        color: white; 
        padding: 1rem 3rem;
        border: none;
        border-radius: 1rem;
        outline: none; 
    }
    svg {
        postion: absolute;
        top: 50%;
        left: 0%;
        transform: translate(100%, -50%);
        color: white; 
    }

`

export default Search