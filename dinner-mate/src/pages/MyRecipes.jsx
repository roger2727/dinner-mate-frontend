import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import { Link, useParams } from 'react-router-dom'


const MyRecipes = () => {

    const [myRecipes, setMyRecipes] = useState([])
    // let params = useParams()

    const getMyRecipes = async () => {
        const res = await fetch(`https://dinner-mate-backend-production.up.railway.app/recipes/all`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        const data = await res.json()
        setMyRecipes(data.recipes)
    }

    useEffect(() => {
        getMyRecipes()
    }, [])
    

    return (
        <Grid>
            {myRecipes.map((recipes) => {
                return (
                    <Card key={recipes._id}>
                        <Link to={'/recipe/'+recipes._id}>
                            <img src={recipes.image} alt="" />
                            <h4>{recipes.title}</h4>
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