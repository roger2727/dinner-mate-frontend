import React, { useEffect } from 'react'
import styled from "styled-components"
import { motion } from "framer-motion"
import { Link, useParams } from "react-router-dom"


const SearchedRecipe = () => {

    const [searchedRecipe, setSearchedRecipe] = useState([])
    let params = useParams()


    const getSearchedRecipe = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=8e4adb9641bf4614afe4dcb88f4b147a&cuisine=${name}`)
        const recipes = await data.json()
        setSearchedRecipe(recipes.results)
    }

    useEffect(() => {
        getSearchedRecipe(params.type)
    })
    
    return (
        <Grid>
            {searchedRecipe.map(item) => {
                return (
                    (Card) =>)
                )
            }}
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
`
export default SearchedRecipe