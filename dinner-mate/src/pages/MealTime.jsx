import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { motion } from "framer-motion"
import { Link, useParams } from "react-router-dom"


const mealTime = () => {

    const [mealTime, setMealTime] = useState([])
    let params = useParams()


    const getMealTime = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=3de3f02471d649daa170cd106fa968f0&cuisine=${name}`)
        const recipes = await data.json()
        setMealTime(recipes.results)
    }

    useEffect(() => {
        getMealTime(params.type)
    },[params.type])
    
    return (
        <Grid>
            {mealTime.map((item) => {
                return (
                    <Card key={item.id}>
                        <img src={item.image} alt="" />
                        <h4>{item.title}</h4>
                    </Card>
                )
            })}
        </Grid>
    )
}


const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem; 

`;

const Card = styled.div`
    img{
        width: 100%;
        border-radius: 2rem;

    }
    a {
        text-decoration: none;

    }
    h4 {
        text-align: center;
        padding: 1rem;
    }
`;
export default mealTime