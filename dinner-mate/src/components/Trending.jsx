import { useState } from "react"
import { useEffect } from "react"
import styled from "styled-components"




const Trending = () => {

    const [trending, setTrending] = useState([])

    useEffect(() => {
        getTrending()
    }, [])


    const getTrending = async () => {
        const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=8e4adb9641bf4614afe4dcb88f4b147a&number=9`)
        const data = await api.json()
        setTrending(data.recipes) 
    }
    return (
        <>
            {trending.map((recipe) => {
                return (
                    <Wrapper>
                        <h3>Trending</h3>
                        {trending.map((recipe) => {
                            return (
                                <Card>
                                    <p>{recipe.title}</p>
                                    <img src={recipe.image} alt={recipe.title} />
                                </Card>                                
                            )
                        })}
                    </Wrapper>
                )
            })}
        </>
    )
}

const Wrapper = styled.div`
    margin: 4rem 0rem;
`;

const Card = styled.div`
    min-height: 25rem;
    border-radius: 2rem;
`;

export default Trending