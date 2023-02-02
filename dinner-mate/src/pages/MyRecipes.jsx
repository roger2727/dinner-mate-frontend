import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { Link, useParams } from 'react-router-dom'


const MyRecipes = () => {

    const [myRecipes, setMyRecipes] = useState([])
    // let params = useParams()

    const getMyRecipes = async (name) => {
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=8e4adb9641bf4614afe4dcb88f4b147a&cuisine=${name}`)
        const myrecipes = await data.json()
        setMyRecipes(myrecipes.results)
    }

    useEffect(() => {
        getMyRecipes()
    }, [])
    

    return (
        <Grid>
            {myRecipes.map((item) => {
                return (
                    <Card key={item.id}>
                        <Link to={'/recipe/'+item.id}>
                            <img src={item.image} alt="" />
                            <h4>{item.title}</h4>
                        </Link>
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

export default MyRecipes