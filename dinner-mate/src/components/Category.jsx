import React from 'react'
import { MdOutlineFreeBreal, MdOutlineLunchDin } from "react-icons/md"
import { GiChopsticks } from "react-icons/gi"
import { BiCake } from "react-icons/bi"

const Category = () => {
    return (
        <List>
            <Navlink>
                <MdOutlineFreeBreal />
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