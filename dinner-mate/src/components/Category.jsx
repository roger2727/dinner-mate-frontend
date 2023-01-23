import React from 'react'
import { AiOutlineCoffee} from "react-icons/ai"
import { GiChopsticks } from "react-icons/gi"
import { BiCake } from "react-icons/bi"
import { Navlink } from "react-router-dom"

const Category = () => {
    return (
        <List>
            <Navlink>
                <AiOutlineCoffee />
                <h4>Breakfast</h4>
            </Navlink>
            <Navlink>
                <MdOutlineLunchDin />
                <h4>Lunch</h4>
            </Navlink> 
            <Navlink>
                <GiChopsticks />
                <h4>Dinner</h4>
            </Navlink> 
            <Navlink>
                <BiCake />
                <h4>Desert</h4>
            </Navlink> 
        </List>
    )
}

export default Category