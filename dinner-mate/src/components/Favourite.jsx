import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { useState } from 'react'
import styled from 'styled-components'

const Favourite = () => {
    const [isFilled, setIsFilled] = useState(false)

    const handleClick = () => {
        setIsFilled(!isFilled)
    }

    return (
        <Heart size={32} isFilled={isFilled} onClick={handleClick} />
    )
}

const Heart = styled(AiOutlineHeart)`
    color: ${props => (props.isFilled ? 'red' : 'black')};
    cursor: pointer;
`

export default Favourite