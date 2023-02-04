import React from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { useState } from 'react'
import styled from 'styled-components'

const Favourite = () => {
    const [isFilled, setIsFilled] = useState(false)

    const handleClick = async () => {
        try {
            const res = await fetch(`https://dinner-mate-backend-production.up.railway.app/public/favourite/${recipeId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setIsFilled(res.data.isFav)
        }
        catch {
            console.error(err)
        }
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